import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

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
  statusLast: string = "primary";
  statusStreet: string = "primary";

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) { }

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
