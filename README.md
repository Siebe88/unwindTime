# Unwind-time - Remove yourself from the keyboard

A app that helped me understand all the possibilities of firebase.
The app itself let's you find people that need a break (a unwind) and want to do this with someone else.

These are the main features of the app (and the necessary firebase services ):

- Authentication (both via google, email and facebook) (Firebase - authentication)
- Realtime chat (Firestore to store the messages and then using hooks to show the messages in realtime)
- Notifications (Messaging to send users based on a notification token)
- Maps (google maps API)

I used the following services

## Development

PictureThis was the solo project of Siebe Kylstra, and was refactored by Mauricio Scain & Alex Price-Richards into typescript

## Getting Started

To get up and running follow these steps

- Install the dependencies by running `npm install` in the client and socket server files of the project. </br>
- Start the web client with `npm run dev` </br>
- Start the server with `npm start` </br>
