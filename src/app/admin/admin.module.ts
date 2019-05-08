import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminPage } from './admin.page';
import { OrderByPipe } from '../shared/pipes/order-by.pipe';
import { UserModalModule } from '../shared/modals/user-modal/user-modal.module';


const routes: Routes = [
  {
    path: '',
    component: AdminPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    UserModalModule
  ],
  declarations: [
    AdminPage,
    OrderByPipe
  ]
})
export class AdminPageModule {}
