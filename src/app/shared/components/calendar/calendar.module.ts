import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgCalendarModule } from 'ionic2-calendar';

import { MyCalendarComponent } from './calendar.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgCalendarModule
  ],
  declarations: [
    MyCalendarComponent
  ],
  exports: [
    MyCalendarComponent
  ]
})
export class MyCalendarModule { }
