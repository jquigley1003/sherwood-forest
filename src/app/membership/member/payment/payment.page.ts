import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';

import { Observable, Subject, TimeoutError } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ToastService } from 'src/app/shared/services/toast.service';

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
  currentDate: Date = new Date();
  currentYear;
  foundDuesOption;
  payOptData = {};


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
    // {
    //   id: '4',
    //   name: 'option_list',
    //   value: 100,
    //   text: 'Donation to SFCA - $1',
    //   disabled: false,
    //   color: 'primary'
    // }
  ];

  customAlertOptions: any = {
    header: 'Payment Options',
    subHeader: '(1) Select payment amounts  (2) Click "OK"  (3) Enter credit card information',
    cssClass:'custom-alert'
  };

  constructor(private router: Router,
              private afFunctions: AngularFireFunctions,
              private authService: AuthService,
              private userService: UserService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.paymentAmount = this.totalPayment;
    // this.stripe = Stripe('pk_test_tmTO0Fa6CBYTehnwfjNxpp7l00JUD1YmVj');
    this.stripe = Stripe('pk_live_wMHR49b6z5ImcUTYkywzrMPS00zhRRLY8W');
    const elements = this.stripe.elements();

    this.card = elements.create('card');
    this.card.addEventListener('change', ({ error }) => {
      this.cardErrors = error && error.message;
    });
    this.currentYear = this.currentDate.getFullYear();
  }

  ngAfterViewInit() {
    this.card.mount(this.cardElement.nativeElement);
  }

  async getCurrentUser() {
    this.currentMember$ = await this.authService.user$;
    this.currentMember$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
      if(data) {
        this.currentUser = data;
        if(this.currentUser.paidDues == true) {
          this.optionList[0].disabled = true;
          this.optionList[0].text = this.currentYear + ' dues paid!';
        }
      } else {
        this.currentUser = null;
      }
    });
  }


  async checkValue(event: any) {
    this.payOptionText = [];
    this.totalPayment = 0;
    await event.detail.value.forEach(element => {
      this.totalPayment += element.value;
      this.payOptionText.push(' '+ element.text);
    });
    this.paymentAmount = this.totalPayment;
    console.log('Pay option detail: ', this.payOptionText);
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
      // console.log('Current User is: ', user);
      // console.log(source);
      const charge = this.afFunctions.httpsCallable('stripeCreateCharge');
      this.confirmation = await charge(
        { source: source.id, uid: user.id, amount: this.paymentAmount, email: user.email, description: this.payOptionText.toString()
        }).toPromise()
        .catch(err => {
          // console.log('This is the error:',err);
          this.chargeSuccess = false;
          this.loading = false;
          this.cardErrors = err;
        })
      if (this.confirmation) {
        this.card.clear();
        this.chargeSuccess = true;
        this.loading = false;
        if (this.confirmation.description.includes('Annual Dues - $250')) {
          await this.checkPayOptions(this.confirmation.description);
          this.markDuesPaid(user, this.confirmation.description);
        } else {
          await this.checkContributions(this.confirmation.description);
          this.markContributionPaid(user, this.confirmation.description);
        }
      } else {
        this.chargeSuccess = false;
        this.loading = false;
      }
    }
  }

  checkPayOptions(payOpts) {
    if(payOpts.includes('Annual Dues - $250, Additional Security - $50, SFCA Beautification - $50')) {
      console.log("Paid Dues, Paid Security, Paid Beauty");
      return this.payOptData = {
        paidDues: true,
        paidSecurity: true,
        paidBeauty: true
      };
    } else if(payOpts.includes('Annual Dues - $250, Additional Security - $50')) {
      console.log("Paid Dues, Paid Security");
      return this.payOptData = {
        paidDues: true,
        paidSecurity: true
      };
    } else if(payOpts.includes('Annual Dues - $250, SFCA Beautification - $50')) {
      console.log("Paid Dues, Paid Beauty");
        return this.payOptData = {
          paidDues: true,
          paidBeauty: true
        };
    } else {
      console.log("Paid Dues Only");
        return this.payOptData = {
          paidDues: true
        };
    }
  }

  checkContributions(extraOpts) {
    if(extraOpts.includes('Additional Security - $50, SFCA Beautification - $50')) {
      console.log("Paid Security, Paid Beauty");
        return this.payOptData = {
          paidSecurity: true,
          paidBeauty: true
        };
    } else if(extraOpts.includes('Additional Security - $50')) {
      console.log("Paid Security Only");
        return this.payOptData = {
          paidSecurity: true
        };
    } else {
      console.log("Paid Beauty Only");
        return this.payOptData = {
          paidBeauty: true
        };
    }
  }

  async markDuesPaid(user, description) {
    this.payOptData["uid"] = user.uid;
    const data = this.payOptData;
    await this.userService.updateUser('users/'+ user.uid, data);
    this.toastService.presentToast(
      user.displayName.firstName + ', your dues have been marked paid! Thank you for the following payments: ' + description,
      true, 'bottom', 'Ok', 10000 );
    if(user.spousePartner.spID !== '') {
      this.userService.updateUser('users/'+ user.spousePartner.spID, data);
    }
  }

  async markContributionPaid(user, description) {
    this.payOptData["uid"] = user.uid;
    const data = this.payOptData;
    await this.userService.updateUser('users/'+ user.uid, data);
    this.toastService.presentToast(
      user.displayName.firstName + ', thank you for the following contribution: ' + description + ' !',
      true, 'bottom', 'Ok', 10000 );
    if(user.spousePartner.spID !== '') {
      this.userService.updateUser('users/'+ user.spousePartner.spID, data);
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
