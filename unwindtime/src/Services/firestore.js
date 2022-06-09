// import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { doc, updateDoc, getDoc, addDoc, collection } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

import { firebaseConfig } from '../config/firebase';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//TODO replace this from firebase
export async function createNewProfile(uid, name, email, profilePic, relaxMethods) {
  const newProfile = {
    uid,
    name,
    email,
    profilePic,
    relaxMethods,
  };
  await addDoc(collection(db, 'profiles'), newProfile);
}

export async function updateProfile(profile, favoRelaxMethods) {
  const favoMethodsSmall = favoRelaxMethods.map((method) => {
    return { id: method.id, name: method.name };
  });

  //Send update profile to firestore
  const docRef = doc(db, 'profiles', profile.uid);
  const res = await updateDoc(docRef, {
    name: profile.name,
    relaxMethods: favoMethodsSmall,
  });

  return res;
}

export async function findProfile(uid) {
  const docRef = doc(db, 'profiles', uid);
  const res = await getDoc(docRef);
  // console.log('User data:', res.data());
  return res.data();
}
