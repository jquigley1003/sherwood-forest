import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { EventService } from '../../shared/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit, OnDestroy {
  showEventForm: boolean = false;
  allEvents;
  events: any[];
  eventSubscription;


  constructor(private router: Router,
              private authService: AuthService,
              private eventService: EventService) { }

  ngOnInit() {
    this.getAllEvents();
  }

  async getAllEvents() {
    this.allEvents = await this.eventService.fetchEvents();
    this.eventSubscription = await this.allEvents.subscribe(data => {
      this.events = data;
    });
  }

  toggleEventForm() {
    this.showEventForm = !this.showEventForm;
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
