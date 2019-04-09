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

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toastService: ToastService,
              private router: Router) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', (Validators.required, Validators.pattern(".+\@.+\..+"))],
      message: ['']
    });
  }

  ngOnInit() {}

}
