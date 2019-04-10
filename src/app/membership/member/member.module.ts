import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MemberPage } from './member.page';
import { UserModalModule } from '../../shared/modals/user-modal/user-modal.module';

const routes: Routes = [
  {
    path: '',
    component: MemberPage
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
  declarations: [MemberPage]
})
export class MemberPageModule {}
