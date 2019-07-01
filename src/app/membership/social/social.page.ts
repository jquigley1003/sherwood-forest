import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { AuthService } from '../../shared/services/auth.service';
import { EventService } from '../../shared/services/event.service';
import { Observable, Subscription } from 'rxjs';
import { EventModalComponent } from '../../shared/modals/event-modal/event-modal.component';

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
})
export class SocialPage implements OnInit, OnDestroy {

  currentDate: Date = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
  allEvents$: Observable<any>;
  eventsSub: Subscription;
  events = [];
  upcomingEvent = {
    photoURL: '/assets/ForestTannion2019.jpg',
    startTime: this.currentDate,
    endTime: this.currentDate,
    title: 'SFCA Events',
    subTitle: 'Next Event Coming Soon'
  };


  constructor(private authService: AuthService,
              private eventService: EventService,
              private modalCtrl: ModalController,
              private router: Router) { }

  ngOnInit() {
    this.findNextEvent();
  }

  async findNextEvent() {
    this.allEvents$ = await this.eventService.fetchEvents();
    this.eventsSub = await this.allEvents$.subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        const eDate = new Date(new Date(data[i].startTime).getFullYear(),new Date(data[i].startTime).getMonth() , new Date(data[i].startTime).getDate());
        if(eDate >= this.currentDate) {
          this.upcomingEvent = data[i];
          break;
        }
      }
      this.events = data;
    });
  }

  goHome() {
    this.router.navigate(['/']);
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
        details: event.details
      }
    });
    return await modal.present();
  }

  logOut() {
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }
}
