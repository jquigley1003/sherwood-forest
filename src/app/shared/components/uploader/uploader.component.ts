import { Component, Input, ViewChild } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ModalController } from '@ionic/angular';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
import { UploadTaskComponent } from '../upload-task/upload-task.component';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent {
  @Input() memberId: string;
  @Input() memberName: string;
  @Input() currentPhotoURL: string;
  @Input() spMemberId: string;
  @ViewChild('cropper') cropper:ImageCropperComponent;
  @ViewChild(UploadTaskComponent) uploadTaskComponent: UploadTaskComponent;
  imageCropData: any;
  cropperSettings: CropperSettings

  isHovering: boolean;
  newProfile: any;
  showCropper: boolean = false;
  // files: File[] = [];

  constructor(private toastService: ToastService,
              private modalCtlr: ModalController) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 300;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 350;
    this.cropperSettings.canvasHeight = 300;
    this.imageCropData = {};
              }


  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  async onDrop(files: FileList) {
    this.showCropper = true;
    for (let i = 0; i < files.length; i++) {
      console.log(files.item(i));
      if(files.item(i).size > 5100000) {
        await this.toastService.presentToast(
          'Your file size should be no more than 5MB',
          'middle',
          [{
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('dismiss toast message');
            }
          }], 3000 );
      }else {
        var image:any = new Image();
        var chosenFile:File = files.item(i);
        var myReader:FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent:any) {
          image.src = loadEvent.target.result;
          that.cropper.setImage(image);
        };
        myReader.readAsDataURL(chosenFile);
      }
    }
  }
    

  async getImageData(){
    this.newProfile = await this.imageCropData.image;
    console.log('new profile: ', this.newProfile);
    this.uploadTaskComponent.startUpload(this.newProfile, this.currentPhotoURL, this.spMemberId);
    this.showCropper = false;
    // fetch(this.imageCropData.image)
    //   .then(res => res.blob())
    //   .then(blob => {
    //     var fd = new FormData()
    //     fd.append('image', blob, 'filename')

    //     console.log(blob)
    //   })
      
  }
}
