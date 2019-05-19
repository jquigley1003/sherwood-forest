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

  constructor(private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private navParams: NavParams) { }

  ngOnInit() {

  }

  // showMemberProfile(user) {
  //   this.directoryForm = this.formBuilder.group({
  //     displayName: this.formBuilder.group({
  //       firstName: [user.displayName.firstName],
  //       lastName: [user.displayName.lastName]
  //     }),
  //     address: this.formBuilder.group({
  //       streetNumber: [user.address.streetNumber],
  //       streetName: [user.address.streetName],
  //       subAddress: [user.address.subAddress],
  //       city: [user.address],
  //       state: [user.address],
  //       zipCode: [user.address]
  //     }),
  //     phone: [user.phone],
  //     email: [user.email],
  //     birthDate: [''],
  //     occupation: [''],
  //     residentSince: ['']
  //   });
  // }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
