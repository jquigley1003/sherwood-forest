import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { UploaderComponent } from './uploader.component';
import { UploadTaskComponent } from '../upload-task/upload-task.component';
import { DropzoneModule } from '../../directives/dropzone/dropzone.module';
import { ImageCropperModule } from 'ngx-img-cropper';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    DropzoneModule,
    ImageCropperModule
  ],
  declarations: [
    UploaderComponent,
    UploadTaskComponent
  ],
  exports: [
    UploaderComponent
  ]
})
export class UploaderModule { }