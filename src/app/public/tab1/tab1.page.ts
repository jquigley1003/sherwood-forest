import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';

import { get, set } from 'idb-keyval';

import { growImgTrigger, slideTitleLeftTrigger, slideTitleRightTrigger } from '../../shared/components/animations/animations';

import { LoginModalComponent } from '../../shared/modals/login-modal/login-modal.component';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  animations: [
    slideTitleRightTrigger,
    slideTitleLeftTrigger,
    growImgTrigger
  ]
})
export class Tab1Page implements OnInit, OnDestroy {

  isLoggedIn: boolean;
  allKeyContacts$: Observable<any>;
  keyContacts: [];
  ngUnsubscribe = new Subject<void>();

  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private modalCtrl: ModalController,
              private toastService: ToastService){}

  ngOnInit() {
    this.authService.initCheckForLogin();
    this.authService.checkLoggedIn
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(loggedInStatus => {
        this.isLoggedIn = loggedInStatus;
      });
    this.getKeyContacts();
    this.showIosInstallBanner();
  }

  async getKeyContacts() {
    this.allKeyContacts$ = await this.userService.fetchKeyContacts();
    this.allKeyContacts$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(key => {
      this.keyContacts = key;
    });
  }

  async presentLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginModalComponent,
      componentProps: {}
    });
    return await modal.present();
  }

  async showIosInstallBanner() {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator['standalone']);
  
    // Show the banner once
    const isBannerShown = await get('isBannerShown');
  
    // Checks if it should display install popup notification
    if (isIos() && !isInStandaloneMode() && isBannerShown === undefined) {
      this.toastService.presentToast(
        'To install the app: 1. Use the Safari Browser | 2. tap "Share" icon below | 3. select "Add to Home Screen".',
        'bottom',
        [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('dismiss toast message');
          }
        }], 10000);
      set('isBannerShown', true);
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
