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

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private afStorage: AngularFireStorage,
              private dbService: DbService) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {

    // The storage path
    const path = `profile/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.afStorage.ref(path);

    // The main task
    this.task = this.afStorage.upload(path, this.file);

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
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
