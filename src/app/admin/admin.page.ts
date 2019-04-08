import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  allUsers;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.allUsers = this.userService.fetchUsers();
  }

  addAdmin(user) {
    this.userService.makeUserAdmin(user);
  }

  deleteUser(uid) {
    this.userService.deleteUser(`users/${uid}`);
  }

}
