import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { JrResidentService } from '../../shared/services/jr-resident.service';
import { PetService } from '../../shared/services/pet.service';
import { DirectoryModalComponent } from '../../shared/modals/directory-modal/directory-modal.component';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit, OnDestroy {
  allUsers$: Observable<any>;
  users: any[];
  loadedUsers: any[];
  allJrRes$: Observable<any>;
  jrResidents: any[];
  userJrRes = [];
  allPets$: Observable<any>;
  pets: any[];
  userPets = [];
  filterBy: string = "lastName";
  statusFirst: string = "primary";
  statusLast: string = "secondary";
  statusAddress: string = "primary";
  residentSince: string;
  ngUnsubscribe = new Subject<void>();

  constructor(private authService: AuthService,
              private userService: UserService,
              private jrResService: JrResidentService,
              private petService: PetService,
              private router: Router,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getAllUsers();
    this.getAllJrRes();
    this.getAllPets();
  }

  async getAllUsers() {
    this.allUsers$ = await this.userService.fetchUsers();
    this.allUsers$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.users = data;
        this.loadedUsers = this.users;
      });
  }

  async getAllJrRes() {
    this.allJrRes$ = await this.jrResService.fetchAllJrResidents();
    this.allJrRes$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
      this.jrResidents = data;
    });
  }

  async getUserJrRes(userID) {
    this.userJrRes = [];
    for (let jrRes of this.jrResidents) {
      if(jrRes.parentIDs.includes(userID)) {
        this.userJrRes.push(jrRes);
      }
    }
  }

  async getAllPets() {
    this.allPets$ = await this.petService.fetchAllPets();
    this.allPets$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.pets = data;
      });
  }

  async getUserPets(userID) {
    this.userPets = [];
    for (let pet of this.pets) {
      if(pet.petParentIDs.includes(userID)) {
        this.userPets.push(pet);
      }
    }
  }

  initializeList():void {
    this.users = this.loadedUsers;
  }

  queryFirstName() {
    this.filterBy = 'firstName';
    this.statusFirst = "secondary";
    this.statusLast = "primary";
    this.statusAddress = "primary";
  }

  queryLastName() {
    this.filterBy = 'lastName';
    this.statusFirst = "primary";
    this.statusLast = "secondary";
    this.statusAddress = "primary";
  }

  queryAddress() {
    this.filterBy = 'address';
    this.statusFirst = "primary";
    this.statusLast = "primary";
    this.statusAddress = "secondary";
  }

  filterByFirstName(event) {
    this.initializeList();
    const searchTerm = event.srcElement.value;

    if(!searchTerm) {
      return;
    }
    this.users = this.users.filter(member => {
      if(member.displayName.firstName && searchTerm) {
        if (member.displayName.firstName.toLowerCase()
          .indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  filterByLastName(event) {
    this.initializeList();
    const searchTerm = event.srcElement.value;

    if(!searchTerm) {
      return;
    }
    this.users = this.users.filter(member => {
      if (member.displayName.lastName && searchTerm) {
        if(member.displayName.lastName.toLowerCase()
          .indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  filterByAddress(event) {
    this.initializeList();
    const searchTerm = event.srcElement.value;

    if(!searchTerm) {
      return;
    }
    this.users = this.users.filter(member => {
      if((member.address.streetNumber + ' ' + member.address.streetName) && searchTerm) {
        if((member.address.streetNumber + ' ' + member.address.streetName).toLowerCase()
          .indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  async presentDirectoryModal(user) {
    await this.getUserJrRes(user.uid);
    await this.getUserPets(user.uid);

    const modal = await this.modalCtrl.create({
      component: DirectoryModalComponent,
      componentProps: {
        photoURL: user.photoURL,
        name: user.displayName.firstName + ' ' + user.displayName.lastName,
        phone: user.phone,
        email: user.email,
        address: user.address.streetNumber + ' ' + user.address.streetName,
        cityStateZip: user.address.city + ' ' + user.address.state + ' ' + user.address.zipCode,
        residentSince: user.residentSince,
        showBirthDate: user.showBirthDate,
        birthDate: user.birthDate,
        spousePartnerName: user.spousePartner.firstName + ' ' + user.spousePartner.lastName,
        jrResidents: this.userJrRes,
        pets: this.userPets
      }
    });
    return await modal.present();
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
