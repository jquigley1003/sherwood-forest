import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { RegisterModalComponent } from '../../shared/modals/register-modal/register-modal.component';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})
export class AddMemberPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async presentRegisterModal() {
    const modal = await this.modalCtrl.create({
      component: RegisterModalComponent,
      componentProps: {}
    });
    return await modal.present();
  }
}
