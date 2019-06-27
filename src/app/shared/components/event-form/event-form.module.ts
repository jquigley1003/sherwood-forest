import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventFormComponent } from './event-form.component';
import { UploaderFileModule } from '../uploader-file/uploader-file.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UploaderFileModule
  ],
  declarations: [
    EventFormComponent
  ],
  exports: [
    EventFormComponent
  ]
})
export class EventFormModule {}