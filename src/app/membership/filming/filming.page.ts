import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-filming',
  templateUrl: './filming.page.html',
  styleUrls: ['./filming.page.scss'],
})
export class FilmingPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.signOut();
  }
}
