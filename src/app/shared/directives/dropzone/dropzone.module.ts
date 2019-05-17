import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneDirective } from './dropzone.directive';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    DropzoneDirective
  ],
  exports: [
    DropzoneDirective
  ]
})
export class DropzoneModule { }
