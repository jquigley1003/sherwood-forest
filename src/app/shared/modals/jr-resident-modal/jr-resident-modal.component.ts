import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-jr-resident-modal',
  templateUrl: './jr-resident-modal.component.html',
  styleUrls: ['./jr-resident-modal.component.scss'],
})
export class JrResidentModalComponent implements OnInit {

  jrResidents: any = this.navParams.get('jrResidents');

  jrResForm: FormGroup;

  constructor(private modalCtrl: ModalController,
              private navParams: NavParams,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.jrResForm = this.formBuilder.group({
      displayName: this.formBuilder.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required]
      }),
      age: [''],
      parents: ['']
    });
  }

  async onUpdateJr() {
    // const firstName = this.userForm.controls['displayName'].value.firstName;
    // const lastName = this.userForm.controls['displayName'].value.lastName;
    // const streetNumber = this.userForm.controls['address'].value.streetNumber;
    // const streetName = this.userForm.controls['address'].value.streetName;
    // const subAddress = this.userForm.controls['address'].value.subAddress;
    // const city = this.userForm.controls['address'].value.city;
    // const state = this.userForm.controls['address'].value.state;
    // const zipCode = this.userForm.controls['address'].value.zipCode;
    // const { phone, email, birthDate, occupation, residentSince } = this.userForm.value;
    // const showBirthDate = this.showBirthDate;
    //
    // const data: User = {
    //   uid: this.uid,
    //   displayName: {
    //     firstName: firstName,
    //     lastName: lastName
    //   },
    //   address: {
    //     streetNumber: streetNumber,
    //     streetName: streetName,
    //     subAddress: subAddress,
    //     city: city,
    //     state: state,
    //     zipCode: zipCode
    //   },
    //   // photoURL: this.photoURL || 'https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/anon.png?alt=media&token=37218266-cecd-4525-bc51-909f388f773f',
    //   phone: phone,
    //   email: email,
    //   birthDate: birthDate,
    //   showBirthDate: showBirthDate,
    //   occupation: occupation,
    //   residentSince: residentSince
    // };
    // await this.userService.updateUser('users/'+ this.uid, data);
    // await this.toastService.presentToast('The member profile for '+ firstName +' has been updated!',
    //   true, 'top', 'Ok', 3000 );
    // await this.userForm.reset();
    // await this.modalCtrl.dismiss();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
