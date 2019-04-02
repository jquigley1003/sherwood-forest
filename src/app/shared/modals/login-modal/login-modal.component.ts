import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  logInForm: FormGroup;

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

  OnLogInForm() {
    const { email, password } = this.logInForm.value;
    this.authService.signInUser(email, password);
    this.logInForm.reset();
    this.modalCtrl.dismiss();
  }

  OnGoogleLogin() {
    this.authService.googleLogin();
    this.modalCtrl.dismiss();
    this.router.navigate(['/member']);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
