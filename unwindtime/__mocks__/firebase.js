const firebase = jest.genMockFromModule('firebase');
firebase.initializeApp = jest.fn();
firebase.getFirestore= jest.fn();
firebase.getStorage = jest.fn();
firebase.getAuth = jest.fn();
firebase.getMessaging= jest.fn();


module.exports = firebase;