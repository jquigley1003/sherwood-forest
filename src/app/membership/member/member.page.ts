import { Component, OnInit, OnDestroy } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { AuthService } from '../../shared/services/auth.service';
import { UserModalComponent } from '../../shared/modals/user-modal/user-modal.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {
  user;
  currentUser;
  subscription;

  constructor(private authService: AuthService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(data => {
      this.user = data;
      this.currentUser = this.user.displayName.firstName + ' ' + this.user.displayName.lastName;
    });
  }

  async presentUserModal() {
    const modal = await this.modalCtrl.create({
      component: UserModalComponent,
      componentProps: {}
    });
    return await modal.present();
  }

  logOut() {
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
