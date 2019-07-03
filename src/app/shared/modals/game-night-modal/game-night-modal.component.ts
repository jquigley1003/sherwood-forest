import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-game-night-modal',
  templateUrl: './game-night-modal.component.html',
  styleUrls: ['./game-night-modal.component.scss'],
})
export class GameNightModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
