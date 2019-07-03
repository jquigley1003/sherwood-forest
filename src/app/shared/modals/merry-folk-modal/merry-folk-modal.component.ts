import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-merry-folk-modal',
  templateUrl: './merry-folk-modal.component.html',
  styleUrls: ['./merry-folk-modal.component.scss'],
})
export class MerryFolkModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
