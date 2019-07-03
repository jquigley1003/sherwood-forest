import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { GardenClubModalComponent } from './garden-club-modal.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    GardenClubModalComponent
  ],
  entryComponents: [
    GardenClubModalComponent
  ]
})
export class GardenClubModalModule { }
