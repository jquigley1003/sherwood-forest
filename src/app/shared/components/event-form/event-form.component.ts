import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastService } from '../../services/toast.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../../models/event.model';
import { UploaderFileComponent } from '../uploader-file/uploader-file.component';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit, AfterViewInit {
  @ViewChild(UploaderFileComponent, {static: false}) uploaderFileComponent: UploaderFileComponent;
  @Input('eventInfo') eventInfo: any;
  @Output() eventSubmitted = new EventEmitter();

  eventForm: FormGroup;
  photoURL: string;
  folderName: string;
  editEventPic: boolean = false;

  eid: string;
  eventPhoto: string;
  documentURL: string;
  title: string;
  subTitle: string;
  startTime: string;
  endTime: string;
  details: string;
  eventState: string;

  constructor(private formBuilder: FormBuilder,
              private eventService: EventService,
              private toastService: ToastService,
              private router: Router) {}

  ngOnInit() {
    this.eid = (this.eventInfo === '') ? '' : this.eventInfo.eid;
    this.eventPhoto = (this.eventInfo === '') ? '' :  this.eventInfo.photoURL;
    this.documentURL = (this.eventInfo === '') ? '' :  this.eventInfo.documentURL;
    this.title = (this.eventInfo === '') ? '' :  this.eventInfo.title;
    this.subTitle = (this.eventInfo === '') ? '' :  this.eventInfo.subTitle;
    this.startTime = (this.eventInfo === '') ? new Date().toISOString() :  this.eventInfo.startTime;
    this.endTime = (this.eventInfo === '') ? new Date().toISOString() :  this.eventInfo.endTime;
    this.details =  (this.eventInfo === '') ? '' :  this.eventInfo.details;
    this.eventState = (this.eventInfo === '') ? '' :  this.eventInfo.eventState;

    this.eventForm = this.formBuilder.group({
      title: [this.title || '', Validators.required],
      subTitle: [this.subTitle || '', Validators.required],
      startTime: [this.startTime || '', Validators.required],
      endTime: [this.endTime || '', Validators.required],
      details: [this.details || '', Validators.required],
    });

    this.photoURL = this.eventPhoto || '/assets/GreenLeaf.jpg';
    this.folderName = 'events';

    console.log('this is the event info for the form: ',this.eventInfo);
  }

  ngAfterViewInit() {
    console.log('UploaderFileComponent: ',this.uploaderFileComponent);
  }

  toggleUploader() {
    this.editEventPic = !this.editEventPic;
  }

  confirmNewPhoto() {
    this.photoURL = this.uploaderFileComponent.updatePhotoURL();
    console.log('The confirmed photo is: ', this.photoURL);
    this.toggleUploader();
  }

  async onSubmitEvent() {
    const { title, subTitle, startTime, endTime, details } = this.eventForm.value;
    const photoURL = this.photoURL;

    const data: Event = {
      title: title,
      subTitle: subTitle,
      startTime: startTime,
      endTime: endTime,
      details: details,
      photoURL: photoURL
    };
    if (this.eid === '') {
      await this.eventService.addUpdateEvent('events/', data);
      await this.toastService.presentToast(
        'The SFCA event has been created',
        'top',
        [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('dismiss toast message');
          }
        }], 3000 );
      await this.eventForm.reset();
    } else {
      await this.eventService.addUpdateEvent('events/' + this.eid, data);
      await this.toastService.presentToast('The SFCA event has been updated',
        'top',
        [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('dismiss toast message');
          }
        }], 3000 );
      await this.eventForm.reset();
    }
    this.eventSubmitted.emit();
  }
}
