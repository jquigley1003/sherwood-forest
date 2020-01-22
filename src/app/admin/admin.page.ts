import { Component, OnInit, OnDestroy } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { UserService } from '../shared/services/user.service';
import { ToastService } from '../shared/services/toast.service';
import { AlertService } from '../shared/services/alert.service';
import { LoadingService } from '../shared/services/loading.service';
import { JrResidentService } from '../shared/services/jr-resident.service';
import { PetService } from '../shared/services/pet.service';
import { ReportService } from '../shared/services/report.service';
import { FireBaseService } from '../shared/services/firebase.service';
import { UserModalComponent } from '../shared/modals/user-modal/user-modal.component';
import { JrResidentModalComponent } from '../shared/modals/jr-resident-modal/jr-resident-modal.component';
import { PetModalComponent } from '../shared/modals/pet-modal/pet-modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, OnDestroy {
  allUsers$: Observable<any>;
  users: any[];
  loadedUsers: any[];
  allJrRes$: Observable<any>;
  jrResidents: any[];
  userJrRes = [];
  allPets$: Observable<any>;
  pets: any[];
  userPets = [];
  allReports$: Observable<any>;
  recentReport$: Observable<any>;
  recentReport: any[];
  searchTermValue: string = "";
  filterBy: string = "lastName";
  statusFirst: string = "primary";
  statusLast: string = "secondary";
  statusAddress: string = "primary";
  ngUnsubscribe = new Subject<void>();
  spousePartner$: Observable<any>;
  spousePartner: any[];
  showSpinner: boolean = false;

  constructor(private firebaseService: FireBaseService,
              private userService: UserService,
              private jrResService: JrResidentService,
              private petService: PetService,
              private toastService: ToastService,
              private alertService: AlertService,
              private loadingService: LoadingService,
              private reportService: ReportService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getAllUsers();
    this.getAllJrRes();
    this.getAllPets();
    this.getRecentReport();
  }

  separateLetter(record, recordIndex, records) {
    if (recordIndex == 0) {
      return record.displayName.lastName[0].toUpperCase();
    }
 
    if (!records[recordIndex + 1] || !records[recordIndex + 2]) {
      return null;
    }
 
    let first_prev = records[recordIndex - 1].displayName.lastName[0];
    let first_current = record.displayName.lastName[0];
 
    if (first_prev != first_current) {
      return first_current.toUpperCase();
    }
    return null;
  }

  getAllUsers() {
    this.userService.getAllUsers()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.users = data;
        this.loadedUsers = this.users;
      });
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

  async getAllJrRes() {
    this.allJrRes$ = await this.jrResService.fetchAllJrResidents();
    this.allJrRes$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.jrResidents = data;
      });
  }

  async getUserJrRes(userID) {
    this.userJrRes = [];
    for (let jrRes of this.jrResidents) {
      if (jrRes.parentIDs.includes(userID)) {
        this.userJrRes.push(jrRes);
      }
    }
  }

  async getAllPets() {
    this.allPets$ = await this.petService.fetchAllPets();
    this.allPets$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.pets = data;
      });
  }

  async getUserPets(userID) {
    this.userPets = [];
    for (let pet of this.pets) {
      if (pet.petParentIDs.includes(userID)) {
        this.userPets.push(pet);
      }
    }
  }

  async getAllReports() {
    this.allReports$ = await this.reportService.fetchAllReports();
  }

  async getRecentReport() {
    this.recentReport$ = await this.reportService.fetchRecentReport();
    this.recentReport$
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.recentReport = data;
      });
  }

  async requestReport() {
    const data = {
      status: 'processing',
      createdAt: new Date().toISOString()
    }
    this.reportService.updateReport('reports', data);
    return this.getRecentReport();
  }

  initializeList():void {
    this.users = this.loadedUsers;
  }

  queryFirstName() {
    this.filterBy = 'firstName';
    this.statusFirst = "secondary";
    this.statusLast = "primary";
    this.statusAddress = "primary";
  }

  queryLastName() {
    this.filterBy = 'lastName';
    this.statusFirst = "primary";
    this.statusLast = "secondary";
    this.statusAddress = "primary";
  }

  queryAddress() {
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
      if(member.displayName.firstName && searchTerm) {
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

    if ( !searchTerm) {
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

    if (!searchTerm) {
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
        spPhotoURL: user.spousePartner.photoURL
      }
    });
    modal.onWillDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined) {
        this.searchTermValue = dataReturned.data.data;
      }
    });
    return await modal.present();
  }

  async presentJrResidentModal(user) {
    await this.getUserJrRes(user.uid);
    const modal = await this.modalCtrl.create({
      component: JrResidentModalComponent,
      componentProps: {
        jrResidents: this.userJrRes,
        address: user.address,
        parentOneName: user.displayName.firstName + ' ' + user.displayName.lastName,
        parentTwoName: user.spousePartner.firstName + ' ' + user.spousePartner.lastName,
        parentOneID: user.uid,
        parentTwoID: user.spousePartner.spID
      }
    });
    return await modal.present();
  }

  async presentPetModal(user) {
    await this.getUserPets(user.uid);
    const modal = await this.modalCtrl.create({
      component: PetModalComponent,
      componentProps: {
        pets: this.userPets,
        address: user.address,
        petParentOneName: user.displayName.firstName + ' ' + user.displayName.lastName,
        petParentTwoName: user.spousePartner.firstName + ' ' + user.spousePartner.lastName,
        petParentOneID: user.uid,
        petParentTwoID: user.spousePartner.spID
      }
    });
    return await modal.present();
  }

  addDataToUsers() {
    // for(var sfUser of this.users) {
    //   const data = {
    //     uid: sfUser.uid,
    //     paidDues: false
    //   };
    //   this.userService.updateUser('users/'+ sfUser.uid, data);
    // }

    // for(var sfUser of this.users) {
    //   if(sfUser.spousePartner.photoURL == "https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/FrogBotanicalGarden.jpg?alt=media&token=0a0d35fd-7404-45c4-8032-8ec0f2eb92a9") {
    //     const data = {
    //       uid: sfUser.uid,
    //       spousePartner: {
    //         photoURL: "https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/FrogBotanicalGarden.jpg?alt=media&token=11f3ff3f-c3e9-4cbe-a525-2dcb033bec79"
    //       }
    //     };
    //     this.userService.updateUser('users/'+ sfUser.uid, data);
    //   }
    // }
  }

  deleteUserFields() {
    // for(var sfUser of this.users) {
    //     this.firebaseService.deleteFields('users/'+ sfUser.uid);
    // }
  }

  makeAdmin(user) {
    this.userService.makeUserAdmin(user);
  }

  removeAdmin(user) {
    this.userService.removeAdminRole(user);
  }

  makeApproved(user) {
    this.userService.makeUserApproved(user);
    this.searchTermValue = user.displayName.lastName;
  }

  makePending(user) {
    this.userService.makeUserPending(user);
    this.searchTermValue = user.displayName.lastName;
  }

  async markDuesPaid(user) {
    const data = {
      uid: user.uid,
      paidDues: true
    };
    await this.userService.updateUser('users/'+ user.uid, data);
    this.toastService.presentToast(user.displayName.firstName + ' has been marked paid!',
      true, 'top', 'Ok', 3000 );
  }

  async markDuesUnpaid(user) {
    const data = {
      uid: user.uid,
      paidDues: false
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
      await this.getUserJrRes(uid);
      await this.getUserPets(uid);
      if(this.userJrRes.length != 0) {
        for (let jrRes of this.userJrRes) {
          this.jrResService.deleteJrRes(`jrResidents/${jrRes.id}`);
        }
      }
      if(this.userPets.length != 0) {
        for (let pet of this.userPets) {
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
