import { Component, Inject, OnInit, OnDestroy, LOCALE_ID, ViewChild, Input, OnChanges } from '@angular/core';
import { formatDate } from '@angular/common';

import { AlertController, ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar/calendar';

import { Observable, Subscription } from 'rxjs';

import { EventService } from '../../services/event.service';
import { EventModalComponent } from '../../modals/event-modal/event-modal.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class MyCalendarComponent implements OnInit, OnDestroy {
  @ViewChild(CalendarComponent) myCal:CalendarComponent;
  @Input() currentEvents: any[];

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  minDate = new Date().toISOString();

  allEvents: Observable<any>;
  changeEvents = [];
  eventSource = [];
  eventSubscription: Subscription;
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  constructor(private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private eventService: EventService,
              @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    // this.resetEvent();
    // this.getAllEvents();
  }

  ngOnChanges() {
    if (this.currentEvents) {
      this.getAllEvents();
    }
  }

  async getAllEvents() {
    // this.allEvents = await this.eventService.fetchEvents();
    // this.eventSubscription = await this.allEvents.subscribe(data => {
    //   data.forEach(event => {
    //     event.startTime = new Date(event.startTime);
    //     //     event.endTime = new Date(event.endTime);
    //     //     this.eventSource.push(event);
    //   });
    //
    // });

   this.currentEvents.forEach(event => {
      event.startTime = new Date(event.startTime);
      event.endTime = new Date(event.endTime);
      this.eventSource.push(event);
    });

    this.myCal.loadEvents();
    console.log('Calendar @Input currentEvents: ',this.currentEvents);
  }

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  // Change current month/week/day
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

// Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

// Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

// Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

// Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    // let start = formatDate(event.startTime, 'medium', this.locale);
    // let end = formatDate(event.endTime, 'medium', this.locale);

    // const alert = await this.alertCtrl.create({
    //   header: event.title,
    //   subHeader: event.details,
    //   message: 'From: ' + start + '<br><br>To: ' + end,
    //   buttons: ['OK']
    // });
    // alert.present();

    const modal = await this.modalCtrl.create({
      component: EventModalComponent,
      componentProps: {
        eid: event.id,
        photoURL: event.photoURL,
        documentURL: event.documentURL,
        title: event.title,
        subTitle: event.subTitle,
        startTime: event.startTime,
        endTime: event.endTime,
        details: event.details
      }
    });
    return await modal.present();
  }

// Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }
}
