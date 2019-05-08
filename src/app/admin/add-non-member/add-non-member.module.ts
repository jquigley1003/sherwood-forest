import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddNonMemberPage } from './add-non-member.page';

const routes: Routes = [
  {
    path: '',
    component: AddNonMemberPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddNonMemberPage]
})
export class AddNonMemberPageModule {}
