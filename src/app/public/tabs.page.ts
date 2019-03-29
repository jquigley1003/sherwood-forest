import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { LoginModalComponent } from '../shared/modals/login-modal/login-modal.component';

@Component({
  selector: 'app-public',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class PublicPage {

  constructor(private modalCtrl: ModalController) {}


  async presentLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginModalComponent,
      componentProps: {}
    });
    return await modal.present();
  }
}
