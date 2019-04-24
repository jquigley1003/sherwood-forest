import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '../models/user.model';

import { UserService } from '../shared/services/user.service';
import { ToastService } from '../shared/services/toast.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  allUsers;
  users;
  usersSubscription;

  constructor(private userService: UserService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.allUsers = this.userService.fetchUsers();
    this.usersSubscription = this.allUsers.subscribe(data => {
      this.users = data;
      this.users.sort((a,b) => (a.address.streetNumber + a.address.streetName).localeCompare((b.address.streetNumber + b.address.streetName)));
    });
  }

  addAdmin(user) {
    this.userService.makeUserAdmin(user);
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

  deleteUser(uid) {
    this.userService.deleteUser(`users/${uid}`);
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
