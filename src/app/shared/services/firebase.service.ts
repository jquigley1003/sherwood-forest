import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { DbService } from './db.service';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';
import { takeUntil } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  userRef;

  constructor(private afs: AngularFirestore) {}

  deleteFields(path) {
    // this.userRef = this.afs.doc(path);
    // this.userRef.update({
    //   duesPaid: firebase.firestore.FieldValue.delete()
    // })
  }

}