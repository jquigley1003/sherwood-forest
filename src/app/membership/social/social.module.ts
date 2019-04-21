import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SocialPage } from './social.page';
import { MyCalendarModule } from '../../shared/components/calendar/calendar.module';
import { FooterModule } from '../../shared/components/footer/footer.module';

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
    MyCalendarModule,
    FooterModule
  ],
  declarations: [SocialPage]
})
export class SocialPageModule {}
