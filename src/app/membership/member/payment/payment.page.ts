import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../../shared/services/auth.service';

declare var Stripe;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit, AfterViewInit {

  @Input() paymentAmount: number;
  @Input() description: string;
  @ViewChild('cardElement', {read: ElementRef, static:false}) cardElement: ElementRef;

  stripe;
  card;
  cardErrors;
  loading = false;
  confirmation;
  chargeSuccess = false;
  currentMember$: Observable<any>;
  currentUser = null;
  ngUnsubscribe = new Subject<void>();
  totalPayment: number = 0;
  isChecked: boolean = false;
  showCheck: boolean = false;
  securityChecked: boolean = false;
  islandsChecked: boolean = false;

  optionList: Array<any> = [
    {
      id: '1',
      name: 'option_list',
      value: 25000,
      text: 'Annual Dues - $250',
      disabled: false,
      color: 'primary'
    },
    {
      id: '2',
      name: 'option_list',
      value: 5000,
      text: 'Additional Security - $50',
      disabled: false,

      color: 'primary'
    },
    {
      id: '3',
      name: 'option_list',
      value: 5000,
      text: 'SFCA Beautification - $50',
      disabled: false,

      color: 'primary'
    }
  ]

  customAlertOptions: any = {
    header: 'Payment Options',
    subHeader: 'Select payment options',
    cssClass:'custom-alert'
  };

  constructor(private router: Router,
              private authService: AuthService,
              private afFunctions: AngularFireFunctions) { }

  ngOnInit() {
    this.getCurrentUser();
    this.paymentAmount = this.totalPayment;
    this.stripe = Stripe('pk_test_hjQIkpqwizWBdDsTfcsAdKAJ00KoXDvDNu');
    const elements = this.stripe.elements();

    this.card = elements.create('card');
    this.card.addEventListener('change', ({ error }) => {
      this.cardErrors = error && error.message;
    });
  }

  ngAfterViewInit() {
    this.card.mount(this.cardElement.nativeElement);
  }

  async checkValue(event: any) {
    this.totalPayment = 0;
    // this.totalPayment += event.target.value;
    // this.paymentAmount = this.totalPayment;
    // console.log('total payment: ', this.paymentAmount, event);
    await event.detail.value.forEach(element => {
      this.totalPayment += element;
    });
    this.paymentAmount = this.totalPayment;
    console.log('event detail: ', event);
  }

  checkOption() {
    this.showCheck = !this.showCheck;
  }

  async handleForm(e) {
    e.preventDefault();

    const { source, error } = await this.stripe.createSource(this.card);

    if (error) {
      // Inform the customer that there was an error.
      this.cardErrors = error.message;
    } else {
      // Send the token to your server.

      this.loading = true;
      const user = this.currentUser;
      console.log('Current User is: ', user);
      console.log(source);
      const charge = this.afFunctions.httpsCallable('stripeCreateCharge');
      this.confirmation = await charge({ source: source.id, uid: user.id, amount: this.paymentAmount, email: user.email }).toPromise()
        .catch(err => {
          console.log('This is the error:',err);
          this.chargeSuccess = false;
          this.loading = false;
          this.cardErrors = err;
        })
      if(this.confirmation) {
        this.card.clear();
        this.chargeSuccess = true;
        console.log('Confirmation Charge: ', this.confirmation, 'Email Receipt to: ', this.confirmation.receipt_email);
        this.loading = false;
      } else {
        this.chargeSuccess = false;
        this.loading = false;
      }
    }
  }

  async getCurrentUser() {
    this.currentMember$ = await this.authService.user$;
    this.currentMember$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
      if(data) {
        this.currentUser = data;
      } else {
        this.currentUser = null;
      }
    });
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
