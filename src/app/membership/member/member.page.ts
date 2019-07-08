import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { EventService } from '../../shared/services/event.service';

import { UserModalComponent } from '../../shared/modals/user-modal/user-modal.component';
import { EventModalComponent } from '../../shared/modals/event-modal/event-modal.component';

import { slideTitleLeftTrigger, slideTitleRightTrigger } from '../../shared/components/animations/animations';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
  animations: [
    slideTitleRightTrigger,
    slideTitleLeftTrigger
  ]
})
export class MemberPage implements OnInit, OnDestroy {
  user;
  currentUser;
  currentUserSub: Subscription;
  currentYear: Date;
  currentDate: Date = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
  duesPaid: boolean;
  allBoard$: Observable<any>;
  boardSub: Subscription;
  board = [];
  showBoard: boolean = false;
  allEvents$: Observable<any>;
  eventsSub: Subscription;
  events = [];
  upcomingEvents = [];

  eventDocURL: string = 'https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/documents%2FSummerBlockParty.pdf?alt=media&token=dc33e69b-7b00-49c9-b04e-8550e09330a0';

  constructor(private authService: AuthService,
              private userService: UserService,
              private eventService: EventService,
              private router: Router,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.currentUserSub = this.authService.user$.subscribe(data => {
      if(data) {
        this.user = data;
        this.currentUser = this.user.displayName.firstName + ' ' + this.user.displayName.lastName;
        this.duesPaid = this.user.duesPaid;
      } else {
        this.user = null;
        this.currentUser = null;
        this.duesPaid = false;
      }
    });
    this.currentYear = new Date();
    this.allBoard$ = this.userService.fetchBoardMembers();
    this.boardSub = this.allBoard$.subscribe(member => {
      this.board = member;
    });
    this.findNextEvents();
  }

  async findNextEvents() {
    this.allEvents$ = await this.eventService.fetchEvents();
    this.eventsSub = await this.allEvents$.subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        const eDate = new Date(new Date(data[i].startTime).getFullYear(),new Date(data[i].startTime).getMonth() , new Date(data[i].startTime).getDate());
        if(eDate >= this.currentDate) {
          this.upcomingEvents.push(data[i]);
          if(this.upcomingEvents.length >= 4) {
            break;
          }
        }
      }
      this.events = data;
    });
  }

  async presentUserModal(user) {
    const modal = await this.modalCtrl.create({
      component: UserModalComponent,
      componentProps: {
        uid: user.uid,
        photoURL: user.photoURL,
        firstName: user.displayName.firstName,
        lastName: user.displayName.lastName,
        streetNumber: user.address.streetNumber,
        streetName: user.address.streetName,
        subAddress: user.address.subAddress,
        city: user.address.city,
        state: user.address.state,
        zipCode: user.address.zipCode,
        phone: user.phone,
        email: user.email,
        birthDate: user.birthDate,
        showBirthDate: user.showBirthDate,
        occupation: user.occupation,
        residentSince: user.residentSince
      }
    });
    return await modal.present();
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
        eventState: 'view'
      }
    });
    return await modal.present();
  }

  showBoardMembers() {
    this.showBoard = !this.showBoard;
  }

  getDocument(eventDoc) {
    window.open(eventDoc);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  logOut() {
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
    this.boardSub.unsubscribe();
    this.eventsSub.unsubscribe();
  }
}
