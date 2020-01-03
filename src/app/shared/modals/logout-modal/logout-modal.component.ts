import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss'],
})
export class LogoutModalComponent implements OnInit, OnDestroy {
  changeEmailForm: FormGroup;
  currentUserSub: Subscription;
  user;
  userEmail;

  constructor(private authService: AuthService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private router: Router) {
                this.changeEmailForm = this.formBuilder.group({
                  email: ['', (Validators.required, Validators.pattern(".+\@.+\..+"))]
                });
               }

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

  async onChangeEmailForm() {
    const newEmail = this.changeEmailForm.value.email;
    await this.authService.changeEmail(newEmail);
    console.log('new email is: ' + newEmail);
    const data = {
      email: newEmail
    };
    this.userService.updateUser('users/'+ this.user.uid, data);
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
