import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';


import { DbService } from './db.service';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  constructor(
    private authService: AuthService,
    private dbService: DbService,
    private afFunctions: AngularFireFunctions,
    private toastService: ToastService
  ) { }


  fetchAllReports() {
    return this.dbService.collection$('reports', ref => ref.orderBy('createdAt'));
  }

  fetchRecentReport() {
    return this.dbService.collection$('reports', ref => ref.orderBy('createdAt', 'desc').limit(1));
  }

  updateReport(path, data) {
    this.dbService.updateAt(path, data);
  }
}
