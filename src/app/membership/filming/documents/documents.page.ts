import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  goToFilming() {
    this.router.navigate(['/filming']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  downloadFCC() {
    window.open('https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/documents%2FFilmingCodeOfConduct.pdf?alt=media&token=8a22b996-803c-4cb5-b84a-e6bc05fd34cb');
  }

  downloadPG() {
    window.open('https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/documents%2FProducerGuidelines.pdf?alt=media&token=03769db6-bba9-4298-93a2-9bb2fcd70d86');
  }

  logOut() {
    this.authService.signOut();
  }

}
