import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SocialPage } from './social.page';
import { AngularCalendarModule } from '../../shared/components/angular-calendar/angular-calendar.module';
import { MyCalendarModule } from '../../shared/components/calendar/calendar.module';
import { FooterModule } from '../../shared/components/footer/footer.module';
import { EventModalModule } from '../../shared/modals/event-modal/event-modal-module';

const routes: Routes = [
  {
    path: '',
    component: SocialPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    AngularCalendarModule,
    MyCalendarModule,
    FooterModule,
    EventModalModule
  ],
  declarations: [SocialPage]
})
export class SocialPageModule {}
