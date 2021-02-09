import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss'],
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;
  @Input() userId: string;
  @Input() userName: string;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private afStorage: AngularFireStorage,
              private dbService: DbService) { }

  ngOnInit() {
    
  }

  async startUpload(image, oldPhotoURL, spMemberId) {
    // Delete the image being replaced from firebase storage
    if(oldPhotoURL != "https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/FrogBotanicalGarden.jpg?alt=media&token=11f3ff3f-c3e9-4cbe-a525-2dcb033bec79") {
      const oldPhotoRef = this.afStorage.storage.refFromURL(oldPhotoURL).delete();
      // console.log('old profile pic deleted: ', oldPhotoRef);
    } else {
      // console.log('did not delete the frog: ', oldPhotoURL);
    }
    
    // console.log('upload task file: ', image);
    // The storage path
    const path = `profile/${Date.now()}_${this.userName}`;

    // Reference to storage bucket
    const ref = this.afStorage.ref(path);

    // The main task
    // this.task = this.afStorage.upload(path, this.file);
    this.task = this.afStorage.ref(path).putString(image, 'data_url');

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(),
      // The file's download URL
      finalize( async() => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        const data = {
          photoURL: this.downloadURL
        };
        this.dbService.updateAt(`users/${this.userId}`, data);
        if(spMemberId != "") {
          const spData = {
            spousePartner: {
              photoURL: this.downloadURL
            } 
          };
          this.dbService.updateAt(`users/${spMemberId}`, spData);
        }
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
