import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventFormComponent } from './event-form.component';
import { UploaderModule } from '../uploader/uploader.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UploaderModule
  ],
  declarations: [
    EventFormComponent
  ],
  exports: [
    EventFormComponent
  ]
})
export class EventFormModule {}