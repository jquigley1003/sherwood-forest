import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventModalComponent } from './event-modal.component';
import { EventFormModule } from '../../components/event-form/event-form.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    EventFormModule
  ],
  declarations: [
    EventModalComponent
  ],
  entryComponents: [
    EventModalComponent
  ]
})
export class EventModalModule { }