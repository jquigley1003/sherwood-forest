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
  user$: Observable<any>;
  checkForAdmin = new Subject <boolean>();
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
      switchMap(user => (user ? this.dbService.doc$(`users/${user.uid}`) : of(null)))
    );
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  emailCreateUser(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.alertService.presentAlert(
          'Email Has Been Sent For Verification',
          'Please Check Your Email',
          'For your security, please check your email and click the link for verification.',
          ['OK']
        )
        this.sendEmailVerification();
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  signInUser(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        if(credential.user.emailVerified) {
          this.toastService.presentToast('Welcome back to Sherwood Forest Civic Association!', true, 'top', 'Close', 3000);
          credential.user.getIdTokenResult()
            .then((idTokenResult) => {
              if(!idTokenResult.claims.subscriber) {
                return this.updateUserData(credential.user);
              } else {
                this.initCheckForAdmin();
                console.log('no need to update user in cloud firestore');
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
                console.log('Confirm Ok');
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
              }]
          );
        }
      })
      .catch(error => this.handleError(error));
  }

  sendEmailVerification() {
    this.emailVerifySubscription = this.afAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          this.signOut();
        })
        .then(() => {
          this.emailVerifySubscription.unsubscribe();
        });
    });
  }

  uid() {
    return this.user$
      .pipe(
        take(1),
        map(u => u && u.uid)
      )
      .toPromise();
  }

  adminRole() {
    return this.user$
      .pipe(
        take(1),
        map(u => u && u.roles.admin)
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

  async signOut() {
    await this.afAuth.auth.signOut();
    this.checkForAdmin.next(false);
    this.toastService.presentToast('You are signed out!', true, 'top', 'Close', 3000);
    return this.router.navigate(['/']);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((credential) => {
        this.toastService.presentToast('Welcome to Sherwood Forest Civic Association!', true, 'top', 'Close', 3000);
        credential.user.getIdTokenResult()
          .then((idTokenResult) => {
            if(!idTokenResult.claims.subscriber) {
              return this.updateUserData(credential.user);
            } else {
              this.initCheckForAdmin();
              console.log('no need to update user in cloud firestore');
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
    console.log('We are creating your user profile in cloud firestore')
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || user.email,
      photoURL: user.photoURL || 'https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/anon.png?alt=media&token=37218266-cecd-4525-bc51-909f388f773f',
      roles: {
        admin: false,
        pendingMember: true,
        approvedMember: false
      }
    };
    return userRef.set(data, {merge: true});
    return this.afAuth.auth.updateCurrentUser(user);

  }

  private handleError(error: Error) {
    console.error(error);
    this.toastService.presentToast(error.message, true, 'top', 'Close', 3000);
  }
}
