import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { LoginModalComponent } from '../../shared/modals/login-modal/login-modal.component';
import { LogoutModalComponent } from '../../shared/modals/logout-modal/logout-modal.component';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  loggedIn$: Observable<any> = this.authService.user$;

  constructor(private modalCtrl: ModalController,
              private authService: AuthService,
              private router: Router){}

  goHome() {
    this.router.navigate(['/']);
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
