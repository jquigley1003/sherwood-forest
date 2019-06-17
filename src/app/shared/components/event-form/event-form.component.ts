import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastService } from '../../services/toast.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {

  eventForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private eventService: EventService,
              private toastService: ToastService,
              private router: Router) {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      details: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmitForm() {

  }

}
