import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordModalComponent } from './forgot-password-modal.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ForgotPasswordModalComponent
  ],
  entryComponents:[
    ForgotPasswordModalComponent
  ]
})
export class ForgotPasswordModalModule { }