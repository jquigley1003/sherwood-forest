import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as nodemailer from 'nodemailer';

admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const createUser = functions.auth.user().onCreate((user) => {
  return admin.auth().setCustomUserClaims(user.uid, {
    pendingMember: true,
    approvedMember: false,
    admin: false
  });
});

export const sendContactMessage = functions.firestore
  .document('contactMessages/{messageId}')
  .onCreate(async (snapshot, context) => {

    const gmailEmail =
      encodeURIComponent(functions.config().gmail.email);

    const gmailPassword =
      encodeURIComponent(functions.config().gmail.password);

    const mailTransport =
      nodemailer.createTransport('smtps://'+gmailEmail+':'+gmailPassword+'@smtp.gmail.com');

    const newValue = snapshot.data();

    if(newValue) {
      const mailOptions = {
        to: 'jeff.quigley@wavinghi.com',
        subject: 'SFCA Contact Message From '+ newValue.name,
        html: newValue.html
      };

      return mailTransport.sendMail(mailOptions)
        .then(() =>
          console.log('New contact message sent from ',newValue.name));
    } else {
      return null
    }
  });