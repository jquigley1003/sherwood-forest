import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminPage } from './admin.page';
import { OrderByPipe } from '../shared/pipes/order-by.pipe';
import { UserModalModule } from '../shared/modals/user-modal/user-modal.module';
import { JrResidentModalModule } from '../shared/modals/jr-resident-modal/jr-resident-modal.module';
import { PetModalModule } from '../shared/modals/pet-modal/pet-modal.module';
import { ReportLinkModule } from '../shared/components/report-link/report-link.module';
import { UserEmailModalModule } from '../shared/modals/user-email-modal/user-email-modal.module';
import { UserPasswordModalModule } from '../shared/modals/user-password-modal/user-password-modal.module';


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
    UserModalModule,
    UserEmailModalModule,
    UserPasswordModalModule,
    JrResidentModalModule,
    PetModalModule,
    ReportLinkModule
  ],
  declarations: [
    AdminPage,
    OrderByPipe
  ]
})
export class AdminPageModule {}
