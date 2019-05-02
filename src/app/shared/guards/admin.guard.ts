import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const adminRole = await this.authService.adminRole();
    const isAdmin = !!adminRole;

    if(!isAdmin) {
      const alert = await this.alertController.create({
        header: 'Blocked',
        subHeader: 'Admins only',
        message: 'You must be an administrator & logged in to access this page.',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/']);
    }
    return isAdmin;
  }
}