import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserModalComponent } from './user-modal.component';

import { UserFormModule } from '../../components/user-form/user-form.module';
import { UploaderModule } from '../../components/uploader/uploader.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    UserFormModule,
    FormsModule,
    ReactiveFormsModule,
    UploaderModule
  ],
  declarations: [
    UserModalComponent
  ],
  entryComponents: [
    UserModalComponent
  ]
})
export class UserModalModule { }
