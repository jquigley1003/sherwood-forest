import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Tab2Page } from './tab2.page';
import { LoginModalModule } from '../../shared/modals/login-modal/login-modal.module';
import { LogoutModalModule } from '../../shared/modals/logout-modal/logout-modal.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    LoginModalModule,
    LogoutModalModule
  ],
  declarations: [
    Tab2Page
  ]
})
export class Tab2PageModule {}
