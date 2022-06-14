const functions = require('firebase-functions');
const { initializeApp } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');

const { Firestore } = require('@google-cloud/firestore');
// Create a new client
const firestore = new Firestore();

const app = initializeApp();

exports.sendHttpPushNotificationMultiple = functions.https.onRequest(async (req, res) => {
  // const userId = req.body.userId; //userId is the id of the user
  const unwindID = req.body.unwindID;
  const chat = req.body.chat;
  const document = firestore.doc('unwinds/' + unwindID);

  const doc = await document.get();
  console.log('Document data:', doc);
  const unwind = doc.data();

  const registrationTokens = unwind.registrationTokens;

  const message = {
    notification: {
      title: `${unwind.createdBy.name}: ${unwind.relaxMethod.name} unwind`,
      body: `${chat.profile.name}: ${chat.text}`,
    },

    tokens: registrationTokens,
  };

  getMessaging()
    .sendMulticast(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
      res.send('Successfully sent message: ' + response);
    })
    .catch(
      (error) => {
        console.log('Error sending message:', error);
        res.send('Error sending message: ' + error);
      } // Error is an FCM error code.
    );
});
