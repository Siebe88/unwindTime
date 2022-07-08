# Unwind-time - Remove yourself from the keyboard

A app that helped me understand all the possibilities of firebase.
The app itself let's you find people that need a break (a unwind) and want to do this with someone else.

You can check the app: https://unwind-time.web.app/dashboard

These are the main features of the app (and the necessary firebase services ):

- Authentication (both via google, email and facebook) (Firebase - authentication)
- Realtime chat (Firestore to store the messages and then using hooks to show the messages in realtime)
- Notifications (Messaging to send users based on a notification token)
- Maps (google maps API)
- The app is a PWA so you can install it on the pc and mobile phone

## Development

PictureThis was the solo project of Siebe Kylstra, and was refactored by the following people:

- Mauricio Scain
- Alex Price-Richards
- Halil C. Avşar
- Alicia Trujillo
- Tekraj Gurung

They transformed the project into typescript, made the CSS a lot nicer and added new features and tests (for which I am really grateful).

## Getting Started

To get up and running follow these steps

- Install the dependencies by running `npm install` in the client and socket server files of the project. </br>
- Start the web client with `npm run dev` </br>
- Start the server with `npm start` </br>
