import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sfca-business',
  templateUrl: './sfca-business.page.html',
  styleUrls: ['./sfca-business.page.scss'],
})
export class SfcaBusinessPage implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/']);
  }

  logOut() {
    this.authService.signOut();
  }

  getMinutes() {
    window.open('https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/documents%2FSpring%20Minutes%20042389%20revised%202.pdf?alt=media&token=122a467f-ee11-4bc4-81ed-b590926ec528');
  }

  getMinutesFall19() {
    window.open('https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/documents%2FSFCAMinutes102219.pdf?alt=media&token=94e489a1-06c6-4506-ba0e-0eb5037d1b29');
  }

  getMinutesFall22() {
    window.open('https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/minutes%2F11152022%20SFCA%20Fall%20Meeting%20Minutes.doc.pdf?alt=media&token=43c3d0fc-1918-44bb-9c02-b2adbd31e901');
  }

  getMinutesSpring23() {
    window.open('https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/minutes%2F2023%2FSFCA-SpringMeeting-20230411.pdf?alt=media&token=f09bd899-91aa-4cfc-9c34-adde54023a31');
  }

  getMinutesFall23() {
    window.open('https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/minutes%2F2023%2FSFCA-FallMeeting-202310.pdf?alt=media&token=2e9934fd-dd33-41f8-a6c4-955d3e758bf0');
  }

  getMinutesSpring24() {
    window.open('https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/minutes%2F2024%2FSFCA-Spring%20Meeting-20240409.pdf?alt=media&token=7112560a-516d-4a71-9de7-81470f41e999');
  }

  getMinutesFall24() {
    window.open('https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/minutes%2F2024%2FSFCA-Fall%20Meeting%20Minutes-20241001.pdf?alt=media&token=e62cb320-1245-4cba-a07c-ca9d018ca9c3');
  }

  getMinutesSpring25() {
    window.open('https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/minutes%2F2025%2FSFCA_Spring%20Meeting_Minutes_2025.04.pdf?alt=media&token=0b0b7b21-c76d-4a9d-a45a-2af6092086da');
  }

  getBusinessDocs() {
    window.open('https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/documents%2FSFCA%20BYLAWS%20%2003252020.pdf?alt=media&token=eacd4082-2336-4a03-8836-6f3e6e787e47');
  }

}
