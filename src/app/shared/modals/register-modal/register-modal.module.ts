import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterModalComponent } from './register-modal.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegisterModalComponent
  ],
  entryComponents:[
    RegisterModalComponent
  ]
})
export class RegisterModalModule { }
