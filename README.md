# Unwind-time - Remove yourself from the keyboard

A app that helped me understand all the possibilities of firebase.
The app itself let's you find people that need a break (a unwind) and want to do this with someone else.

You can check the app: https://unwind-time.web.app

These are the main features of the app (and the necessary firebase services ):

- Authentication (both via google, email and facebook) (Firebase - authentication)
- Realtime chat (Firestore to store the messages and then using hooks to show the messages in realtime)
- Notifications (Messaging to send users based on a notification token)
- Maps (google maps API)
- The app is a PWA so you can install it on the pc and mobile phone

## Development

UnwindTime started as the solo project of Siebe Kylstra, and was refactored by the following people:

- Mauricio Scain
- Alex Price-Richards
- Halil C. Avşar
- Alicia Trujillo
- Tekraj Gurung

They transformed the project into typescript, made the CSS a lot nicer and added new features and tests (for which I am really grateful).

# Getting Started with Unwind

## Firebase Setup

1. Go to Firebase console at https://firebase.google.com and create a new project.\
2. In the project overview, add a web app.\
3. Create a .env file and fill it with your Firebase keys.\
4. Setup authentication on Firebase, enabling email/password and Google as providers.\
5. Setup Firestore database.\
6. Create a folder in the Storage with the name 'profilePics'. Under Rules, set ' read , write ' to true.

## Google Map Setup

Get a Google API key and add it to the .env file.

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all dependencies or devDependencies from a package. json file to run the project.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches Cypress end-to-end testing.
