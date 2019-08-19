import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-directory-modal',
  templateUrl: './directory-modal.component.html',
  styleUrls: ['./directory-modal.component.scss'],
})
export class DirectoryModalComponent implements OnInit {
  directoryForm: FormGroup;
  photoURL: string = this.navParams.get('photoURL');
  name: string = this.navParams.get('name');
  phone: string = this.navParams.get('phone');
  email: string = this.navParams.get('email');
  address: string = this.navParams.get('address');
  cityStateZip: string = this.navParams.get('cityStateZip');
  residentSince: string = this.navParams.get('residentSince');
  showBirthDate: boolean = this.navParams.get('showBirthDate');
  birthDate: string = this.navParams.get('birthDate');
  spousePartnerName: string = this.navParams.get('spousePartnerName');
  jrResidents: any = this.navParams.get('jrResidents');
  pets: any = this.navParams.get('pets');

  constructor(private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private navParams: NavParams) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
