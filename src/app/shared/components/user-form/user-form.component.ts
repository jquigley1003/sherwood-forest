import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  currentUser;


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toastService: ToastService,
              private router: Router) {
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
      email: [this.currentUser.email, (Validators.required, Validators.pattern(".+\@.+\..+"))],
      birthDate: [''],
      occupation: [''],
      residentSince: ['']
    });
  }

  ngOnInit() {
    this.currentUser = this.userService.fetchUser();
  }

}
