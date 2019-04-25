import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectoryModalComponent } from './directory-modal.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DirectoryModalComponent
  ],
  entryComponents: [
    DirectoryModalComponent
  ]
})
export class DirectoryModalModule { }
