import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs.router.module';
import { PublicPage } from './tabs.page';
import { LoginModalModule } from '../shared/modals/login-modal/login-modal.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    LoginModalModule
  ],
  declarations: [
    PublicPage
  ]
})
export class TabsPageModule {}
