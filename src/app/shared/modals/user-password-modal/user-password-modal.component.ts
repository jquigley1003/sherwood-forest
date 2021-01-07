import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-password-modal',
  templateUrl: './user-password-modal.component.html',
  styleUrls: ['./user-password-modal.component.scss'],
})
export class UserPasswordModalComponent implements OnInit {
  passwordType: string = 'password';
  passwordShow: boolean = false;
  changePasswordForm: FormGroup;
  uid: string = this.navParams.get('uid');
  userName: string = this.navParams.get('userName');

  constructor(
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private userService: UserService
  ) { 
    this.changePasswordForm = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async onChangePasswordForm() {
    const newPassword = this.changePasswordForm.value.password;
    // console.log('uid: ',this.uid, ' userName: ',this.userName, ' ',newPassword );
    await this.userService.changeUserPassword(this.uid, this.userName, newPassword);
    this.modalCtrl.dismiss();
  }

  togglePassword() {
    if(this.passwordShow) {
      this.passwordShow = false;
      this.passwordType = 'password';
    } else {
      this.passwordShow = true;
      this.passwordType = 'text';
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
