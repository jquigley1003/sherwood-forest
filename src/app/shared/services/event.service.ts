import { Injectable } from '@angular/core';

import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private dbService: DbService) { }

  addUpdateEvent (path, data) {
    this.dbService.updateAt(path, data);
  }

  fetchEvents() {
    return this.dbService.collection$('events', ref => ref.orderBy('startTime'));
  }

  deleteEvent(eventPath) {
    this.dbService.delete(eventPath);
  }

}
