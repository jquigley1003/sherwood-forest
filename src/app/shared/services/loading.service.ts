import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public loadingCtrl: LoadingController) { }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Content...',
      spinner: 'bubbles',
      duration: 15000,
    });
    return await loading.present();
  }

  dismissLoading() {
    this.loadingCtrl.dismiss();
  }
}
