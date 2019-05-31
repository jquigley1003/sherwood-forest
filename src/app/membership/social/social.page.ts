import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
})
export class SocialPage implements OnInit {

  currentDate: Date;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.currentDate = new Date();
  }

  goHome() {
    this.router.navigate(['/']);
  }

  downloadSBP() {
    window.open('https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/documents%2FSummerBlockParty.pdf?alt=media&token=dc33e69b-7b00-49c9-b04e-8550e09330a0');
  }

  logOut() {
    this.authService.signOut();
  }
}
