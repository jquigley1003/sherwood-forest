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

  getBusinessDocs() {
    window.open('https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/documents%2FSFCA%20BYLAWS%20%2003252020.pdf?alt=media&token=eacd4082-2336-4a03-8836-6f3e6e787e47');
  }

}
