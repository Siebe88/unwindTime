// import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { doc, updateDoc, collection, query, where, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

import { firebaseConfig } from '../config/firebase';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function updateUser(profile, favoRelaxMethod) {
  const docRef = doc(db, 'users', profile.uid);

  // const userCol = db.collection('users');
  const res = await updateDoc(docRef, {
    name: profile.displayName,
    relaxMethods: favoRelaxMethod,
  });

  return res;
}
