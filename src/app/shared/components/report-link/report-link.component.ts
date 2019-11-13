import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-report-link',
  templateUrl: './report-link.component.html',
  styleUrls: ['./report-link.component.scss'],
})
export class ReportLinkComponent implements OnInit {

  @Input() report: any;
  downloadURL$: Observable<string>;

  constructor(
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.getReportURL();
  }

  async getReportURL() {
    const reportRef = this.afStorage.ref(`reports/${this.report.id}.csv`);
    const promise = await reportRef.getDownloadURL();
    this.downloadURL$ = from(promise);
  }
}
