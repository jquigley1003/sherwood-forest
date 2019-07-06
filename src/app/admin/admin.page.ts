import { Component, OnInit, OnDestroy } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { User } from '../models/user.model';

import { UserService } from '../shared/services/user.service';
import { ToastService } from '../shared/services/toast.service';
import { AlertService } from '../shared/services/alert.service';
import { LoadingService } from '../shared/services/loading.service';
import { UserModalComponent } from '../shared/modals/user-modal/user-modal.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, OnDestroy {
  allUsers;
  users: any[];
  loadedUsers: any[];
  userChange;
  filterBy: string = "lastName";
  statusFirst: string = "primary";
  statusLast: string = "secondary";
  statusAddress: string = "primary";
  usersSubscription;

  constructor(private userService: UserService,
              private toastService: ToastService,
              private alertService: AlertService,
              private loadingService: LoadingService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadingService.present();
    this.getAllUsers();
  }

  async getAllUsers() {
    this.allUsers = await this.userService.fetchUsers();
    this.usersSubscription = this.allUsers.subscribe(data => {
      this.users = data;
      // this.users.sort((a,b) => (a.displayName.lastName + a.displayName.firstName)
      //   .localeCompare((b.displayName.lastName + b.displayName.firstName)));
      this.loadedUsers = this.users;
    });
    this.loadingService.dismiss();
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
        occupation: user.occupation,
        residentSince: user.residentSince
      }
    });
    return await modal.present();
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
    }
    await this.userService.updateUser('users/'+ user.uid, data);
    this.toastService.presentToast(user.displayName.firstName + ' dues are now marked unpaid',
      true, 'top', 'Ok', 3000 );
  }

  deleteUser(firstName, uid) {
    this.alertService.presentAlert(
      'Are You Sure?',
      'You will permanently delete ' + firstName,
      'This action can not be undone',
      [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('You did not delete '+firstName);
          }
        },
        {
          text: 'Yes, Delete',
          handler: () => {
            this.deleteUserConfirmed(uid);
          }
        }
      ]
    );
  }

  deleteUserConfirmed(uid) {
    this.userService.deleteUser(`users/${uid}`);
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
