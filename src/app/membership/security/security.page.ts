import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.signOut();
  }
}
