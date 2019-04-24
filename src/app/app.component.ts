import { Component } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './shared/services/auth.service';
import { Observable } from 'rxjs';
import { LoginModalComponent } from './shared/modals/login-modal/login-modal.component';
import { LogoutModalComponent } from './shared/modals/logout-modal/logout-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  loggedIn$: Observable<any> = this.authService.user$;

  public appPages = [
    {
      title: 'Home',
      url: '/public/home',
      icon: 'home'
    },
    {
      title: 'Member Access',
      url: '/public/member-access',
      icon: 'people'
    },
    {
      title: 'Contact',
      url: '/public/contact',
      icon: 'mail'
    },
    {
      title: 'Member',
      url: '/member',
      icon: 'person'
    },
    {
      title: 'Social',
      url: '/social',
      icon: 'today'
    },
    {
      title: 'SFCA Business',
      url: '/sfca-business',
      icon: 'briefcase'
    },
    {
      title: 'Filming',
      url: '/filming',
      icon: 'film'
    },
    {
      title: 'Security',
      url: '/security',
      icon: 'lock'
    },
    {
      title: 'Directory',
      url: '/directory',
      icon: 'book'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
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
}
