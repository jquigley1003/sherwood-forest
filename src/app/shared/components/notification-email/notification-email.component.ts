import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { rejects } from 'assert';

@Component({
  selector: 'app-notification-email',
  templateUrl: './notification-email.component.html',
  styleUrls: ['./notification-email.component.scss'],
})
export class NotificationEmailComponent implements OnInit {
  @ViewChild('quillFile') quillFileRef: ElementRef;
  currentAdmin: string;
  quillFile: any;
  myQuillRef: any;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  pastePhotoURL: any;
  emailType: string = '';
  emailForm: FormGroup;
  editorStyle = {
    height: '50vh',
    width: '100%'
  };
  editorConfig = {
    toolbar: {
      container: [
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
      ['link','image']                                   // link and image
      ],
      handlers: {
        image: (image) => {
          this.imageHandler(image);
        }
      }
    }
  };
  information = 'Insert text here. NOTE: When adding images, press "enter/return" on keyboard after image is inserted.';

  constructor(private formBuilder: FormBuilder,
              private afStorage: AngularFireStorage,
              private authService: AuthService,
              private userService: UserService,
              private toastService: ToastService,
              private router: Router) {
    this.emailForm = this.formBuilder.group({
      subject: ['', Validators.required],
      emailmessage: ['']
    });
  }

  ngOnInit() {
    
  }

  buildEmailType(template) {
    this.emailType = template;
  }

  getEditorInstance(editorInstance: any) {
    this.myQuillRef = editorInstance;
  }

  imageHandler(image: any) {
    /* Here we trigger a click action on the file input field, this will open a file chooser on a client computer */
    this.quillFileRef.nativeElement.click();
  }

  async quillFileSelected(ev: any) {
    /* After the file is selected from the file chooser, we handle the upload process */
    this.quillFile = await ev.target.files[0];
    this.uploadPhoto();
  }

  async uploadPhoto() {
    // The image name for upload
    const imgForUpload = `${Date.now()}_${this.quillFile.name}`;
    // Split the image name and its extension
    const imgName = imgForUpload.replace(/\.[^/.]+$/, "");
    const imgType = imgForUpload.substr((imgForUpload.lastIndexOf('.')+1));
    // The storage paths for image upload and resized image
    // Images are resized using Firebase Resize Images extension - max-size 525x735    
    const path = `notifications/${imgForUpload}`;
    const resizePath = `notifications/resized/${imgName}_525x735.${imgType}`;
    
    // Reference to storage bucket
    const ref = this.afStorage.ref(path);
    const refResize = this.afStorage.ref(resizePath);

    // The main task
    this.task = this.afStorage.upload(path, this.quillFile);
    
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(),
      // The file's download URL
      finalize( async() => {
        await this.toastService.presentToast(
          'Please wait, your image is being resized',
          'middle',
          [{
            text: 'OK',
            role: 'cancel'
          }],7000
        );

        setTimeout(async() => {
          this.downloadURL = await refResize.getDownloadURL().toPromise();
          this.getPhotoURL();
        }, 10000)
      }),
    );
  }

  async getPhotoURL() {
    const img = '<img src="' + this.downloadURL + '"></img>';
    const range = await this.myQuillRef.getSelection();
    await this.myQuillRef.clipboard.dangerouslyPasteHTML(range.index, img);

    this.percentage = null;
    this.snapshot = null;
    setTimeout(() =>{
      this.downloadURL = "";
    },10000)
  }

  async onSubmitForm(emailType) {
    const {subject, emailmessage} = this.emailForm.value;
    const data = {
      subject: subject,
      emailmessage: emailmessage,
    };

    await this.userService.sendNotificationEmail(emailType, data);
    await this.toastService.presentToast(
      'Thank you, your ' + emailType + ' is in process!',
      'middle',
      [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          console.log('dismiss toast message');
        }
      }], 3000 );
    this.emailForm.reset();
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
