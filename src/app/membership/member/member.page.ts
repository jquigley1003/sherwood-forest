import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Observable, Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

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
  currentMember$: Observable<any>;
  user;
  currentUser;
  spousePartner$: Observable<any>;
  spousePartner = null;
  currentYear: Date;
  currentDate: Date = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
  duesPaid: boolean;
  allBoard$: Observable<any>;
  board = [];
  showBoard: boolean = false;
  allEvents$: Observable<any>;
  events = [];
  upcomingEvents = [];
  memJrResidents$: Observable<any>;
  jrResidents = [];
  ngUnsubscribe = new Subject<void>();

  constructor(private authService: AuthService,
              private userService: UserService,
              private eventService: EventService,
              private router: Router,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.currentYear = new Date();
    this.getCurrentUser();
    this.getEventsForMember();
    this.getBoardMembers();
  }


  async getCurrentUser() {
    this.currentMember$ = await this.authService.user$;
    this.currentMember$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
      if(data) {
        this.user = data;
        this.currentUser = this.user.displayName.firstName + ' ' + this.user.displayName.lastName;
        this.duesPaid = this.user.duesPaid;
        this.getJrResidents(this.user.uid);
        if (this.user.spousePartner.spID !== '') {
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

  async getJrResidents(parentID) {
    this.memJrResidents$ = await this.userService.fetchJrResidents(parentID);
    this.memJrResidents$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if(data && data.length > 0) {
          this.jrResidents = data;
          console.log("This user's jr residents = ", this.jrResidents);
        } else {
          this.jrResidents = [];
          console.log('this user does not have any junior residents');
        }
      });
  }

  async getEventsForMember() {
    this.allEvents$ = await this.eventService.fetchEvents();
    this.allEvents$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
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

  async getBoardMembers() {
    this.allBoard$ = await this.userService.fetchBoardMembers();
    this.allBoard$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(sfBoard => {
      this.board = sfBoard;
      console.log('board members are: ',this.board);
    });
  };

  async presentUserModal(user, spousePartner) {
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
        residentSince: user.residentSince,
        spID: user.spousePartner.spID,
        spFirstName: user.spousePartner.firstName,
        spLastName: user.spousePartner.lastName,
        spPhotoURL: user.spousePartner.photoURL
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

  goHome() {
    this.router.navigate(['/']);
  }

  logOut() {
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
