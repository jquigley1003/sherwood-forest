import { Component } from '@angular/core';
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

  downloadTofG() {
    window.open('https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/documents%2FNativeTreesGeorgia.pdf?alt=media&token=804efdfd-b9ce-42e3-9052-5e0136d899f4');
  }

}
