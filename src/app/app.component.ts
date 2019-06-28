import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Observable, Subscription } from 'rxjs';

import { AuthService } from './shared/services/auth.service';
import { LoginModalComponent } from './shared/modals/login-modal/login-modal.component';
import { LogoutModalComponent } from './shared/modals/logout-modal/logout-modal.component';
import { RegisterModalComponent } from './shared/modals/register-modal/register-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  loggedIn$: Observable<any>;
  isAdmin: boolean;
  authSubscription: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth: AngularFireAuth,
    public authService: AuthService,
    private modalCtrl: ModalController
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
    this.authService.initCheckForAdmin();
    this.authSubscription = this.authService.checkForAdmin
      .subscribe(adminStatus => {
        this.isAdmin = adminStatus;
      });
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
    this.authSubscription.unsubscribe();
  }
}
