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
  showCheck: boolean = false;
  showBillPay: boolean = false;
  showVenmo: boolean = false;
  showCreditCard: boolean = false;
  payOptionText: Array<any> = [];
  currentYear: number;

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
  ];

  customAlertOptions: any = {
    header: 'Payment Options',
    subHeader: '(1) Select payment amounts  (2) Click "OK"  (3) Enter credit card information',
    cssClass:'custom-alert'
  };

  constructor(private router: Router,
              private authService: AuthService,
              private afFunctions: AngularFireFunctions) { }

  ngOnInit() {
    this.getCurrentUser();
    this.paymentAmount = this.totalPayment;
    this.stripe = Stripe('pk_test_tmTO0Fa6CBYTehnwfjNxpp7l00JUD1YmVj');
    const elements = this.stripe.elements();

    this.card = elements.create('card');
    this.card.addEventListener('change', ({ error }) => {
      this.cardErrors = error && error.message;
    });
    this.currentYear = Date.now();
  }

  ngAfterViewInit() {
    this.card.mount(this.cardElement.nativeElement);
  }

  async checkValue(event: any) {
    this.payOptionText = [];
    this.totalPayment = 0;
    await event.detail.value.forEach(element => {
      this.totalPayment += element.value;
      this.payOptionText.push(element.text + '  ');
    });
    this.paymentAmount = this.totalPayment;
    console.log('event detail: ', this.payOptionText);
  }

  checkOption() {
    this.showCheck = !this.showCheck;
  }

  billPayOption() {
    this.showBillPay = !this.showBillPay;
  }

  venmoOption() {
    this.showVenmo = !this.showVenmo;
  }

  creditCardOption() {
    this.showCreditCard = !this.showCreditCard;
    if (!this.showCreditCard) {
      this.paymentAmount = 0;
      this.totalPayment = 0;
      this.payOptionText = [];
    }
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
      this.confirmation = await charge(
        { source: source.id, uid: user.id, amount: this.paymentAmount, email: user.email, description: this.payOptionText.toString()
        }).toPromise()
        .catch(err => {
          console.log('This is the error:',err);
          this.chargeSuccess = false;
          this.loading = false;
          this.cardErrors = err;
        })
      if (this.confirmation) {
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
