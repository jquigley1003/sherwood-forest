import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SwUpdate } from '@angular/service-worker';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from './shared/services/auth.service';
import { AlertService } from './shared/services/alert.service';
import { LoginModalComponent } from './shared/modals/login-modal/login-modal.component';
import { LogoutModalComponent } from './shared/modals/logout-modal/logout-modal.component';
import { RegisterModalComponent } from './shared/modals/register-modal/register-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  isAdmin: boolean;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth: AngularFireAuth,
    public authService: AuthService,
    private modalCtrl: ModalController,
    private swUpdate: SwUpdate,
    private alertService: AlertService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.authService.initCheckForLogin();
    this.authService.checkLoggedIn
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(loggedInStatus => {
        this.isLoggedIn = loggedInStatus;
      });
    this.authService.initCheckForAdmin();
    this.authService.checkForAdmin
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(adminStatus => {
        this.isAdmin = adminStatus;
      });
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(data => {
        console.log(data.current.appData);
        this.alertService.presentAlert(
          'App Update!',
          'Updated version of SFCA app available.',
          'Load Improved Version?',
          [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
            },
            {
              text: 'Yes',
              handler: () => {
                window.location.reload();
              }
            }
          ]
        );
          // if (confirm('Updated version of SFCA app available. Load New Version?')) {
          //     window.location.reload();
          // }
      });
    }
  }

  async presentLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginModalComponent,
      componentProps: {}
    });
    return await modal.present();
  }

  async presentLogoutModal() {
    const modal = await this.modalCtrl.create({
      component: LogoutModalComponent,
      componentProps: {}
    });
    return await modal.present();
  }

  async presentRegisterModal() {
    const modal = await this.modalCtrl.create({
      component: RegisterModalComponent,
      componentProps: {}
    });
    return await modal.present();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
