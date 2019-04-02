import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const uid = await this.authService.uid();
    const isLoggedIn = !!uid;

    if(!isLoggedIn) {
      const alert = await this.alertController.create({
        header: 'Blocked',
        subHeader: 'Members only',
        message: 'You need to be a Sherwood Forest resident to access this page.',
        buttons: ['OK']
      });
      await alert.present();
    }
    return isLoggedIn;
  }
}