import { assert } from './helpers';
import { db, stripe } from './config';

/**
 Read the user document from Firestore
 */

export const getUser = async(uid: string) => {
    return await db.collection('users').doc(uid).get()
    .then(doc => doc.data());
}

/**
 Gets a customer from Stripe
 */
export const getCustomer = async(uid: string) => {
    const user = await getUser(uid);
    return assert(user, 'stripeCustomerId');
}

/** 
 Updates the user document non-destructively
 */
export const updateUser = async(uid: string, data: Object) => {
    return await db.collection('users').doc(uid).set(data, {merge: true});
}

/**
 Takes a Firebase user and creates a Stripe customer account
 */
export const createCustomer = async(uid: any, customerName: any, customerEmail:any) => {
    const customer = await stripe.customers.create({
      name: customerName,  
      email: customerEmail,
      metadata: { 
        firebaseUID: uid, 
      }, 
    });

    await updateUser(uid, { stripeCustomerId: customer.id })
    return customer;
}

 /**
Read the Stripe customer ID from Firestore, or create a new one if missing
*/
export const getOrCreateCustomer = async(uid: string) => {
    const user = await getUser(uid);
    const customerId = user && user.stripeCustomerId;
    const customerName = user === undefined ? null : user.displayName.firstName + ' ' + user.displayName.lastName;
    const customerEmail = user === undefined ? null : user.email;

    // If missing customer ID, create it
    if(!customerId) {
        return createCustomer(uid, customerName, customerEmail);
    } else {
        return stripe.customers.retrieve(customerId);
    }
}