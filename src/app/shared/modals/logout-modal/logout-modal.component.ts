import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss'],
})
export class LogoutModalComponent implements OnInit {

  currentUserSub: Subscription;
  user;
  userEmail;

  constructor(private authService: AuthService,
              private modalCtrl: ModalController,
              private router: Router) { }

  ngOnInit() {
    this.currentUserSub = this.authService.user$.subscribe(data => {
      if(data) {
        this.user = data;
        this.userEmail = this.user.email;
      } else {
        this.user = null;
        this.userEmail = null;
      }
    });
  }

  async resetPassword() {
    await this.authService.resetPassword(this.userEmail);
    this.modalCtrl.dismiss();
  }

  async logoutMember() {
    await this.authService.signOut();
    this.modalCtrl.dismiss();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

}
