import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent{

  isHovering: boolean;

  files: File[] = [];

  constructor(private toastService: ToastService,
              private modalCtlr: ModalController) {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  async onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
        console.log(files.item(i).size);
        if(files.item(i).size > 1000000) {
          await this.toastService.presentToast('Your file size should be no more than 999 KB',
            true, 'middle', 'Ok', 3000 );
        }else {
          this.files.push(files.item(i));
        }
      }
    }
}
