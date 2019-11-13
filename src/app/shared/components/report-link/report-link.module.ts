import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ReportLinkComponent } from './report-link.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [
    ReportLinkComponent
  ],
  exports: [
    ReportLinkComponent
  ]
})
export class ReportLinkModule { }
