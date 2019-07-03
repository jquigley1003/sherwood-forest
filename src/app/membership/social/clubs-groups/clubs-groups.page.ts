import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { AuthService } from '../../../shared/services/auth.service';
import { DinnerCocktailModalComponent } from '../../../shared/modals/dinner-cocktail-modal/dinner-cocktail-modal.component';
import { GameNightModalComponent } from '../../../shared/modals/game-night-modal/game-night-modal.component';
import { GardenClubModalComponent } from '../../../shared/modals/garden-club-modal/garden-club-modal.component';
import { MerryFolkModalComponent } from '../../../shared/modals/merry-folk-modal/merry-folk-modal.component';

@Component({
  selector: 'app-clubs-groups',
  templateUrl: './clubs-groups.page.html',
  styleUrls: ['./clubs-groups.page.scss'],
})
export class ClubsGroupsPage implements OnInit {

  constructor(private authService: AuthService,
              private modalCtrl: ModalController,
              private router: Router) { }

  ngOnInit() {
  }

  async presentDinnerCocktailModal() {
    const modal = await this.modalCtrl.create({
      component: DinnerCocktailModalComponent,
      componentProps: {
      }
    });
    return await modal.present();
  }

  async presentGameNightlModal() {
    const modal = await this.modalCtrl.create({
      component: GameNightModalComponent,
      componentProps: {
      }
    });
    return await modal.present();
  }

  async presentGardenClubModal() {
    const modal = await this.modalCtrl.create({
      component: GardenClubModalComponent,
      componentProps: {
      }
    });
    return await modal.present();
  }

  async presentMerryFolkModal() {
    const modal = await this.modalCtrl.create({
      component: MerryFolkModalComponent,
      componentProps: {
      }
    });
    return await modal.present();
  }

  goToSocial() {
    this.router.navigate(['/social']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  logOut() {
    this.authService.signOut();
  }
}
