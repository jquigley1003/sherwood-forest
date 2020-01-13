import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { AuthService } from '../../shared/services/auth.service';
import { EventService } from '../../shared/services/event.service';
import { AlertService } from '../../shared/services/alert.service';
import { EventModalComponent } from '../../shared/modals/event-modal/event-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit, OnDestroy {
  showEventForm: boolean = false;
  allEvents;
  events: any[];
  eventSubscription: Subscription;


  constructor(private router: Router,
              private authService: AuthService,
              private eventService: EventService,
              private alertService: AlertService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getAllEvents();
  }

  async getAllEvents() {
    this.allEvents = await this.eventService.fetchEvents();
    this.eventSubscription = await this.allEvents.subscribe(data => {
      this.events = data;
    });
  }

  async presentEventModal(event) {
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
        details: event.details,
        eventState: 'edit'
      }
    });
    return await modal.present();
  }

  toggleEventForm() {
    this.showEventForm = !this.showEventForm;
  }

  closeEventForm() {
    this.showEventForm = false;
  }

  deleteEvent(eventTitle, eid) {
    this.alertService.presentAlert(
      'Are You Sure?',
      'You will permanently delete ' + eventTitle,
      'This action can not be undone',
      [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('You did not delete '+ eventTitle);
          }
        },
        {
          text: 'Yes, Delete',
          handler: () => {
            this.deleteEventConfirmed(eid);
          }
        }
      ]
    );
  }

  deleteEventConfirmed(eid) {
    this.eventService.deleteEvent(`events/${eid}`);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  logOut() {
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }
}
