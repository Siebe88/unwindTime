import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  FacebookAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
} from 'firebase/firestore';
import { firebaseConfig } from '../config/firebase';
import { createNewProfile } from './firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'profiles'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, 'profiles', user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
        profilePic: user.photoURL,
        relaxMethods: [],
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, FacebookAuthProvider);
    const user = res.user;
    const q = query(collection(db, 'profiles'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'profiles'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'facebook',
        email: user.email,
        profilePic: user.photoURL,
        relaxMethods: [],
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await createNewProfile(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithFacebook,
  sendPasswordReset,
  logout,
};
