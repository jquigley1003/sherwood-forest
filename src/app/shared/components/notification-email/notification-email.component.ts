import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { ContactMessage } from '../../../models/contact-message.model';

@Component({
  selector: 'app-notification-email',
  templateUrl: './notification-email.component.html',
  styleUrls: ['./notification-email.component.scss'],
})
export class NotificationEmailComponent implements OnInit {

  emailForm: FormGroup;
  editorStyle = {
    height: '50vh'
  };
  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],                                         // remove formatting button
      ['link']                                           // link
    ]
  };

  emailType: string = '';

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toastService: ToastService,
              private router: Router) {
    this.emailForm = this.formBuilder.group({
      subject: ['', Validators.required],
      emailmessage: ['']
    });
  }

  ngOnInit() {}

  buildEmailType(template) {
    this.emailType = template;
  }

  async onSubmitForm(emailType) {

    const {subject, emailmessage} = this.emailForm.value;

    const data = {
      subject: subject,
      emailmessage: emailmessage
    };

    await this.userService.sendNotificationEmail(emailType, data);
    await this.toastService.presentToast('Thank you, your ' + emailType + ' is in process!',
      true, 'middle', 'Ok', 3000 );
    await this.emailForm.reset();
  }

}
