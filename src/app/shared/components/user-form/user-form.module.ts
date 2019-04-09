import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserFormComponent } from './user-form.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserFormComponent
  ],
  exports: [
    UserFormComponent
  ]
})
export class UserFormModule { }
