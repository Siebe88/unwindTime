// import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

import { firebaseConfig } from '../config/firebase';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function updateUser(profile, favoRelaxMethods) {
  const favoMethodsSmall = favoRelaxMethods.map((method) => {
    return { id: method.id, name: method.name };
  });

  //Send update profile to firestore
  const docRef = doc(db, 'users', profile.uid);
  const res = await updateDoc(docRef, {
    name: profile.displayName,
    relaxMethods: favoMethodsSmall,
  });

  return res;
}
