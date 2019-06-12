import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

import { DbService } from './db.service';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  msg;

  constructor(private authService: AuthService,
              private dbService: DbService,
              private afFunctions: AngularFireFunctions,
              private toastService: ToastService) {}


  adminAddUser(data) {
    this.toastService.presentToast('Please wait while we add a new user.', true, 'top', 'OK', 3000);
    this.afFunctions.httpsCallable('adminCreateUser')(data)
      .toPromise()
      .then(resp => {
        if(resp.error) {
          this.msg = resp.error;
        } else {
          this.msg = resp.result;
        }
        this.toastService.presentToast(this.msg, true, 'top', 'OK', 3000);
        console.log({resp});
      })
      .catch(err => {
        this.toastService.presentToast(err.error, true, 'top', 'OK', 3000);
        console.log({err});
      });
  }

  fetchUsers() {
    return this.dbService.collection$('users');
  }

  makeUserAdmin(user) {
    this.toastService.presentToast('Please wait while we make this member an admin.', true, 'top', 'OK', 3000);
    this.afFunctions.httpsCallable('addAdmin')(user)
      .toPromise()
      .then(resp => {
        if(resp.error) {
          this.msg = resp.error;
        } else {
          this.msg = resp.result;
        }
        this.toastService.presentToast(this.msg, true, 'top', 'OK', 3000);
        console.log({resp});
      })
      .catch(err => {
        this.toastService.presentToast(err.error, true, 'top', 'OK', 3000);
        console.log({err});
      });
  }

  makeUserApproved(user) {
    this.toastService.presentToast('Please wait while we approve this member.', true, 'top', 'OK', 3000);
    this.afFunctions.httpsCallable('markApproved')(user)
      .toPromise()
      .then(resp => {
        if(resp.error) {
          this.msg = resp.error;
        } else {
          this.msg = resp.result;
        }
        this.toastService.presentToast(this.msg, true, 'top', 'OK', 3000);
        console.log({resp});
      })
      .catch(err => {
        this.toastService.presentToast(err.error, true, 'top', 'OK', 3000);
        console.log({err});
      });
  }

  makeUserPending(user) {
    this.toastService.presentToast('Please wait while we change user to pending.', true, 'top', 'OK', 3000);
    this.afFunctions.httpsCallable('markPending')(user)
      .toPromise()
      .then(resp => {
        if(resp.error) {
          this.msg = resp.error;
        } else {
          this.msg = resp.result;
        }
        this.toastService.presentToast(this.msg, true, 'top', 'OK', 3000);
        console.log({resp});
      })
      .catch(err => {
        this.toastService.presentToast(err.error, true, 'top', 'OK', 3000);
        console.log({err});
      });
  }

  async removeAdminRole(user) {
    await this.toastService.presentToast('Please wait while we remove user as admin.', true, 'top', 'OK', 3000);
    this.afFunctions.httpsCallable('removeAdmin')(user)
      .toPromise()
      .then(resp => {
        if(resp.error) {
          this.msg = resp.error;
        } else {
          this.msg = resp.result;
        }
        this.toastService.presentToast(this.msg, true, 'top', 'OK', 3000);
        console.log({resp});
      })
      .catch(err => {
        this.toastService.presentToast(err.error, true, 'top', 'OK', 3000);
        console.log({err});
      });
  }

  updateUser(path, data) {
    this.dbService.updateAt(path, data);
  }

  resetUserPassword(userEmail) {
    this.authService.resetPassword(userEmail);
  }

  async deleteUser(userPath) {
    await this.toastService.presentToast('Please wait while we delete this user.', true, 'middle', 'OK', 3000);
    this.dbService.delete(userPath)
      .then(() => {
        this.toastService.presentToast('The user has been deleted!',
          true, 'middle', 'Ok', 3000 );
      })
      .catch(err => {
        this.toastService.presentToast('You do not have the credentials to delete users!',
          true, 'middle', 'OK', 3000);
        console.log(err);
      });
  }
}
