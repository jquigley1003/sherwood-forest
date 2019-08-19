import { Component, OnInit, OnDestroy } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Observable, Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { UserService } from '../shared/services/user.service';
import { ToastService } from '../shared/services/toast.service';
import { AlertService } from '../shared/services/alert.service';
import { LoadingService } from '../shared/services/loading.service';
import { UserModalComponent } from '../shared/modals/user-modal/user-modal.component';
import { JrResidentService } from '../shared/services/jr-resident.service';
import { PetService } from '../shared/services/pet.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, OnDestroy {
  allUsers$: Observable<any>;
  users: any[];
  loadedUsers: any[];
  searchTermValue:string = "";
  filterBy: string = "lastName";
  statusFirst: string = "primary";
  statusLast: string = "secondary";
  statusAddress: string = "primary";
  usersSubscription: Subscription;
  ngUnsubscribe = new Subject<void>();
  memJrResidents$: Observable<any>;
  jrResidents = [];
  memPets$: Observable<any>;
  pets = [];
  spousePartner$: Observable<any>;
  spousePartner: any[];

  constructor(private userService: UserService,
              private jrResService: JrResidentService,
              private petService: PetService,
              private toastService: ToastService,
              private alertService: AlertService,
              private loadingService: LoadingService,
              private modalCtrl: ModalController) { }

  ngOnInit() {

  }

  async getAllUsers() {
    await this.loadingService.presentLoading();
    this.allUsers$ = await this.userService.fetchUsers();
    await this.allUsers$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
      this.loadedUsers = data;
      this.users = this.loadedUsers;
    });
    this.loadingService.dismissLoading();
  }

  async getSpousePartner(userID) {
    this.spousePartner$ = await this.userService.fetchSpousePartner(userID);
      this.spousePartner$
      .pipe(take(1))
      .subscribe(data => {
        if(data && data.length > 0) {
          this.spousePartner = data;
        } else {
          this.spousePartner = null;
        }
      });
  }

  async getJrResidents(parentID) {
    this.memJrResidents$ = await this.jrResService.fetchJrResidents(parentID);
    this.memJrResidents$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if(data && data.length > 0) {
          this.jrResidents = data;
        } else {
          this.jrResidents = null;
        }
      });
  }

  async getPets(petParentID) {
    this.memPets$ = await this.petService.fetchPets(petParentID);
    this.memPets$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if(data && data.length > 0) {
          this.pets = data;
          console.log("This user's pets = ", this.pets);
        } else {
          this.pets = null;
        }
      });
  }

  initializeList():void {
    this.users = this.loadedUsers;
  }

  queryFirstName() {
    this.initializeList();
    this.filterBy = 'firstName';
    this.statusFirst = "secondary";
    this.statusLast = "primary";
    this.statusAddress = "primary";
  }

  queryLastName() {
    this.initializeList();
    this.filterBy = 'lastName';
    this.statusFirst = "primary";
    this.statusLast = "secondary";
    this.statusAddress = "primary";
  }

  queryAddress() {
    this.initializeList();
    this.filterBy = 'address';
    this.statusFirst = "primary";
    this.statusLast = "primary";
    this.statusAddress = "secondary";
  }

  filterByFirstName(event) {
    this.initializeList();
    const searchTerm = event.srcElement.value;

    if(!searchTerm) {
      return;
    }
    this.users = this.users.filter(member => {
      if (member.displayName.firstName && searchTerm) {
        if (member.displayName.firstName.toLowerCase()
          .indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  filterByLastName(event) {
    this.initializeList();
    const searchTerm = event.srcElement.value;

    if(!searchTerm) {
      return;
    }
    this.users = this.users.filter(member => {
      if (member.displayName.lastName && searchTerm) {
        if (member.displayName.lastName.toLowerCase()
          .indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  filterByAddress(event) {
    this.initializeList();
    const searchTerm = event.srcElement.value;

    if(!searchTerm) {
      return;
    }
    this.users = this.users.filter(member => {
      if ((member.address.streetNumber + ' ' + member.address.streetName) && searchTerm) {
        if ((member.address.streetNumber + ' ' + member.address.streetName).toLowerCase()
          .indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  async presentUserModal(user) {
    await this.getJrResidents(user.uid);
    await this.getPets(user.uid);
    const modal = await this.modalCtrl.create({
      component: UserModalComponent,
      componentProps: {
        uid: user.uid,
        photoURL: user.photoURL,
        firstName: user.displayName.firstName,
        lastName: user.displayName.lastName,
        streetNumber: user.address.streetNumber,
        streetName: user.address.streetName,
        subAddress: user.address.subAddress,
        city: user.address.city,
        state: user.address.state,
        zipCode: user.address.zipCode,
        phone: user.phone,
        email: user.email,
        birthDate: user.birthDate,
        showBirthDate: (user.showBirthDate != null) ? user.showBirthDate : false,
        occupation: user.occupation,
        residentSince: user.residentSince,
        spID: user.spousePartner.spID,
        spFirstName: user.spousePartner.firstName,
        spLastName: user.spousePartner.lastName,
        spPhotoURL: user.spousePartner.photoURL,
        jrResidents: this.jrResidents,
        pets: this.pets
      }
    });
    modal.onWillDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined) {
        this.searchTermValue = dataReturned.data.data;
      }
    });
    return await modal.present();
  }

  addDataToUsers() {
    for(var sfUser of this.users) {
      const data = {
        uid: sfUser.uid,
        spousePartner: {
          photoURL: ''
        }
      };
      this.userService.updateUser('users/'+ sfUser.uid, data);
    }
  }

  makeAdmin(user) {
    this.userService.makeUserAdmin(user);
  }

  removeAdmin(user) {
    this.userService.removeAdminRole(user);
  }

  makeApproved(user) {
    this.userService.makeUserApproved(user);
  }

  makePending(user) {
    this.userService.makeUserPending(user);
  }

  async markDuesPaid(user) {
    const data = {
      uid: user.uid,
      duesPaid: true
    };
    await this.userService.updateUser('users/'+ user.uid, data);
    this.toastService.presentToast(user.displayName.firstName + ' has been marked paid!',
      true, 'top', 'Ok', 3000 );
  }

  async markDuesUnpaid(user) {
    const data = {
      uid: user.uid,
      duesPaid: false
    };
    await this.userService.updateUser('users/'+ user.uid, data);
    this.toastService.presentToast(user.displayName.firstName + ' dues are now marked unpaid',
      true, 'top', 'Ok', 3000 );
  }

  async deleteUser(firstName, uid, spID) {
    await this.getSpousePartner(spID);
    this.alertService.presentAlert(
      'Are You Sure?',
      'You will permanently delete ' + firstName,
      'If spouse/partner field is blank, Jr Residents and ' +
      'Pets will be removed. This action can not be undone.',
      [
        {
          text: 'Cancel',
          cssClass: 'alertCancel',
          role: 'cancel',
          handler: () => {
            console.log('You did not delete '+firstName);
          }
        },
        {
          text: 'Yes, Delete',
          cssClass: 'alertDanger',
          handler: () => {
            this.deleteUserConfirmed(uid, spID);
          }
        }
      ]
    );
  }

  async deleteUserConfirmed(uid, spID) {
    if(this.spousePartner == null) {
      await this.getJrResidents(uid);
      await this.getPets(uid);
      if(this.jrResidents != null) {
        for (let jrRes of this.jrResidents) {
          this.jrResService.deleteJrRes(`jrResidents/${jrRes.id}`);
        }
      }
      if(this.pets != null) {
        for (let pet of this.pets) {
          this.petService.deletePet(`pets/${pet.id}`);
        }
      }
      this.userService.deleteUser(`users/${uid}`);
    } else {
      const data = {
        uid: spID,
        spousePartner: {
          firstName: '',
          lastName: '',
          photoURL: '',
          spID: ''
        }
      };
      // remove the user's information from spousePartner
      this.userService.updateUser('users/'+ spID, data);
      // delete the user
      this.userService.deleteUser(`users/${uid}`);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
