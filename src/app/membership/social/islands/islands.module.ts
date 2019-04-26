import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IslandsPage } from './islands.page';
import { FooterModule } from '../../../shared/components/footer/footer.module';

const routes: Routes = [
  {
    path: '',
    component: IslandsPage
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
  declarations: [IslandsPage]
})
export class IslandsPageModule {}
