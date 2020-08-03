import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationEmailComponent } from './notification-email.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule
  ],
  declarations: [
    NotificationEmailComponent
  ],
  exports: [
    NotificationEmailComponent
  ]
})
export class NotificationEmailModule {}