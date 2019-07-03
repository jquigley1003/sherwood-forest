import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController, NavParams } from '@ionic/angular';

import { ToastService } from '../../services/toast.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
})
export class EventModalComponent implements OnInit {
  eventForm: FormGroup;
  eid: string = this.navParams.get('eid');
  photoURL: string = this.navParams.get('photoURL');
  documentURL: string = this.navParams.get('documentURL');
  title: string = this.navParams.get('title');
  subTitle: string = this.navParams.get('subTitle');
  startTime: string = this.navParams.get('startTime');
  endTime: string = this.navParams.get('endTime');
  details: string = this.navParams.get('details');
  eventState: string = this.navParams.get('eventState');

  constructor(private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private navParams: NavParams,
              private eventService: EventService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      photoURL: [this.photoURL],
      documentURL: [this.documentURL],
      title: [this.title],
      subTitle: [this.subTitle],
      startTime: [this.startTime],
      endTime: [this.endTime],
      details: [this.details],
      eventState: [this.eventState]
    });
  }

  getEventDoc(eventDoc) {

  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
