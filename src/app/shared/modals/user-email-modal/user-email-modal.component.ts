import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalController, NavParams } from '@ionic/angular';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-email-modal',
  templateUrl: './user-email-modal.component.html',
  styleUrls: ['./user-email-modal.component.scss'],
})
export class UserEmailModalComponent implements OnInit {
  changeEmailForm: FormGroup;
  uid: string = this.navParams.get('uid');
  currentEmail: string = this.navParams.get('currentEmail');

  constructor(
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private userService: UserService
  ) { 
    this.changeEmailForm = this.formBuilder.group({
      email: ['', (Validators.required, Validators.pattern(".+\@.+\..+"))]
    });
  }

  ngOnInit() {}

  async onChangeEmailForm() {
    const newEmail = this.changeEmailForm.value.email;
    await this.userService.changeUserEmail(this.uid, newEmail);
    this.modalCtrl.dismiss();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
