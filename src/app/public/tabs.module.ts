import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs.router.module';
import { PublicPage } from './tabs.page';
import { LoginModalModule } from '../shared/modals/login-modal/login-modal.module';
import { LogoutModalModule } from '../shared/modals/logout-modal/logout-modal.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    LoginModalModule,
    LogoutModalModule
  ],
  declarations: [
    PublicPage
  ]
})
export class TabsPageModule {}
