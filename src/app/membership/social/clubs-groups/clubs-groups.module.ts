import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClubsGroupsPage } from './clubs-groups.page';

import { FooterModule } from '../../../shared/components/footer/footer.module';
import { DinnerCocktailModalModule } from '../../../shared/modals/dinner-cocktail-modal/dinner-cocktail-modal.module';
import { GameNightModalModule } from '../../../shared/modals/game-night-modal/game-night-modal.module';
import { GardenClubModalModule } from '../../../shared/modals/garden-club-modal/garden-club-modal.module';
import { MerryFolkModalModule } from '../../../shared/modals/merry-folk-modal/merry-folk-modal.module';

const routes: Routes = [
  {
    path: '',
    component: ClubsGroupsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FooterModule,
    DinnerCocktailModalModule,
    GameNightModalModule,
    GardenClubModalModule,
    MerryFolkModalModule
  ],
  declarations: [ClubsGroupsPage]
})
export class ClubsGroupsPageModule {}
