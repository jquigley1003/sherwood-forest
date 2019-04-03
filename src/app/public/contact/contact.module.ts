import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactPage } from './contact.page';
import { ContactFormModule } from '../../shared/components/contact-form/contact-form.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ContactPage }]),
    ContactFormModule
  ],
  declarations: [ContactPage]
})
export class ContactPageModule {}
