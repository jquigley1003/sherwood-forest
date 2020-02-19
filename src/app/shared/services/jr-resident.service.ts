import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';


import { DbService } from './db.service';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class JrResidentService {

  constructor(private authService: AuthService,
              private dbService: DbService,
              private afFunctions: AngularFireFunctions,
              private toastService: ToastService) { }


  fetchAllJrResidents() {
    return this.dbService.collection$('jrResidents', ref => ref.orderBy('displayName.lastName'));
  }

  fetchJrResidents(parentID) {
    return this.dbService.collection$('jrResidents', ref => ref
      .where('parentIDs', 'array-contains', parentID));
  }

  updateJrRes(path, data) {
    this.dbService.updateAt(path, data);
  }

  deleteJrRes(jrResPath) {
    this.toastService.presentToast(
      'Please wait while we delete this Junior Resident.',
      'middle',
      [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('dismiss toast message');
        }
      }], 3000);
    this.dbService.delete(jrResPath)
      .then(() => {
        this.toastService.presentToast(
          'The Junior Resident has been deleted!',
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000 );
      })
      .catch(err => {
        this.toastService.presentToast(
          err,
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000);
      });
  }

}
