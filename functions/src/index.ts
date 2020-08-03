import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as nodemailer from 'nodemailer';

const EMAIL = functions.config().gmail.email;
const EMAIL_CLIENT_ID = functions.config().gmail.clientid;
const EMAIL_CLIENT_SECRET = functions.config().gmail.clientsecret;
const EMAIL_REFRESH_TOKEN = functions.config().gmail.refreshtoken;

admin.initializeApp();

export { sendGeneralEmail, sendEventEmail, sendSecurityEmail, sendFilmingEmail, sendAllResidentsEmail, sendTestEmail } from './mail';
export { stripeAttachSource } from './sources';
export { stripeCreateCharge, stripeGetCharges } from './charges';
export { createCSV } from './csvdoc';

export const adminCreateUser = functions.https.onCall((data, context) => {
  // check if context.auth is not null
  // otherwise on build, error will be "Object is possibly 'undefined'
  // or add the ! if 100% sure context.auth is always defined
  // example: const isAdmin = context.auth!.token.admin;
  if (context.auth) {
    if(context.auth.token.admin !== true) {
      return {
        error: `Request not authorized. You must be an admin to create a new user`
      };
    }
    const newUserEmail = data.email;
    const newUserPassword = data.password;
    const firstName = data.firstName;
    const lastName = data.lastName;

    return admin.auth().createUser({
      email: newUserEmail,
      password: newUserPassword,
      emailVerified: true
    })
    .then((userRecord) => {
      const users = admin.firestore().collection('users');

      return users.doc(userRecord.uid).set({
        uid: userRecord.uid,
        email: newUserEmail,
        displayName: {
          firstName: firstName,
          lastName: lastName
        },
        address: {
          streetNumber: '123',
          streetName: 'Sherwood Forest',
          subAddress: null,
          city: 'Atlanta',
          state: 'GA',
          zipCode: '30309',
        },
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/sherwood-forest-5b7f0.appspot.com/o/FrogBotanicalGarden.jpg?alt=media&token=11f3ff3f-c3e9-4cbe-a525-2dcb033bec79',
        birthDate: null,
        occupation: null,
        residentSince: null,
        paidDues: false,
        paidSecurity: false,
        paidBeauty: false,
        roles: {
          pendingMember: true,
          approvedMember: false,
          admin: false
        },
        spousePartner: {
          firstName: '',
          lastName: '',
          spID: '',
          photoURL: ''
        }
      })
    })
    .then(() => {
      return {
        result: `${newUserEmail} is now a pending member. Firebase collection updated!`
      }
    })
    .catch(() => {
      return {
        error: `There was an error adding ${newUserEmail} as a new member.`
      };
    })
  } else {
    return null;
  }
});

export const createUser = functions.auth.user().onCreate((user) => {
  return admin.auth().setCustomUserClaims(user.uid, {
    pendingMember: true,
    approvedMember: false,
    admin: false
  }).then(() => {
    return setEmailVerifiedTrue(user.uid);
  });
});

export const deleteUser = functions.firestore
  .document('users/{userID}')
  .onDelete((snap, context) => {
    return admin.auth().deleteUser(snap.id)
      .then(() => console.log('Deleted user with ID:' + snap.id))
      .catch((error) => console.error('There was an error while deleting user:', error));
  });

export const sendContactMessage = functions.firestore
  .document('contactMessages/{messageId}')
  .onCreate(async (snapshot, context) => {

    // const fromEmail =
    //   encodeURIComponent(functions.config().gmail.email);

    // const fromPassword =
    //   encodeURIComponent(functions.config().gmail.password);

    const mailTransport =
      // nodemailer.createTransport('smtp://'+fromEmail+':'+fromPassword+'@smtp.office365.com');
      nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          type: 'OAuth2',
          user: EMAIL,
          clientId: EMAIL_CLIENT_ID,
          clientSecret: EMAIL_CLIENT_SECRET,
          refreshToken: EMAIL_REFRESH_TOKEN,
          expires: 1484314697598
        }
      });

    const newValue = snapshot.data();

    if(newValue) {
      const mailOptions = {
        to: 'sfca@sherwoodforestatl.org',
        subject: 'SFCA Contact Form Message From '+ newValue.name,
        html: newValue.html
      };

      return mailTransport.sendMail(mailOptions)
        .then(() =>
          console.log('New contact message sent from ',newValue.name));
    } else {
      return null
    }
  });

