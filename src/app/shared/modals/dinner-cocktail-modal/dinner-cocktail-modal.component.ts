import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dinner-cocktail-modal',
  templateUrl: './dinner-cocktail-modal.component.html',
  styleUrls: ['./dinner-cocktail-modal.component.scss'],
})
export class DinnerCocktailModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
