import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-islands',
  templateUrl: './islands.page.html',
  styleUrls: ['./islands.page.scss'],
})
export class IslandsPage implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  goToSocial() {
    this.router.navigate(['/social']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  logOut() {
    this.authService.signOut();
  }
}
