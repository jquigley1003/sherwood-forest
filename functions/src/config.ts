// Initialize Firebase Admin
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Cloud Firestore Database
export const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

// ENV Variables
export const stripeSecret = functions.config().stripe.secret;

export const SGAPI_KEY = functions.config().sendgrid.key;
export const GENTEMPLATE_ID = functions.config().sendgrid.generaltemplate;
export const EVENTTEMPLATE_ID = functions.config().sendgrid.eventtemplate;
export const SECTEMPLATE_ID = functions.config().sendgrid.securitytemplate;
export const FILMTEMPLATE_ID = functions.config().sendgrid.filmingtemplate;
export const ALLTEMPLATE_ID = functions.config().sendgrid.alltemplate;

// Export Stripe
import * as Stripe from 'stripe';
export const stripe = new Stripe(stripeSecret);


// Export SendgridMail
import * as SendgridMail from '@sendgrid/mail';
export const sendgridMail = SendgridMail.setApiKey(SGAPI_KEY);
