import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';
import { AngularFireFunctions } from '@angular/fire/functions';

declare var Stripe;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  @Input() paymentAmount: number;
  @Input() description: string;
  @ViewChild('cardElement', {static: true}) cardElement: ElementRef;

  stripe;
  card;
  cardErrors;
  loading = false;
  confirmation;

  constructor(private router: Router,
              private authService: AuthService,
              private afFunctions: AngularFireFunctions) { }

  ngOnInit() {
    this.paymentAmount = 3000;
    this.stripe = Stripe('pk_test_hjQIkpqwizWBdDsTfcsAdKAJ00KoXDvDNu');
    const elements = this.stripe.elements();

    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({ error }) => {
      this.cardErrors = error && error.message;
    });
  }

  async handleForm(e) {
    e.preventDefault();

    const { source, error } = await this.stripe.createSource(this.card);

    if (error) {
      // Inform the customer that there was an error.
      const cardErrors = error.message;
    } else {
      // Send the token to your server.

      console.log(source);

      // this.loading = true;
      // const user = await this.authService.uid();
      // console.log('User id is: ', user);
      // const fun = this.afFunctions.httpsCallable('stripeCreateCharge');
      // this.confirmation = await fun({ source: source.id, uid: user, amount: this.paymentAmount }).toPromise();
      // this.loading = false;

    }
  }

  goToMember() {
    this.router.navigate(['/member']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  logOut() {
    this.authService.signOut();
  }

}
