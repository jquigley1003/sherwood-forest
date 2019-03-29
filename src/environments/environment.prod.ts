import { env } from './env';

export const environment = {
  production: true,
  firebase: {
    apiKey: env.firebase.apiKey,
    authDomain: env.firebase.authDomain,
    databaseURL: env.firebase.databaseURL,
    projectId: env.firebase.projectId,
    storageBucket: env.firebase.storageBucket,
    messagingSenderId: env.firebase.messagingSenderId
  }
};
