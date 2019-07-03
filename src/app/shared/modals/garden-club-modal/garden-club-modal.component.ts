import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-garden-club-modal',
  templateUrl: './garden-club-modal.component.html',
  styleUrls: ['./garden-club-modal.component.scss'],
})
export class GardenClubModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