export const markApproved = functions.https.onCall((data, context) => {
  // check if context.auth is not null
  // otherwise on build, error will be "Object is possibly 'undefined'
  // or add the ! if 100% sure context.auth is always defined
  // example: const isAdmin = context.auth!.token.admin;
  if (context.auth) {
    if(context.auth.token.admin !== true) {
      return {
        error: `Request not authorized. You must be an admin to grant request for ${data.email}.`
      };
    }
    const userEmail = data.email;
    return makeApprovedMember(userEmail).then(() => {
      const users = admin.firestore().collection('users');
      return users.doc(data.uid).update({
        roles: {
          pendingMember: false,
          approvedMember: true,
          admin: false
        }
      })
        .then(() => {
          return {
            result: `${userEmail} is now an approved member. Firebase collection updated!`
          }
        })
    });
  } else {
    return null;
  }
});

export const markPending = functions.https.onCall((data, context) => {
  // check if context.auth is not null
  // otherwise on build, error will be "Object is possibly 'undefined'
  // or add the ! if 100% sure context.auth is always defined
  // example: const isAdmin = context.auth!.token.admin;
  if (context.auth) {
    if(context.auth.token.admin !== true) {
      return {
        error: `Request not authorized. You must be an admin to grant request for ${data.email}.`
      };
    }
    const userEmail = data.email;
    return makePendingMember(userEmail).then(() => {
      const users = admin.firestore().collection('users');
      return users.doc(data.uid).update({
        roles: {
          pendingMember: true,
          approvedMember: false,
          admin: false
        }
      })
        .then(() => {
          return {
            result: `${userEmail} is now a pending member. Firebase collection updated!`
          }
        })
    });
  } else {
    return null;
  }
});

export const addAdmin = functions.https.onCall((data, context) => {
  // check if context.auth is not null
  // otherwise on build, error will be "Object is possibly 'undefined'
  // or add the ! if 100% sure context.auth is always defined
  // example: const isAdmin = context.auth!.token.admin;
  if (context.auth) {
    if(context.auth.token.admin !== true) {
      return {
        error: `Request not authorized. You must be an admin to grant request for ${data.email}.`
      };
    }
    const userEmail = data.email;
    return grantAdminRole(userEmail).then(() => {
      const users = admin.firestore().collection('users');
      return users.doc(data.uid).update({
        roles: {
          pendingMember: false,
          approvedMember: true,
          admin: true
        }
      })
        .then(() => {
          return {
            result: `Request fulfilled and Firebase collection updated! ${userEmail} is now an admin.`
          }
        })
    });
  } else {
    return null;
  }
});

export const removeAdmin = functions.https.onCall((data, context) => {
  // check if context.auth is not null
  // otherwise on build, error will be "Object is possibly 'undefined'
  // or add the ! if 100% sure context.auth is always defined
  // example: const isAdmin = context.auth!.token.admin;
  if (context.auth) {
    if(context.auth.token.admin !== true) {
      return {
        error: `Request not authorized. You must be an admin to remove this role for ${data.email}.`
      };
    }
    const userEmail = data.email;
    return removeAdminRole(userEmail).then(() => {
      const users = admin.firestore().collection('users');
      return users.doc(data.uid).update({
        roles: {
          pendingMember: false,
          approvedMember: true,
          admin: false
        }
      })
        .then(() => {
          return {
            result: `${userEmail} is no longer an admin. Firebase collection updated!`
          }
        })
    });
  } else {
    return null;
  }
});

async function makeApprovedMember(email: string): Promise<void> {
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && (user.customClaims as any).approvedMember === true) {
    return;
  }
  return admin.auth().setCustomUserClaims(user.uid, {
    pendingMember: false,
    approvedMember: true,
    admin: false
  });
}

async function makePendingMember(email: string): Promise<void> {
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && (user.customClaims as any).pendingMember === true) {
    return;
  }
  return admin.auth().setCustomUserClaims(user.uid, {
    pendingMember: true,
    approvedMember: false,
    admin: false
  });
}

async function grantAdminRole(email: string): Promise<void> {
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && (user.customClaims as any).admin === true) {
    return;
  }
  return admin.auth().setCustomUserClaims(user.uid, {
    pendingMember: false,
    approvedMember: true,
    admin: true
  });
}

async function removeAdminRole(email: string): Promise<void> {
  const user = await admin.auth().getUserByEmail(email);
  if (user.customClaims && (user.customClaims as any).admin !== true) {
    return;
  }
  return admin.auth().setCustomUserClaims(user.uid, {
    pendingMember: false,
    approvedMember: true,
    admin: false
  });
}

function setEmailVerifiedTrue(uid: string) {
  return admin.auth().updateUser(uid, {
    emailVerified: true
  }).then(userRecord => {
    console.log('Successfully updated user: ', userRecord.toJSON());
  })
}
