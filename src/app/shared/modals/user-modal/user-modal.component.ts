import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController, NavParams } from '@ionic/angular';

import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { User } from '../../../models/user.model';

import { UserService } from '../../services/user.service';
import { JrResidentService } from '../../services/jr-resident.service';
import { PetService } from '../../services/pet.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  editProfilePic: boolean = false;

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
  phoneHyphen: string;
  email: string = this.navParams.get('email');
  birthDate: string = this.navParams.get('birthDate');
  showBirthDate: boolean = this.navParams.get('showBirthDate');
  occupation: string = this.navParams.get('occupation');
  residentSince: string = this.navParams.get('residentSince');
  spID: string = this.navParams.get('spID');
  spFirstName: string = this.navParams.get('spFirstName');
  spLastName: string = this.navParams.get('spLastName');
  spPhotoURL: string = this.navParams.get('spPhotoURL');
  jrResidents: any = this.navParams.get('jrResidents');
  pets: any = this.navParams.get('pets');

  imgFullName: string;

  radioList = [
    {
      id: '1',
      name: 'radioList',
      value: 'true',
      text: 'Yes',
      disabled: false,
      checked: (this.showBirthDate === true) ? true : false,
      color: 'primary'
    },
    {
      id: '2',
      name: 'radioList',
      value: 'false',
      text: 'No',
      disabled: false,
      checked: (this.showBirthDate === false) ? true : false,
      color: 'primary'
    }
  ];

  otherHalf = null;
  otherHalf$: Observable<any>;

  constructor(private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private navParams: NavParams,
              private userService: UserService,
              private jrResService: JrResidentService,
              private petService: PetService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.imgFullName = this.firstName + this.lastName;
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
      phone: [this.phone, (Validators.required, Validators.pattern("^((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$"))],
      email: [this.email, (Validators.required, Validators.pattern(".+\@.+\..+"))],
      birthDate: [this.birthDate],
      showBirthDate: [this.showBirthDate],
      occupation: [this.occupation],
      residentSince: [this.residentSince],
      spFirstName: [this.spFirstName],
      spLastName: [this.spLastName],
      spPhotoURL: [this.spPhotoURL]
    });
  }

  radioSelect(event) {
    this.showBirthDate = (event.detail.value === 'true') ? true : false;
  }

  async onUpdateUser() {
    this.otherHalf$ = await this.userService.getSpousePartner(
      this.userForm.value.spFirstName.trim(),
      this.userForm.value.spLastName.trim(),
      this.userForm.controls['address'].value.streetNumber.trim()
    );
    this.otherHalf$
      .pipe(take(1))
      .subscribe(data => {
        if(data && data.length > 0) {
          this.otherHalf = data;
          if(this.spID === this.otherHalf[0].uid) {
            this.addInfoSpousePartner(this.otherHalf[0].uid);
            this.updateCurrentUser();
          } else {
            this.addInfoSpousePartner(this.otherHalf[0].uid);
            this.updateCurrentUser();
          }
        } else {
          this.otherHalf = null;
          if(this.spID !== '') {
            this.removeInfoSpousePartner(this.spID);
            this.updateCurrentUser();
          } else {
            this.updateCurrentUser();
          }

        }
      });
  }

  async updateCurrentUser() {
    const firstName = this.userForm.controls['displayName'].value.firstName.trim();
    const lastName = this.userForm.controls['displayName'].value.lastName.trim();
    const streetNumber = this.userForm.controls['address'].value.streetNumber.trim();
    const streetName = this.userForm.controls['address'].value.streetName.trim();
    const subAddress = this.userForm.controls['address'].value.subAddress;
    const city = this.userForm.controls['address'].value.city;
    const state = this.userForm.controls['address'].value.state;
    const zipCode = this.userForm.controls['address'].value.zipCode;
    const { phone, email, birthDate, occupation, residentSince } = this.userForm.value;
    const showBirthDate = this.showBirthDate;
    const spID = this.otherHalf == null ? '' : this.otherHalf[0].uid;
    const spFirstName = this.otherHalf == null ? this.userForm.value.spFirstName : this.otherHalf[0].displayName.firstName;
    const spLastName = this.otherHalf == null ? this.userForm.value.spLastName : this.otherHalf[0].displayName.lastName;
    const spPhotoURL = this.otherHalf == null ? '' : this.otherHalf[0].photoURL;

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
      // photoURL: this.photoURL || 'https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/anon.png?alt=media&token=37218266-cecd-4525-bc51-909f388f773f',
      phone: phone,
      email: email,
      birthDate: birthDate,
      showBirthDate: showBirthDate,
      occupation: occupation,
      residentSince: residentSince,
      spousePartner: {
        spID: spID,
        firstName: spFirstName,
        lastName: spLastName,
        photoURL: spPhotoURL
      }
    };

    await this.userService.updateUser('users/'+ this.uid, data);
    await this.toastService.presentToast('The member profile for '+ firstName + ' ' + lastName +' has been updated!',
      true, 'middle', 'Ok', 3000 );
    await this.userForm.reset();
    await this.closeModalWithData();
  }

  addInfoSpousePartner(otherHalfID) {
    const spData = {
      uid: otherHalfID,
      spousePartner: {
        spID: this.uid,
        firstName: this.firstName,
        lastName: this.lastName,
        photoURL: this.photoURL
      }
    };

    this.userService.updateUser('users/'+ otherHalfID, spData);
    if(this.jrResidents != null) {
      for (let jrRes of this.jrResidents) {
        const jrResData = {
          parents: [this.firstName + ' ' + this.lastName,
            this.otherHalf[0].displayName.firstName + ' ' + this.otherHalf[0].displayName.lastName],
          parentIDs: [this.uid, this.otherHalf[0].uid]
        }
        this.jrResService.updateJrRes('jrResidents/'+ jrRes.id, jrResData);
      }
    }
    if(this.pets != null) {
      for (let pet of this.pets) {
        const petData = {
          petParents: [this.firstName + ' ' + this.lastName,
            this.otherHalf[0].displayName.firstName + ' ' + this.otherHalf[0].displayName.lastName],
          petParentIDs: [this.uid, this.otherHalf[0].uid]
        }
        this.petService.updatePet('pets/'+ pet.id, petData);
      }
    }
    this.toastService.presentToast(
      this.userForm.value.spFirstName + ' ' + this.userForm.value.spLastName +', was updated with any Spouse/Partner, Jr Residents, & Pet informtation, too!',
      true, 'middle', 'Ok', 7000 );
  }

  removeInfoSpousePartner(otherHalfID) {
    const spData = {
      uid: otherHalfID,
      spousePartner: {
        spID: '',
        firstName: '',
        lastName: '',
        photoURL: ''
      }
    };

    this.userService.updateUser('users/'+ otherHalfID, spData);
    if(this.jrResidents != null) {
      for (let jrRes of this.jrResidents) {
        const jrResData = {
          parents: [this.firstName + ' ' + this.lastName],
          parentIDs: [this.uid]
        }
        this.jrResService.updateJrRes('jrResidents/'+ jrRes.id, jrResData);
      }
    }
    if(this.pets != null) {
      for (let pet of this.pets) {
        const petData = {
          petParents: [this.firstName + ' ' + this.lastName],
          petParentIDs: [this.uid]
        }
        this.petService.updatePet('pets/'+ pet.id, petData);
      }
    }
    this.toastService.presentToast(
      'Spouse/Partner info changed for ' +
      this.spFirstName + ' ' + this.spLastName +', too!',
      true, 'middle', 'Ok', 5000
    );
  }

  addHyphens(e) {
    const key = e.charCode || e.keyCode || 0;
       if (key !== 8 && key !== 9) {
           if (e.target.value.length === 3) {
               e.target.value = e.target.value + '-';
           }
           if (e.target.value.length === 7) {
            e.target.value = e.target.value + '-';
           }
       }
       return (key == 8 || key == 9 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
  }


  onResetPassword(email) {
    this.userService.resetUserPassword(email);
    this.modalCtrl.dismiss();
  }

  closeModal() {
    this.modalCtrl.dismiss()
  }


  closeModalWithData() {
    this.modalCtrl.dismiss({
      data: this.lastName
    });
  }

}
