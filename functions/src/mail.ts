import * as functions from 'firebase-functions';
import { db } from './config';

// Sendgrid Config
import * as sendgridMail from '@sendgrid/mail';

const SGAPI_KEY = functions.config().sendgrid.key;
const GENTEMPLATE_ID = functions.config().sendgrid.generaltemplate;
const EVENTTEMPLATE_ID = functions.config().sendgrid.eventtemplate;
const SECTEMPLATE_ID = functions.config().sendgrid.securitytemplate;
const FILMTEMPLATE_ID = functions.config().sendgrid.filmingtemplate;
const ALLTEMPLATE_ID = functions.config().sendgrid.alltemplate;

sendgridMail.setApiKey(SGAPI_KEY);

export const sendGeneralEmail = functions.https.onCall(async (data, context) => {
  // check if context.auth is not null
  // otherwise on build, error will be "Object is possibly 'undefined'
  // or add the ! if 100% sure context.auth is always defined
  // example: const isAdmin = context.auth!.token.admin;
  if (context.auth) {
    if (context.auth.token.admin !== true) {
      return {
        error: `Request not authorized. You must be an admin to create a new user`
      };
    }

    const userSnapshots = await db.collection('users').where('roles.approvedMember', '==', true).get();

    const emails = userSnapshots.docs.map(snap => snap.data().email);

    const msg = {
      to: emails,
      from: 'sfca@sherwoodforestatl.org',
      templateId: GENTEMPLATE_ID,
      dynamic_template_data: {
        subject: data.subject,
        emailmessage: data.emailmessage,
        sender_name: 'Sherwood Forest Civic Association',
        sender_address: 'PO Box 77531',
        sender_city: 'Atlanta',
        sender_state: 'GA',
        sender_zip: '30357',
        sender_email: 'sfca@sherwoodforestatl.org'
      },
    };

    await sendgridMail.sendMultiple(msg);

    // Handle errors here

    // Response must be JSON serializable
    return {
      result: `The general email has been sent to all approved members!`
    };
  } else {
    return {
      error: `Error: The general email was not sent.`
    };
  }
});

export const sendEventEmail = functions.https.onCall(async (data, context) => {
  // check if context.auth is not null
  // otherwise on build, error will be "Object is possibly 'undefined'
  // or add the ! if 100% sure context.auth is always defined
  // example: const isAdmin = context.auth!.token.admin;
  if (context.auth) {
    if (context.auth.token.admin !== true) {
      return {
        error: `Request not authorized. You must be an admin to create a new user`
      };
    }

    const userSnapshots = await db.collection('users').where('roles.approvedMember', '==', true).get();

    const emails = userSnapshots.docs.map(snap => snap.data().email);

    const msg = {
      to: emails,
      from: 'sfca@sherwoodforestatl.org',
      templateId: EVENTTEMPLATE_ID,
      dynamic_template_data: {
        subject: data.subject,
        emailmessage: data.emailmessage,
        sender_name: 'Sherwood Forest Civic Association',
        sender_address: 'PO Box 77531',
        sender_city: 'Atlanta',
        sender_state: 'GA',
        sender_zip: '30357',
        sender_email: 'sfca@sherwoodforestatl.org'
      },
    };

    await sendgridMail.sendMultiple(msg);

    // Handle errors here

    // Response must be JSON serializable
    return {
      result: `The event email has been sent to all approved members!`
    };
  } else {
    return {
      error: `Error: The event email was not sent.`
    };
  }
});

export const sendSecurityEmail = functions.https.onCall(async (data, context) => {
  // check if context.auth is not null
  // otherwise on build, error will be "Object is possibly 'undefined'
  // or add the ! if 100% sure context.auth is always defined
  // example: const isAdmin = context.auth!.token.admin;
  if (context.auth) {
    if (context.auth.token.admin !== true) {
      return {
        error: `Request not authorized. You must be an admin to create a new user`
      };
    }

    const userSnapshots = await db.collection('users').where('roles.approvedMember', '==', true).get();

    const emails = userSnapshots.docs.map(snap => snap.data().email);

    const msg = {
      to: emails,
      from: 'sfca@sherwoodforestatl.org',
      templateId: SECTEMPLATE_ID,
      dynamic_template_data: {
        subject: data.subject,
        emailmessage: data.emailmessage,
        sender_name: 'Sherwood Forest Civic Association',
        sender_address: 'PO Box 77531',
        sender_city: 'Atlanta',
        sender_state: 'GA',
        sender_zip: '30357',
        sender_email: 'sfca@sherwoodforestatl.org'
      },
    };

    await sendgridMail.sendMultiple(msg);

    // Handle errors here

    // Response must be JSON serializable
    return {
      result: `The security email has been sent to all approved members!`
    };
  } else {
    return {
      error: `Error: The security email was not sent.`
    };
  }
});

export const sendFilmingEmail = functions.https.onCall(async (data, context) => {
  // check if context.auth is not null
  // otherwise on build, error will be "Object is possibly 'undefined'
  // or add the ! if 100% sure context.auth is always defined
  // example: const isAdmin = context.auth!.token.admin;
  if (context.auth) {
    if (context.auth.token.admin !== true) {
      return {
        error: `Request not authorized. You must be an admin to create a new user`
      };
    }

    const userSnapshots = await db.collection('users').where('roles.approvedMember', '==', true).get();
    // const userSnapshots = await db.collection('users').where('displayName.lastName', '==', 'Quigley').get();
    const emails = userSnapshots.docs.map(snap => snap.data().email);

    const msg = {
      to: emails,
      from: 'sfca@sherwoodforestatl.org',
      templateId: FILMTEMPLATE_ID,
      dynamic_template_data: {
        subject: data.subject,
        emailmessage: data.emailmessage,
        // sender_name: 'Test SFCA Email',
        sender_name: 'Sherwood Forest Civic Association',
        sender_address: 'PO Box 77531',
        sender_city: 'Atlanta',
        sender_state: 'GA',
        sender_zip: '30357',
        sender_email: 'sfca@sherwoodforestatl.org'
      },
    };

    await sendgridMail.sendMultiple(msg);
    // Handle errors here
    // Response must be JSON serializable
    return {
      result: `The filming email has been sent to all all approved members!`
    };
  } else {
    return {
      error: `Error: The filming email was not sent.`
    };
  }
});

export const sendAllResidentsEmail = functions.https.onCall(async (data, context) => {
  // check if context.auth is not null
  // otherwise on build, error will be "Object is possibly 'undefined'
  // or add the ! if 100% sure context.auth is always defined
  // example: const isAdmin = context.auth!.token.admin;
  if (context.auth) {
    if (context.auth.token.admin !== true) {
      return {
        error: `Request not authorized. You must be an admin to create a new user`
      };
    }

    const userSnapshots = await db.collection('users').get();

    const emails = userSnapshots.docs.map(snap => snap.data().email);

    const msg = {
      to: emails,
      from: 'sfca@sherwoodforestatl.org',
      templateId: ALLTEMPLATE_ID,
      dynamic_template_data: {
        subject: data.subject,
        emailmessage: data.emailmessage,
        sender_name: 'Sherwood Forest Civic Association',
        sender_address: 'PO Box 77531',
        sender_city: 'Atlanta',
        sender_state: 'GA',
        sender_zip: '30357',
        sender_email: 'sfca@sherwoodforestatl.org'
      },
    };

    await sendgridMail.sendMultiple(msg);

    // Handle errors here

    // Response must be JSON serializable
    return {
      result: `The all residents email has been sent to all SF residents!`
    };
  } else {
    return {
      error: `Error: The all residents email was not sent.`
    };
  }
});
