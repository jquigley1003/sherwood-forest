import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ModalController } from '@ionic/angular';
import { UploadFileTaskComponent } from '../upload-file-task/upload-file-task.component';
import { CalendarComponent } from 'ionic2-calendar/calendar';

@Component({
  selector: 'app-uploader-file',
  templateUrl: './uploader-file.component.html',
  styleUrls: ['./uploader-file.component.scss'],
})
export class UploaderFileComponent implements AfterViewInit {
  @ViewChild(UploadFileTaskComponent) uploadFileTaskComponent: UploadFileTaskComponent;
  @Input() fileFolder: string;

  getNewPhotoURL: string;

  isHovering: boolean;

  files: File[] = [];

  constructor(private toastService: ToastService,
              private modalCtlr: ModalController) {}


  ngAfterViewInit() {
    this.getNewPhotoURL = this.uploadFileTaskComponent.downloadURL;
    // console.log(this.uploadFileTaskComponent);
  }

  updatePhotoURL() {
    return this.getNewPhotoURL = this.uploadFileTaskComponent.getNewPhotoURL();
  }


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  async onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
        // console.log(files.item(i).size);
        if(files.item(i).size > 5100000) {
          await this.toastService.presentToast('Your file size should be no more than 5MB',
            'middle',
            [{
              text: 'OK',
              role: 'cancel',
              handler: () => {
                // console.log('dismiss toast message');
              }
            }], 3000 );
        }else {
          this.files.push(files.item(i));
          this.getNewPhotoURL = this.uploadFileTaskComponent.downloadURL;
        }
      }
    }
}
