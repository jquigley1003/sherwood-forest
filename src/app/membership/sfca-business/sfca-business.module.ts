import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SfcaBusinessPage } from './sfca-business.page';

const routes: Routes = [
  {
    path: '',
    component: SfcaBusinessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SfcaBusinessPage]
})
export class SfcaBusinessPageModule {}
