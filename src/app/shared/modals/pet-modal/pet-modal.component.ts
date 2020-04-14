import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Pet } from '../../../models/pet.model';

import { PetService } from '../../services/pet.service';
import { ToastService } from '../../services/toast.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-pet-modal',
  templateUrl: './pet-modal.component.html',
  styleUrls: ['./pet-modal.component.scss'],
})
export class PetModalComponent implements OnInit {
  currentPetID: string = '';
  currentPetName: string = '';
  pets: any = this.navParams.get('pets');
  address: any = this.navParams.get('address');
  petParentOneName: any = this.navParams.get('petParentOneName');
  petParentTwoName: any = this.navParams.get('petParentTwoName');
  petParentOneID: any = this.navParams.get('petParentOneID');
  petParentTwoID: any = this.navParams.get('petParentTwoID');

  petForm: FormGroup;
  showPet: boolean = false;
  addPet: boolean = false;

  constructor(private modalCtrl: ModalController,
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private petService: PetService,
              private toastService: ToastService,
              private alertService: AlertService) { }

  ngOnInit() {}

  async onChoosePet(pet) {
    if(this.petForm) {
      await this.petForm.reset();
    }
    this.showPet = true;
    this.addPet = false;
    this.currentPetID = pet.id;
    this.currentPetName = pet.petName;
    this.petForm = this.formBuilder.group({
      petName: [pet.petName],
      animal: [pet.animal],
      breed: [pet.breed],
      color: [pet.color],
      age: [pet.age],
      parents: [pet.petParents]
    });
  }

  async onAddPet() {
    if(this.petForm) {
      await this.petForm.reset();
    }
    this.currentPetID = '';
    this.addPet = true;
    this.showPet = false;
    this.petForm = this.formBuilder.group({
      petName: [],
      animal: [],
      breed: [],
      color: [],
      age: [],
      parents: []
    });
  }

  async onUpdatePet() {
    const petName = this.petForm.value.petName.trim();
    const streetNumber = this.address.streetNumber;
    const streetName = this.address.streetName;
    const subAddress = this.address.subAddress;
    const city = this.address.city;
    const state = this.address.state;
    const zipCode = this.address.zipCode;
    const animal = this.petForm.value.animal;
    const breed = this.petForm.value.breed;
    const color = this.petForm.value.color;
    const age = this.petForm.value.age;
    const petParents = [this.petParentOneName, this.petParentTwoName];
    const petParentIDs = [this.petParentOneID, this.petParentTwoID];

    const data: Pet = {
      petName: petName,
      address: {
        streetNumber: streetNumber,
        streetName: streetName,
        subAddress: subAddress,
        city: city,
        state: state,
        zipCode: zipCode
      },
      animal: animal,
      breed: breed,
      color: color,
      age: age,
      petParents: petParents,
      petParentIDs: petParentIDs
    };
    if(this.currentPetID == '') {
      await this.petService.updatePet('pets/', data);
      await this.toastService.presentToast(
        petName +' has been added as family pet',
        'top',
        [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('dismiss toast message');
          }
        }], 3000 );
      await this.petForm.reset();
      await this.modalCtrl.dismiss();
    } else {
      await this.petService.updatePet('pets/'+ this.currentPetID, data);
      await this.toastService.presentToast(
        'The Family Pet profile for '+ petName +' has been updated!',
        'top',
        [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('dismiss toast message');
          }
        }], 3000 );
      await this.petForm.reset();
      await this.modalCtrl.dismiss();
    }
  }

  deletePet(petName, petID) {
    this.alertService.presentAlert(
      'Are You Sure?',
      'You will permanently delete ' + petName,
      'This action can not be undone',
      [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('You did not delete '+petName);
          }
        },
        {
          text: 'Yes, Delete',
          handler: () => {
            this.deletePetConfirmed(petID);
          }
        }
      ]
    );
  }

  deletePetConfirmed(petID) {
    this.petService.deletePet(`pets/${petID}`);
    this.modalCtrl.dismiss();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
