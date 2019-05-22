import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-tree-watch',
  templateUrl: './tree-watch.page.html',
  styleUrls: ['./tree-watch.page.scss'],
})
export class TreeWatchPage {

  constructor(private router: Router,
              private authService: AuthService) { }

  goHome() {
    this.router.navigate(['/']);
  }

  logOut() {
    this.authService.signOut();
  }

}
