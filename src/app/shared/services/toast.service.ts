import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(message, showCloseButton, position, closeButtonText, duration) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: showCloseButton,
      position: position,
      closeButtonText: closeButtonText,
      duration: duration
    });
    toast.present();
  }
}
