import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {
  registerForm: FormGroup;
  passwordType: string = 'password';
  passwordShow: boolean = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: ['', (Validators.required, Validators.pattern(".+\@.+\..+"))],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async onRegisterForm() {
    const { email, password } = this.registerForm.value;
    await this.authService.emailCreateUser(email, password);
    await this.registerForm.reset();
    await this.modalCtrl.dismiss();
    // restore the code below after admins are done adding all users to database
    // this.router.navigate(['/']);
  }

  async onAdminRegisterForm() {

    const { email, password } = this.registerForm.value;
    const data = {
      email,
      password
    };

    await this.userService.adminAddUser(data);
    await this.registerForm.reset();
    await this.modalCtrl.dismiss();
    // restore the code below after admins are done adding all users to database
    // this.router.navigate(['/']);
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
