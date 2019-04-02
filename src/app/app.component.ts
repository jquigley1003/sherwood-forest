import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
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
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
