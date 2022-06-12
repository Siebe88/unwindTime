import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging } from 'firebase/messaging/sw';

const firebaseConfig = {
  apiKey: 'AIzaSyCn9oU3LJO0xMzg_6ERlRphHGXyf982UmI',
  authDomain: 'unwind-time.firebaseapp.com',
  projectId: 'unwind-time',
  storageBucket: 'unwind-time.appspot.com',
  messagingSenderId: '775168656101',
  appId: '1:775168656101:web:f9812e99ed105d3cf00a0c',
  measurementId: 'G-KC6K3146SH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const messaging = getMessaging(app);
// messaging.getToken({
//   vapidKey:
//     'BKzLRtr6U6-LR6IJEd4MxZNDHioh-_y-17RAV9fOtnTAsBElwuTQtQTum8NN0tTDSNa-MO99uSTeBCKOgm1BTyc',
// });

export { app, db, storage, auth, messaging };
