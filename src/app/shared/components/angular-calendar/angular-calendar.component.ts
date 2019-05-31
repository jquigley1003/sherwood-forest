import { Component, Inject, OnInit, LOCALE_ID, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-angular-calendar',
  templateUrl: './angular-calendar.component.html',
  styleUrls: ['./angular-calendar.component.scss'],
})

export class AngularCalendarComponent implements OnInit{

  viewDate: Date = new Date();
  events = [];

  constructor() {}


  ngOnInit() {

  }

}
