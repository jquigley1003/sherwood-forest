import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventsPage } from './events.page';
import { EventFormModule } from '../../shared/components/event-form/event-form.module';
import { EventModalModule } from '../../shared/modals/event-modal/event-modal-module';

const routes: Routes = [
  {
    path: '',
    component: EventsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    EventFormModule,
    EventModalModule
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {}
