import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { DinnerCocktailModalComponent } from './dinner-cocktail-modal.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    DinnerCocktailModalComponent
  ],
  entryComponents: [
    DinnerCocktailModalComponent
  ]
})
export class DinnerCocktailModalModule { }
