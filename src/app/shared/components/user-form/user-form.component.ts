import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../../models/user.model';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  currentUser$: Observable<any>;
  uid;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private toastService: ToastService,
              private router: Router) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetNumber: ['', Validators.required],
      streetName: ['', Validators.required],
      subAddress: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['test.com', (Validators.required, Validators.pattern(".+\@.+\..+"))],
      birthDate: [''],
      occupation: [''],
      residentSince: ['']
    });

    this.authService.uid()
      .then(result => {
        this.uid = result;
      })
      .then(() => {
        this.getUserData();
      });
  }

  getUserData() {
    this.currentUser$ = this.userService.fetchUser(this.uid);
      this.currentUser$.subscribe(data => {
        this.userForm.patchValue(data);
        console.log(data);
      });
  }
}
