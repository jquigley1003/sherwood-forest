import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DirectoryPage } from './directory.page';
import { FooterModule } from '../../shared/components/footer/footer.module';
import { DirectoryModalModule } from '../../shared/modals/directory-modal/directory-modal.module';

const routes: Routes = [
  {
    path: '',
    component: DirectoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FooterModule,
    DirectoryModalModule
  ],
  declarations: [DirectoryPage]
})
export class DirectoryPageModule {}
