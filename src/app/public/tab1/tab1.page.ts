import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { growImgTrigger, slideTitleLeftTrigger, slideTitleRightTrigger } from '../../shared/components/animations/animations';
import { Observable, Subscription } from 'rxjs';

import { LoginModalComponent } from '../../shared/modals/login-modal/login-modal.component';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { ModalController } from '@ionic/angular';

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

  loggedIn$: Observable<any>;
  allKeyContacts$: Observable<any>;
  keyContactsSub: Subscription;
  keyContacts: [];

  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private modalCtrl: ModalController){}

  ngOnInit() {
    this.loggedIn$ = this.authService.user$;
    this.allKeyContacts$ = this.userService.fetchKeyContacts();
    this.keyContactsSub = this.allKeyContacts$.subscribe(key => {
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

  goHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.keyContactsSub.unsubscribe();
  }

}
