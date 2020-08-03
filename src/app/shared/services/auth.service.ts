import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { auth } from 'firebase';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';

import { User } from '../../models/user.model';
import { DbService } from './db.service';
import { ToastService } from './toast.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  checkForAdmin = new Subject<boolean>();
  checkLoggedIn = new Subject<boolean>();
  emailVerifySubscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private dbService: DbService,
    private toastService: ToastService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      // * use this switchMap code to test user before DbService is created *
      // switchMap(user => {
      //   if (user) {
      //     return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      //   } else {
      //     return of(null)
      //   }
      // })
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  emailCreateUser(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.alertService.presentAlert(
          'Member has been added to SFCA Web App',
          'This is for the initial setup',
          'Remember to update the full information for this member',
          // 'Email Has Been Sent For Verification',
          // 'Please Check Your Email',
          // 'For your security, please check your email and click the link for verification.',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('Confirm Ok');
              // this.signOut();
            }
          }]
        );
        // this.sendEmailVerification();
        // ** remember to change cloud function when restoring
        // sendEmailVerification function and alert! **
        return this.updateUserData(credential.user);
      })
        // restore the 3 lines of code below when admins are finished adding new users
      // .then(() => {
      //   this.signOut();
      // })
      .catch(error => this.handleError(error));
  }

  signInUser(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        if(credential.user.emailVerified) {
          credential.user.getIdTokenResult()
            .then((idTokenResult) => {
              if(idTokenResult.claims.pendingMember) {
                this.alertService.presentAlert(
                  'Oops! Please Contact the SFCA Board',
                  'You Are Currently a Pending Member',
                  'You must be an Approved Member to gain full access to this web app',
                  [{
                      text: 'OK',
                      role: 'cancel',
                      handler: () => {
                        console.log('Confirm Ok');
                      }
                    }
                  ]
                );
                this.signOut();
              } else {
                this.checkLoggedIn.next(true);
                this.initCheckForAdmin();
                this.toastService.presentToast(
                  'Welcome back to Sherwood Forest Civic Association!',
                  'middle',
                  [{
                    text: 'OK',
                    role: 'cancel',
                    handler: () => {
                      console.log('dismiss toast message');
                    }
                  }], 3000);
              }
            });
        } else {
          this.alertService.presentAlert(
            'Verify Your Email',
            'Please Check Your Mailbox',
            'Click the link on the email we sent you for verification',
            [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                  this.signOut();
                }
              },
              {
                text: 'Resend Email',
                cssClass: 'secondary',
                handler: () => {
                  this.sendEmailVerification();
                  console.log('Resent verification email');
                }
              }
            ]
          );
        }
      })
      .catch(error => this.handleError(error));
  }

  sendEmailVerification() {
    return this.afAuth.currentUser
      .then((user) => {
        return user.sendEmailVerification();
      });


    // this.emailVerifySubscription = this.afAuth.authState.subscribe(user => {
    //   user.sendEmailVerification()
    //     .then(() => {
    //       this.signOut();
    //     })
    //     .then(() => {
    //       this.emailVerifySubscription.unsubscribe();
    //     });
    // });
  }

  // Reset Forgot password
  resetPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.alertService.presentAlert(
          'Password Reset Email Sent',
          'Please Check Your Inbox',
          'Follow the email instructions to reset your password',
          [{
              text: 'OK',
              role: 'cancel',
            },
            {
              text: 'Sign Out Now',
              cssClass: 'primary',
              handler: () => {
                this.signOut();
              }
            }
          ]
        );
      }).catch(error => this.handleError(error))
  }

  // change existing email address
  changeEmail(newEmail) {
    return this.afAuth.currentUser
      .then(async(user) => {
        await user.updateEmail(newEmail);
        await user.sendEmailVerification();
      })
      .then(() => {
        this.alertService.presentAlert(
          'Your Email Address Has Been Updated',
          'Please Check Your Inbox',
          '1) Click the link to verify your new email. 2) For security, an email was sent to your original email address so you can review the change',
          [{
              text: 'OK',
              role: 'cancel',
            },
            {
              text: 'Sign Out Now',
              cssClass: 'primary',
              handler: () => {
                this.signOut();
              }
            }
          ]
        )
      })
      .catch(error => this.handleError(error))
  }

  uid() {
    return this.user$
      .pipe(
        take(1),
        map(u => u && u.uid)
      )
      .toPromise()
  }

  adminRole() {
    return this.user$
      .pipe(
        take(1),
        map(u => u && u.roles.admin)
      )
      .toPromise();
  }

  approvedMember() {
    return this.user$
      .pipe(
        take(1),
        map(u => u && u.roles.approvedMember)
      )
      .toPromise();
  }

  initCheckForAdmin() {
    return this.user$
      .pipe(
        take(1),
        map(u => u && u.roles.admin)
      )
      .toPromise()
      .then((adminRole) => {
        if (adminRole) {
          this.checkForAdmin.next(true);
        } else {
          this.checkForAdmin.next(false);
        }
      });
  }

  initCheckForLogin() {
    return this.user$
      .pipe(
        take(1),
        map(u => u && u.uid)
      )
      .toPromise()
      .then((loggedIn) => {
        if (loggedIn) {
          this.checkLoggedIn.next(true);
        } else {
          this.checkLoggedIn.next(false);
        }
      });;
  }

  async signOut() {
    await this.afAuth.signOut();
    await this.checkForAdmin.next(false);
    await this.checkLoggedIn.next(false);
    this.toastService.presentToast(
      'You are signed out!',
      'top',
      [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('dismiss toast message');
        }
      }], 3000);
    return this.router.navigate(['/']);
  }

  private oAuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((credential) => {
        this.toastService.presentToast(
          'Welcome to Sherwood Forest Civic Association!',
          'top',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
        credential.user.getIdTokenResult()
          .then((idTokenResult) => {
            if(!idTokenResult.claims.pendingMember) {
              return this.updateUserData(credential.user);
            } else {
              this.initCheckForAdmin();
            }
          });
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: {
        firstName: 'New',
        lastName: 'Member'
      },
      address: {
        streetNumber: '123',
        streetName: 'Sherwood Forest',
        subAddress: null,
        city: 'Atlanta',
        state: 'GA',
        zipCode: '30309',
      },
      photoURL: 'https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/FrogBotanicalGarden.jpg?alt=media&token=11f3ff3f-c3e9-4cbe-a525-2dcb033bec79',
      birthDate: null,
      occupation: null,
      residentSince: null,
      paidDues: false,
      paidSecurity: false,
      paidBeauty: false,
      roles: {
        admin: false,
        pendingMember: true,
        approvedMember: false
      },
      spousePartner: {
        firstName: '',
        lastName: '',
        spID: ''
      }
    };
    return userRef.set(data, {merge: true});
    return this.afAuth.updateCurrentUser(user);

  }

  private handleError(error: Error) {
    console.error(error);
    this.toastService.presentToast(
      error.message,
      'middle',
      [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('dismiss toast message');
        }
      }], 5000);
  }
}
