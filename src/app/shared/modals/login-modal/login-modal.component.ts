import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  logInForm: FormGroup;
  checkUser: boolean;
  passwordShow: boolean = false;
  passwordType: string = 'password';

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private router: Router) {
    this.logInForm = this.formBuilder.group({
      email: ['', (Validators.required, Validators.pattern(".+\@.+\..+"))],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async onLogInForm() {
    const { email, password } = this.logInForm.value;
    await this.authService.signInUser(email, password);
    await this.authService.uid()
      .then((result) => {
        this.checkUser = !!result;
      });
    if(this.checkUser) {
      this.router.navigate(['/member']);
    } else {
      this.router.navigate(['/']);
    }
    this.logInForm.reset();
    this.modalCtrl.dismiss();
  }

  async onGoogleLogin() {
    await this.authService.googleLogin();
    await this.modalCtrl.dismiss();
    this.router.navigate(['/member']);
  }

  async presentRegisterModal() {
    await this.closeModal();
    const modal = await this.modalCtrl.create({
      component: RegisterModalComponent,
      componentProps: {}
    });
    return await modal.present();
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
