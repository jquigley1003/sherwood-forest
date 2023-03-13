import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginModalComponent } from './login-modal.component';
import { RegisterModalModule } from '../register-modal/register-modal.module';
import { ForgotPasswordModalModule } from '../forgot-password-modal/forgot-password-modal.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterModalModule,
    ForgotPasswordModalModule
  ],
  declarations: [
    LoginModalComponent
  ],
  entryComponents: [
    LoginModalComponent
  ]
})
export class LoginModalModule {}