import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddMemberPage } from './add-member.page';
import { RegisterModalModule } from '../../shared/modals/register-modal/register-modal.module';


const routes: Routes = [
  {
    path: '',
    component: AddMemberPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    RegisterModalModule
  ],
  declarations: [AddMemberPage]
})
export class AddMemberPageModule {}
