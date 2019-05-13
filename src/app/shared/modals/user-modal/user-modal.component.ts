import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController, NavParams } from '@ionic/angular';

import { User } from '../../../models/user.model';

import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {

  userForm: FormGroup;
  uid: string = this.navParams.get('uid');
  photoURL: string = this.navParams.get('photoURL');
  firstName: string = this.navParams.get('firstName');
  lastName: string = this.navParams.get('lastName');
  streetNumber: string = this.navParams.get('streetNumber');
  streetName: string = this.navParams.get('streetName');
  subAddress: string = this.navParams.get('subAddress');
  city: string = this.navParams.get('city');
  state: string = this.navParams.get('state');
  zipCode: string = this.navParams.get('zipCode');
  phone: string = this.navParams.get('phone');
  email: string = this.navParams.get('email');
  birthDate: string = this.navParams.get('birthDate');
  occupation: string = this.navParams.get('occupation');
  residentSince: string = this.navParams.get('residentSince');

  constructor(private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private navParams: NavParams,
              private userService: UserService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      displayName: this.formBuilder.group({
        firstName: [this.firstName, Validators.required],
        lastName: [this.lastName, Validators.required]
      }),
      address: this.formBuilder.group({
        streetNumber: [this.streetNumber, Validators.required],
        streetName: [this.streetName, Validators.required],
        subAddress: [this.subAddress],
        city: [this.city, Validators.required],
        state: [this.state, Validators.required],
        zipCode: [this.zipCode, Validators.required]
      }),
      phone: [this.phone, Validators.required],
      email: [this.email, (Validators.required, Validators.pattern(".+\@.+\..+"))],
      birthDate: [this.birthDate],
      occupation: [this.occupation],
      residentSince: [this.residentSince]
    });
  }

  async onUpdateUser() {
    const firstName = this.userForm.controls['displayName'].value.firstName;
    const lastName = this.userForm.controls['displayName'].value.lastName;
    const streetNumber = this.userForm.controls['address'].value.streetNumber;
    const streetName = this.userForm.controls['address'].value.streetName;
    const subAddress = this.userForm.controls['address'].value.subAddress;
    const city = this.userForm.controls['address'].value.city;
    const state = this.userForm.controls['address'].value.state;
    const zipCode = this.userForm.controls['address'].value.zipCode;
    const { phone, email, birthDate, occupation, residentSince } = this.userForm.value;

    const data: User = {
      uid: this.uid,
      displayName: {
        firstName: firstName,
        lastName: lastName
      },
      address: {
        streetNumber: streetNumber,
        streetName: streetName,
        subAddress: subAddress,
        city: city,
        state: state,
        zipCode: zipCode
      },
      photoURL: this.photoURL || 'https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/anon.png?alt=media&token=37218266-cecd-4525-bc51-909f388f773f',
      phone: phone,
      email: email,
      birthDate: birthDate,
      occupation: occupation,
      residentSince: residentSince
    };
    await this.userService.updateUser('users/'+ this.uid, data);
    await this.toastService.presentToast('The member profile for '+ firstName +' has been updated!',
      true, 'top', 'Ok', 3000 );
    await this.userForm.reset();
    await this.modalCtrl.dismiss();
    // this.router.navigate(['/member']);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
