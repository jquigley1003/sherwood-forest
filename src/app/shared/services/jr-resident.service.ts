import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

import { Observable } from 'rxjs';

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

  updateJrRes(path, data) {
    this.dbService.updateAt(path, data);
  }

  deleteJrRes(jrResPath) {
    this.toastService.presentToast('Please wait while we delete this Junior Resident.', true, 'middle', 'OK', 3000);
    this.dbService.delete(jrResPath)
      .then(() => {
        this.toastService.presentToast('The Junior Resident has been deleted!',
          true, 'middle', 'Ok', 3000 );
      })
      .catch(err => {
        this.toastService.presentToast(err,
          true, 'middle', 'OK', 3000);
      });
  }

}