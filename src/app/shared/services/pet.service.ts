import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';


import { DbService } from './db.service';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private authService: AuthService,
              private dbService: DbService,
              private afFunctions: AngularFireFunctions,
              private toastService: ToastService) { }

  fetchPets(petParentID) {
    return this.dbService.collection$('pets', ref => ref
      .where('petParentIDs', 'array-contains', petParentID));
  }

  updatePet(path, data) {
    this.dbService.updateAt(path, data);
  }

  deletePet(petPath) {
    this.toastService.presentToast('Please wait while we remove this Pet.', true, 'middle', 'OK', 3000);
    this.dbService.delete(petPath)
      .then(() => {
        this.toastService.presentToast('The Pet has been removed!',
          true, 'middle', 'Ok', 3000 );
      })
      .catch(err => {
        this.toastService.presentToast(err,
          true, 'middle', 'OK', 3000);
      });
  }
}
