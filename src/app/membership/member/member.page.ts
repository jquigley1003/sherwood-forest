import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { AuthService } from '../../shared/services/auth.service';
import { UserModalComponent } from '../../shared/modals/user-modal/user-modal.component';
import { slideTitleLeftTrigger, slideTitleRightTrigger } from '../../shared/components/animations/animations';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
  animations: [
    slideTitleRightTrigger,
    slideTitleLeftTrigger
  ]
})
export class MemberPage implements OnInit {
  user;
  currentUser;
  subscription;
  currentYear: Date;
  duesPaid: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(data => {
      this.user = data;
      this.currentUser = this.user.displayName.firstName + ' ' + this.user.displayName.lastName;
      this.duesPaid = this.user.duesPaid;
    });

    this.currentYear = new Date();
  }

  async presentUserModal() {
    const modal = await this.modalCtrl.create({
      component: UserModalComponent,
      componentProps: {}
    });
    return await modal.present();
  }

  goHome() {
    this.router.navigate(['/']);
  }

  logOut() {
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
