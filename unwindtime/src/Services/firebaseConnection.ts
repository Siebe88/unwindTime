import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// import  {firebaseConfig}  from '../config/firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyCn9oU3LJO0xMzg_6ERlRphHGXyf982UmI',
//   authDomain: 'unwind-time.firebaseapp.com',
//   projectId: 'unwind-time',
//   storageBucket: 'unwind-time.appspot.com',
//   messagingSenderId: '775168656101',
//   appId: '1:775168656101:web:f9812e99ed105d3cf00a0c',
//   measurementId: 'G-KC6K3146SH',
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const messaging = getMessaging(app);

//source: https://blog.logrocket.com/push-notifications-react-firebase/
const fetchToken = (setTokenFound: (arg0: boolean) => void) => {
  // console.log('frbconf', firebaseConfig)
  return getToken(messaging, {
    vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        // console.log('current token for client: ', currentToken);

        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
};

const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export { app, db, storage, auth, messaging, fetchToken, onMessageListener };
