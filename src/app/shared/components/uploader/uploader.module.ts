import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { UploaderComponent } from './uploader.component';
import { UploadTaskComponent } from '../upload-task/upload-task.component';
import { DropzoneModule } from '../../directives/dropzone/dropzone.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    DropzoneModule
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