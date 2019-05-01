import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { growImgTrigger, slideTitleLeftTrigger, slideTitleRightTrigger } from '../../shared/components/animations/animations';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  animations: [
    slideTitleRightTrigger,
    slideTitleLeftTrigger,
    growImgTrigger
  ]
})
export class Tab1Page {

  constructor(private router: Router){}

  goHome() {
    this.router.navigate(['/']);
  }
}
