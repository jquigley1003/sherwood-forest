import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { JuniorResident } from '../../../models/junior-resident.model';
import { JrResidentService } from '../../services/jr-resident.service';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-jr-resident-modal',
  templateUrl: './jr-resident-modal.component.html',
  styleUrls: ['./jr-resident-modal.component.scss'],
})
export class JrResidentModalComponent implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  currentJrResID: string = '';
  jrResidents: any = this.navParams.get('jrResidents');
  parentOneID: any = this.navParams.get('parentOneID');
  parentTwoID: any = this.navParams.get('parentTwoID');

  jrResForm: FormGroup;
  showJrRes: boolean = false;

  constructor(private modalCtrl: ModalController,
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private jrResService: JrResidentService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.jrResForm = this.formBuilder.group({
      displayName: this.formBuilder.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required]
      }),
      age: [],
      parents: []
    });
  }

  onChooseJr(jrRes) {
    this.showJrRes = true;
    this.currentJrResID = jrRes.id;
    this.jrResForm = this.formBuilder.group({
      displayName: this.formBuilder.group({
        firstName: [jrRes.displayName.firstName,Validators.required],
        lastName: [jrRes.displayName.lastName,Validators.required]
      }),
      age: [jrRes.age],
      parents: [jrRes.parents]
    });
  }

  async onUpdateJr() {
    const firstName = this.jrResForm.controls['displayName'].value.firstName;
    const lastName = this.jrResForm.controls['displayName'].value.lastName;
    const age = this.jrResForm.value;
    const parents = [this.parentOneID, this.parentTwoID];

    const data: JuniorResident = {
      displayName: {
        firstName: firstName,
        lastName: lastName
      },
      age: age,
      parents: parents
    };
    await this.jrResService.updateJrRes('jrResidents/'+ this.currentJrResID, data);
    await this.toastService.presentToast('The Junior Resident profile for '+ firstName +' has been updated!',
      true, 'top', 'Ok', 3000 );
    await this.jrResForm.reset();
    await this.modalCtrl.dismiss();
  }


  scrollToBottom(){
    this.content.scrollToBottom(300);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
