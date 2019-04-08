import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { AuthService } from '../shared/services/auth.service';

import { LoginModalComponent } from '../shared/modals/login-modal/login-modal.component';
import { LogoutModalComponent } from '../shared/modals/logout-modal/logout-modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-public',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class PublicPage {

  loggedIn$: Observable<any> = this.authService.user$;

  constructor(private modalCtrl: ModalController,
              private authService: AuthService) {}


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
