import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SfcaBusinessPage } from './sfca-business.page';
import { FooterModule } from '../../shared/components/footer/footer.module';

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
    RouterModule.forChild(routes),
    FooterModule
  ],
  declarations: [SfcaBusinessPage]
})
export class SfcaBusinessPageModule {}
