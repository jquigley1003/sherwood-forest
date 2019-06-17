import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  showEventForm: boolean = false;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  toggleEventForm() {
    this.showEventForm = !this.showEventForm;
  }

  goHome() {
    this.router.navigate(['/']);
  }

  logOut() {
    this.authService.signOut();
  }

}
