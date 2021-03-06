import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginModalComponent } from './login-modal.component';
import { RegisterModalModule } from '../register-modal/register-modal.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterModalModule
  ],
  declarations: [
    LoginModalComponent
  ],
  entryComponents: [
    LoginModalComponent
  ]
})
export class LoginModalModule {}