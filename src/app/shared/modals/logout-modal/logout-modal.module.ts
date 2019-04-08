import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LogoutModalComponent } from './logout-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [
  LogoutModalComponent
],
  entryComponents: [
  LogoutModalComponent
]
})
export class LogoutModalModule { }
