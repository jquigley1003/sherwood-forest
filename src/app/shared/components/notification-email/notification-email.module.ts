import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationEmailComponent } from './notification-email.component';
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';
const alignClass = Quill.import('attributors/style/align');
Quill.register(alignClass, true);

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        syntax: true
      }
    }),
  ],
  declarations: [
    NotificationEmailComponent
  ],
  exports: [
    NotificationEmailComponent
  ]
})
export class NotificationEmailModule {}