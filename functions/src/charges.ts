import * as functions from 'firebase-functions';
import { assert, assertUID, catchErrors } from './helpers';
import { stripe } from './config';
import { getCustomer } from './customers';
import { attachSource } from './sources';



/**
 Gets a user's charge history
 */

 export const getUserCharges = async(uid: string) => {
   const customer = await getCustomer(uid);

   return await stripe.charges.list({
     customer
   });
 }

 /**
  Creates a charge for a specific amount
  */

  export const createCharge = async(uid: string, source: string, amount: number, email: string, description: string, idempotency_key: string) => {
    await attachSource(uid, source);

    const customer = await getCustomer(uid);

    return stripe.charges.create({
      amount,
      customer,
      source,
      currency: 'usd',
      receipt_email: email,
      description
    },
      { idempotency_key }
    )
  }

  ////// DEPLOYABLE FUNCTIONS ////////

  export const stripeCreateCharge = functions.https.onCall( async (data, context) => {
    const uid = assertUID(context);
    const source = assert(data, 'source');
    const amount = assert(data, 'amount');
    const email = assert(data, 'email');
    const description = assert(data, 'description');

    // Optional
    const idempotency_key = data.idempotency_key;

    return catchErrors( createCharge(uid, source, amount, email, description, idempotency_key) );
  });

  export const stripeGetCharges = functions.https.onCall( async (data, context) => {
    const uid = assertUID(context);
    return catchErrors( getUserCharges(uid) );
  })
  