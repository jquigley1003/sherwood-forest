import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sfca-business',
  templateUrl: './sfca-business.page.html',
  styleUrls: ['./sfca-business.page.scss'],
})
export class SfcaBusinessPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.signOut();
  }

}
