import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { UserModalComponent } from './user-modal.component';

import { UserFormModule } from '../../components/user-form/user-form.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    UserFormModule
  ],
  declarations: [
    UserModalComponent
  ],
  entryComponents: [
    UserModalComponent
  ]
})
export class UserModalModule { }
