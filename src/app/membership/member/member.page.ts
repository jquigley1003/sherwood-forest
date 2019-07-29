import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { EventService } from '../../shared/services/event.service';

import { UserModalComponent } from '../../shared/modals/user-modal/user-modal.component';
import { EventModalComponent } from '../../shared/modals/event-modal/event-modal.component';

import { slideTitleLeftTrigger, slideTitleRightTrigger } from '../../shared/components/animations/animations';
import { JrResidentModalComponent } from '../../shared/modals/jr-resident-modal/jr-resident-modal.component';

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
  spousePartner$: Observable<any>;
  spousePartnerSub: Subscription;
  spousePartner = null;
  spousePartnerName: string = null;
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
  getJrResidents$: Observable<any>;
  jrResSub: Subscription;
  loadJrRes;
  jrResidents = [];

  eventDocURL: string = 'https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/documents%2FSummerBlockParty.pdf?alt=media&token=dc33e69b-7b00-49c9-b04e-8550e09330a0';

  constructor(private authService: AuthService,
              private userService: UserService,
              private eventService: EventService,
              private router: Router,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getCurrentUser();
    this.currentYear = new Date();

    this.allBoard$ = this.userService.fetchBoardMembers();
    this.boardSub = this.allBoard$.subscribe(member => {
      this.board = member;
    });

    this.getInfoForMember();
  }


  async getCurrentUser() {
    this.currentUserSub = await this.authService.user$.subscribe(data => {
      if(data) {
        this.user = data;
        this.currentUser = this.user.displayName.firstName + ' ' + this.user.displayName.lastName;
        this.duesPaid = this.user.duesPaid;
        this.getJrResidents(this.user.uid);
        if (this.user.spousePartner.spID != '') {
          this.getSpousePartner(this.user.spousePartner.spID);
        } else {
          this.spousePartner = null;
          console.log('this user does not have a spouse/partner ',this.spousePartner);
        }
      } else {
        this.user = null;
        this.currentUser = null;
        this.duesPaid = false;
      }
    });
  }

  async getSpousePartner(spID) {
    this.spousePartner$ = await this.userService.fetchSpousePartner(spID);
    this.spousePartner$
      .pipe(take(1))
      .subscribe(data => {
      if(data && data.length > 0) {
        this.spousePartner = data;
        console.log('this users spouse/partner is: ', this.spousePartner);
      } else {
        this.spousePartner = null;
        console.log('this user does not have any information about spouse/partner');
      }
    });
  }

  async getInfoForMember() {
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

  async getJrResidents(parentID) {
    this.getJrResidents$ = await this.userService.fetchJrResidents(parentID);
    this.jrResSub = await this.getJrResidents$.subscribe(jrRes => {
      this.jrResidents = jrRes;
      console.log("This user's jr residents = ", this.jrResidents);
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
        showBirthDate: (user.showBirthDate != null) ? user.showBirthDate : false,
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

  async presentJrResidentModal() {
    const modal = await this.modalCtrl.create({
      component: JrResidentModalComponent,
      componentProps: {
        jrResidents: this.jrResidents
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
    this.jrResSub.unsubscribe();
  }
}
