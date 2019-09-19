import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TreeWatchPage } from './tree-watch.page';
import { FooterModule } from '../../shared/components/footer/footer.module';

const routes: Routes = [
  {
    path: '',
    component: TreeWatchPage
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
  declarations: [TreeWatchPage]
})
export class TreeWatchPageModule {}
