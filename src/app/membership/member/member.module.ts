import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MemberPage } from './member.page';
import { UserModalModule } from '../../shared/modals/user-modal/user-modal.module';
import { FooterModule } from '../../shared/components/footer/footer.module';
import { EventModalModule } from '../../shared/modals/event-modal/event-modal-module';
import { JrResidentModalModule } from '../../shared/modals/jr-resident-modal/jr-resident-modal.module';
import { PetModalModule } from '../../shared/modals/pet-modal/pet-modal.module';

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
    UserModalModule,
    EventModalModule,
    FooterModule,
    JrResidentModalModule,
    PetModalModule
  ],
  declarations: [MemberPage]
})
export class MemberPageModule {}
