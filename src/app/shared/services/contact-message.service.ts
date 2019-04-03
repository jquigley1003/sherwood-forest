import { Injectable } from '@angular/core';

import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ContactMessageService {

  constructor(private dbService: DbService) { }

  createContactMessage(path: string, data) {
    this.dbService.updateAt(path, data);
  }
}
