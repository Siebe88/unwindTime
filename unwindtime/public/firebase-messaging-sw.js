/* eslint-disable */
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyCn9oU3LJO0xMzg_6ERlRphHGXyf982UmI',
  authDomain: 'unwind-time.firebaseapp.com',
  projectId: 'unwind-time',
  storageBucket: 'unwind-time.appspot.com',
  messagingSenderId: '775168656101',
  appId: '1:775168656101:web:f9812e99ed105d3cf00a0c',
  measurementId: 'G-KC6K3146SH',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
