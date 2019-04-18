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


  fetchUsers() {
    return this.dbService.collection$('users');
  }

  makeUserAdmin(user) {
    this.afFunctions.httpsCallable('addAdmin')(user)
      .toPromise()
      .then(resp => {
        if(resp.error) {
          this.msg = resp.error;
        } else {
          this.msg = resp.result;
        }
        this.toastService.presentToast(this.msg, true, top, 'OK', 3000);
        console.log({resp});
      })
      .catch(err => {
        this.toastService.presentToast(err.error, true, top, 'OK', 3000);
        console.log({err});
      });
  }

  updateUser(path, data) {
    this.dbService.updateAt(path, data);
  }

  deleteUser(userPath) {
    this.dbService.delete(userPath)
      .then(() => {
        this.toastService.presentToast('The member has been deleted!',
          true, 'middle', 'Ok', 3000 );
      })
      .catch(err => {
        this.toastService.presentToast('You do not have the credentials to delete members!',
          true, 'middle', 'OK', 3000);
        console.log(err);
      });
  }
}
