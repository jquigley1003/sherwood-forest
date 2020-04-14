import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ContactMessage } from '../../../models/contact-message.model';

import { ContactMessageService } from '../../services/contact-message.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private contactMessageService: ContactMessageService,
               private toastService: ToastService,
               private router: Router) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', (Validators.required, Validators.pattern(".+\@.+\..+"))],
      message: ['']
    });
  }

  ngOnInit() {}

  async onSubmitForm() {
    const {name, email, message} = this.contactForm.value;
    const date = Date();
    const html = `
      <div>From: ${ name }</div>
      <div>Email: <a href="mailto:${ email }">${ email }</a></div>
      <div>Date: ${ date }</div>
      <div>Message: ${ message }</div>
    `;

    const data: ContactMessage = {
      name: name,
      email: email,
      message: message,
      date: new Date(date),
      html: html
    };

    await this.contactMessageService.createContactMessage('contactMessages', data);
    await this.toastService.presentToast('Thank you, your message has been sent!',
      top,
      [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('dismiss toast message');
        }
      }], 3000 );
    await this.contactForm.reset();
    this.router.navigate(['/public/home']);

  };
}
