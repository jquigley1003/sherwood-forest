import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

import { DirectoryModalComponent } from '../../shared/modals/directory-modal/directory-modal.component';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit {
  allUsers;
  users: any[];
  loadedUsers: any[];
  usersSubscription;
  filterBy: string = "lastName";
  statusLast: string = "secondary";
  statusStreet: string = "primary";

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.allUsers = this.userService.fetchUsers();
    this.usersSubscription = this.allUsers.subscribe(data => {
      this.users = data;
      this.loadedUsers = this.users;
    });
  }

  initializeList():void {
    this.users = this.loadedUsers;
  }

  queryLastName() {
    this.filterBy = 'lastName';
    this.statusLast = "secondary";
    this.statusStreet = "primary";
  }

  queryStreetName() {
    this.filterBy = 'streetName';
    this.statusStreet = "secondary";
    this.statusLast = "primary";
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

  filterByStreetName(event) {
    this.initializeList();
    const searchTerm = event.srcElement.value;

    if(!searchTerm) {
      return;
    }
    this.users = this.users.filter(member => {
      if (member.address.streetName && searchTerm) {
        if (member.address.streetName.toLowerCase()
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
        firstName: user.displayName.firstName,
        lastName: user.displayName.lastName,
        phone: user.phone,
        residentSince: user.residentSince
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
