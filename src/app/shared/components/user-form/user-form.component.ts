import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../../../models/user.model';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  currentUser;
  currentUserPhoto;
  user;
  uid;
  userFormSub;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private toastService: ToastService,
              private modalCtrl: ModalController,
              private router: Router) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      displayName: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      }),
      address: this.formBuilder.group({
        streetNumber: ['', Validators.required],
        streetName: ['', Validators.required],
        subAddress: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required]
      }),
      phone: ['', Validators.required],
      email: ['test.com', (Validators.required, Validators.pattern(".+\@.+\..+"))],
      birthDate: [''],
      occupation: [''],
      residentSince: ['']
    });

    this.userFormSub = this.authService.user$.subscribe(data => {
      this.userForm.patchValue(data);
      this.user = data;
      this.currentUser = this.user.displayName.firstName + ' ' + this.user.displayName.lastName;
      this.currentUserPhoto = this.user.photoURL;
    });

    this.authService.uid()
      .then(result => {
        this.uid = result;
      })
  }

  // getUserData() {
  //   this.currentUser$ = this.userService.fetchUser(this.uid);
  //     this.subscription = this.currentUser$.subscribe(data => {
  //       this.userForm.patchValue(data);
  //       console.log(data);
  //       this.user = data;
  //     });
  //     this.subscription.unsubscribe();
  // }

  async onUpdateUser() {
    const firstName = this.userForm.controls['displayName'].value.firstName;
    const lastName = this.userForm.controls['displayName'].value.lastName;
    const streetNumber = this.userForm.controls['address'].value.streetNumber;
    const streetName = this.userForm.controls['address'].value.streetName;
    const subAddress = this.userForm.controls['address'].value.subAddress;
    const city = this.userForm.controls['address'].value.city;
    const state = this.userForm.controls['address'].value.state;
    const zipCode = this.userForm.controls['address'].value.zipCode;
    const { phone, email, birthDate, occupation, residentSince } = this.userForm.value;

    const data: User = {
      uid: this.uid,
      displayName: {
        firstName: firstName,
        lastName: lastName
      },
      address: {
        streetNumber: streetNumber,
        streetName: streetName,
        subAddress: subAddress,
        city: city,
        state: state,
        zipCode: zipCode
      },
      photoURL: this.user.photoURL || 'https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/anon.png?alt=media&token=37218266-cecd-4525-bc51-909f388f773f',
      phone: phone,
      email: email,
      birthDate: birthDate,
      occupation: occupation,
      residentSince: residentSince
    };
    await this.userService.updateUser('users/'+ this.uid, data);
    await this.toastService.presentToast('Your member profile has been updated!',
      true, 'top', 'Ok', 3000 );
    await this.userForm.reset();
    await this.modalCtrl.dismiss();
    this.router.navigate(['/member']);
  }

  ngOnDestroy() {
    this.userFormSub.unsubscribe();
  }
}
