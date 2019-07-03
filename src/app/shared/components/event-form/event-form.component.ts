import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(UploaderFileComponent) uploaderFileComponent: UploaderFileComponent;

  eventForm: FormGroup;
  photoURL: string;
  folderName: string;
  editEventPic: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private eventService: EventService,
              private toastService: ToastService,
              private router: Router) {}

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      details: ['', Validators.required],
    });

    this.photoURL = '/assets/GreenLeaf.jpg';
    this.folderName = 'events';
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

  async onCreateEvent() {
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
    await this.eventService.createEvent('events/', data);
    await this.toastService.presentToast('The SFCA event has been created',
      true, 'top', 'Ok', 3000 );
    await this.eventForm.reset();
  }

  async onuUpdateEvent() {
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
    await this.eventService.createEvent('events/', data);
    await this.toastService.presentToast('The SFCA event has been created',
      true, 'top', 'Ok', 3000 );
    await this.eventForm.reset();
  }

}
