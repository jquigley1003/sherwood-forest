import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { DirectoryModalComponent } from '../../shared/modals/directory-modal/directory-modal.component';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit, OnDestroy {
  allUsers;
  users: any[];
  loadedUsers: any[];
  usersSubscription: Subscription;
  filterBy: string = "lastName";
  statusFirst: string = "primary";
  statusLast: string = "secondary";
  statusAddress: string = "primary";
  residentSince: string;

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.allUsers = this.userService.fetchUsers();
    this.usersSubscription = this.allUsers.subscribe(data => {
      this.users = data;
      this.users.sort((a,b) => (a.displayName.lastName + a.displayName.firstName)
        .localeCompare((b.displayName.lastName + b.displayName.firstName)));
      this.loadedUsers = this.users;
    });
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

  async presentDirectoryModal(user) {
    const modal = await this.modalCtrl.create({
      component: DirectoryModalComponent,
      componentProps: {
        photoURL: user.photoURL,
        name: user.displayName.firstName + ' ' + user.displayName.lastName,
        phone: user.phone,
        email: user.email,
        address: user.address.streetNumber + ' ' + user.address.streetName,
        cityStateZip: user.address.city + ' ' + user.address.state + ' ' + user.address.zipCode,
        residentSince: user.residentSince,
        showBirthDate: user.showBirthDate,
        birthDate: user.birthDate
      }
    });
    return await modal.present();
  }

  goHome() {
    this.router.navigate(['/']);
  }

  logOut() {
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
