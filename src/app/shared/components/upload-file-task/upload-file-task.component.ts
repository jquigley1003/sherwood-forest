import { Component, OnInit, Input, Output, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { User } from '../../../models/user.model';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-upload-file-task',
  templateUrl: './upload-file-task.component.html',
  styleUrls: ['./upload-file-task.component.scss'],
})
export class UploadFileTaskComponent implements OnInit {
  @Input() file: File;
  @Input() storageFolder: string;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  sendNewPhotoURL: string;

  constructor(private afStorage: AngularFireStorage,
              private dbService: DbService) { }

  ngOnInit() {
    this.sendNewPhotoURL = 'testURL';
    this.startUpload();
  }

  getNewPhotoURL() {
    return this.downloadURL;
  }

  startUpload() {

    // The storage path
    const path = `${this.storageFolder}/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.afStorage.ref(path);

    // The main task
    this.task = this.afStorage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() => {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        // const data = {
        //   photoURL: this.downloadURL
        // };
        // this.dbService.updateAt(`users/${this.userId}`, data);
      }),
    );
    this.sendNewPhotoURL = this.downloadURL;
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
