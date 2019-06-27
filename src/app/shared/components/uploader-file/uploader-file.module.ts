import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { UploaderFileComponent } from './uploader-file.component';
import { UploadFileTaskComponent } from '../upload-file-task/upload-file-task.component';

import { DropzoneModule } from '../../directives/dropzone/dropzone.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    DropzoneModule
  ],
  declarations: [
    UploaderFileComponent,
    UploadFileTaskComponent
  ],
  exports: [
    UploaderFileComponent
  ]
})
export class UploaderFileModule { }