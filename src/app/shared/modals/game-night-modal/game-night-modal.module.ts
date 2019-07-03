import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { GameNightModalComponent } from './game-night-modal.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    GameNightModalComponent
  ],
  entryComponents: [
    GameNightModalComponent
  ]
})
export class GameNightModalModule { }
