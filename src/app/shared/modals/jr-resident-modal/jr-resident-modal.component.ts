import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { JuniorResident } from '../../../models/junior-resident.model';
import { JrResidentService } from '../../services/jr-resident.service';
import { ToastService } from '../../services/toast.service';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-jr-resident-modal',
  templateUrl: './jr-resident-modal.component.html',
  styleUrls: ['./jr-resident-modal.component.scss'],
})
export class JrResidentModalComponent implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  currentJrResID: string = '';
  currentJrResName: string = '';
  jrResidents: any = this.navParams.get('jrResidents');
  address: any = this.navParams.get('address');
  parentOneName: any = this.navParams.get('parentOneName');
  parentTwoName: any = this.navParams.get('parentTwoName');
  parentOneID: any = this.navParams.get('parentOneID');
  parentTwoID: any = this.navParams.get('parentTwoID');

  jrResForm: FormGroup;
  showJrRes: boolean = false;
  addJrRes: boolean = false;

  constructor(private modalCtrl: ModalController,
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private jrResService: JrResidentService,
              private toastService: ToastService,
              private alertService: AlertService) { }

  ngOnInit() {

  }

  async onChooseJr(jrRes) {
    if(this.jrResForm) {
      await this.jrResForm.reset();
    }
    this.showJrRes = true;
    this.addJrRes = false;
    this.currentJrResID = jrRes.id;
    console.log('currentJrResID =' , this.currentJrResID);
    this.currentJrResName = jrRes.displayName.firstName;
    this.jrResForm = this.formBuilder.group({
      displayName: this.formBuilder.group({
        firstName: [jrRes.displayName.firstName,Validators.required],
        lastName: [jrRes.displayName.lastName,Validators.required]
      }),
      age: [jrRes.age],
      parents: [jrRes.parents]
    });
  }

  async onAddJr() {
    if(this.jrResForm) {
      await this.jrResForm.reset();
    }
    this.currentJrResID = '';
    console.log('currentJrResID =' , this.currentJrResID);
    this.addJrRes = true;
    this.showJrRes = false;
    this.jrResForm = this.formBuilder.group({
      displayName: this.formBuilder.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required]
      }),
      age: [],
      parents: []
    });
  }

  async onUpdateJr() {
    const firstName = this.jrResForm.controls['displayName'].value.firstName.trim();
    const lastName = this.jrResForm.controls['displayName'].value.lastName.trim();
    const streetNumber = this.address.streetNumber;
    const streetName = this.address.streetName;
    const subAddress = this.address.subAddress;
    const city = this.address.city;
    const state = this.address.state;
    const zipCode = this.address.zipCode;
    const age = this.jrResForm.value.age;
    const parents = [this.parentOneName, this.parentTwoName];
    const parentIDs = [this.parentOneID, this.parentTwoID];

    const data: JuniorResident = {
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
      age: age,
      parents: parents,
      parentIDs: parentIDs
    };
    if(this.currentJrResID == '') {
      await this.jrResService.updateJrRes('jrResidents/', data);
      await this.toastService.presentToast(firstName +' has been added as Junior Resident',
        true, 'top', 'Ok', 3000 );
      await this.jrResForm.reset();
      await this.modalCtrl.dismiss();
    } else {
      await this.jrResService.updateJrRes('jrResidents/'+ this.currentJrResID, data);
      await this.toastService.presentToast('The Junior Resident profile for '+ firstName +' has been updated!',
        true, 'top', 'Ok', 3000 );
      await this.jrResForm.reset();
      await this.modalCtrl.dismiss();
    }
  }
  deleteJrRes(firstName, jrResID) {
    this.alertService.presentAlert(
      'Are You Sure?',
      'You will permanently delete ' + firstName,
      'This action can not be undone',
      [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('You did not delete '+firstName);
          }
        },
        {
          text: 'Yes, Delete',
          handler: () => {
            this.deleteJrResConfirmed(jrResID);
          }
        }
      ]
    );
  }

  deleteJrResConfirmed(jrID) {
    this.jrResService.deleteJrRes(`jrResidents/${jrID}`);
    this.modalCtrl.dismiss();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
