import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { DbService } from './db.service';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';
import { takeUntil } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{
  msg;
  retrieveUsers;
  _allUsers: BehaviorSubject<any[]> = new BehaviorSubject<any>([]);
  ngUnsubscribe = new Subject<void>();

  constructor(private authService: AuthService,
              private dbService: DbService,
              private afFunctions: AngularFireFunctions,
              private toastService: ToastService) {
                this.initializeUserService();
              }

  initializeUserService() {
    this.fetchUsers();
  }


  getAllUsers() {
    return this._allUsers.asObservable();
  }

  sendNotificationEmail(emailType, data) {
    const callable = this.afFunctions.httpsCallable(emailType);
    callable({
      subject: data.subject,
      emailmessage: data.emailmessage
    }).subscribe(resp => {
      if(resp.error) {
        this.msg = resp.error;
      } else {
        this.msg = resp.result;
      }
      this.toastService.presentToast(
        this.msg,
        'middle',
        [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            // console.log('dismiss toast message');
          }
        }], 3000);
    },
      err => {
        this.toastService.presentToast(
          err.error,
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              // console.log('dismiss toast message');
            }
          }], 3000);
        // console.log({err});
      });
  }

  adminAddUser(data) {
    this.toastService.presentToast(
      'Please wait while we add a new user.',
      'top',
      [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('dismiss toast message');
        }
      }], 3000);
    this.afFunctions.httpsCallable('adminCreateUser')(data)
      .toPromise()
      .then(resp => {
        if(resp.error) {
          this.msg = resp.error;
        } else {
          this.msg = resp.result;
        }
        this.toastService.presentToast
        (this.msg,
        'top',
        [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('dismiss toast message');
          }
        }], 3000);
        // console.log({resp});
      })
      .catch(err => {
        this.toastService.presentToast(
          err.error,
          'top',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
        // console.log({err});
      });
  }

  fetchSpousePartner(spID) {
    return this.dbService.collection$('users', ref => ref.where('uid', '==', spID));
  }

  getSpousePartner(spFirstName, spLastName, streetNumber) {
    return this.dbService.collection$('users', ref => ref
      .where('displayName.firstName', '==', spFirstName)
      .where('displayName.lastName', '==', spLastName)
      .where('address.streetNumber', '==', streetNumber));
  }

  fetchUsers() {
    this.dbService.collection$('users', ref => ref.orderBy('displayName.lastName'))
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
        res => {
        this._allUsers.next(res);
      },
    err => console.log("Error retrieving Users")
    );
  }

  fetchBoardMembers() {
    return this.dbService.collection$('users', ref => ref.where('boardTerm', '==', '2021 - 2022'));
  }

  fetchKeyContacts() {
    return this.dbService.collection$('users', ref => ref.where('boardKeyContact', '==', true));
  }

  async changeUserEmail(uid, newEmail) {
    const data = {
      uid: uid,
      newEmail: newEmail
    }
    await this.toastService.presentToast(
      'Please wait while we change the user\'s Email.',
      'top',
      [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('dismiss toast message');
        }
      }], 3000);
    this.afFunctions.httpsCallable('adminUpdateEmail')(data)
      .toPromise()
      .then(resp => {
        if(resp.error) {
          this.msg = resp.error;
        } else {
          this.msg = resp.result;
        }
        this.toastService.presentToast(
          this.msg,
          'top',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
        // console.log({resp});
      })
      .catch(err => {
        this.toastService.presentToast(
          err.error,
          'top',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
        // console.log({err});
      });
  }

  async changeUserPassword(uid, userName, newPassword) {
    const data = {
      uid: uid,
      userName: userName,
      newPassword: newPassword
    }
    // console.log('userService: ',data);
    await this.toastService.presentToast(
      'Please wait while we change the user\'s Password.',
      'top',
      [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('dismiss toast message');
        }
      }], 3000);
    this.afFunctions.httpsCallable('adminUpdatePassword')(data)
      .toPromise()
      .then(resp => {
        if(resp.error) {
          this.msg = resp.error;
        } else {
          this.msg = resp.result;
        }
        this.toastService.presentToast(
          this.msg,
          'top',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
        // console.log({resp});
      })
      .catch(err => {
        this.toastService.presentToast(
          err.error,
          'top',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
        // console.log({err});
      });
  }

  makeUserAdmin(user) {
    this.toastService.presentToast(
      'Please wait while we make this member an admin.',
      'top',
      [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('dismiss toast message');
        }
      }], 3000);
    this.afFunctions.httpsCallable('addAdmin')(user)
      .toPromise()
      .then(resp => {
        if(resp.error) {
          this.msg = resp.error;
        } else {
          this.msg = resp.result;
        }
        this.toastService.presentToast(
          this.msg,
          'top',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
        // console.log({resp});
      })
      .catch(err => {
        this.toastService.presentToast(
          err.error,
          'top',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
        // console.log({err});
      });
  }

  makeUserApproved(user) {
    this.toastService.presentToast(
      'Please wait while we approve this member.',
      'top',
      [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('dismiss toast message');
        }
      }], 3000);
    this.afFunctions.httpsCallable('markApproved')(user)
      .toPromise()
      .then(resp => {
        if(resp.error) {
          this.msg = resp.error;
        } else {
          this.msg = resp.result;
        }
        this.toastService.presentToast(
          this.msg,
          'top',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
        // console.log({resp});
      })
      .catch(err => {
        this.toastService.presentToast(
          err.error,
          'top',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
        // console.log({err});
      });
  }

  makeUserPending(user) {
    this.toastService.presentToast(
      'Please wait while we change user to pending.',
      'top',
      [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('dismiss toast message');
        }
      }], 3000);
    this.afFunctions.httpsCallable('markPending')(user)
      .toPromise()
      .then(resp => {
        if(resp.error) {
          this.msg = resp.error;
        } else {
          this.msg = resp.result;
        }
        this.toastService.presentToast(
          this.msg,
          'top',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
        // console.log({resp});
      })
      .catch(err => {
        this.toastService.presentToast(
          err.error,
          'top',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
        // console.log({err});
      });
  }

  async removeAdminRole(user) {
    await this.toastService.presentToast(
      'Please wait while we remove user as admin.',
      'top',
      [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('dismiss toast message');
        }
      }], 3000);
    this.afFunctions.httpsCallable('removeAdmin')(user)
      .toPromise()
      .then(resp => {
        if(resp.error) {
          this.msg = resp.error;
        } else {
          this.msg = resp.result;
        }
        this.toastService.presentToast(
          this.msg,
          'top',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
        // console.log({resp});
      })
      .catch(err => {
        this.toastService.presentToast(
          err.error,
          'top',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
        // console.log({err});
      });
  }

  updateUser(path, data) {
    this.dbService.updateAt(path, data);
  }

  resetUserPassword(userEmail) {
    this.authService.resetPassword(userEmail);
  }

  deleteUser(userPath) {
    this.toastService.presentToast(
      'Please wait while we delete this user.',
      'middle',
      [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('dismiss toast message');
        }
      }], 3000);
    this.dbService.delete(userPath)
      .then(() => {
        this.toastService.presentToast(
          'The user has been deleted!',
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000 );
      })
      .catch(err => {
        this.toastService.presentToast(
          'You do not have the credentials to delete users!',
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
        // console.log(err);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
