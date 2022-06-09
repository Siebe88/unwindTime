import { getFirestore } from 'firebase/firestore';
import { doc, collection, updateDoc, getDoc, setDoc, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

import { firebaseConfig } from '../config/firebase';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createNewUnwind(profile, unwind) {
  const unwindDoc = {
    ...unwind,
    profileId: profile.uid,
    createdAt: new Date(),
  };
  // const res = await setDoc(doc(db, 'unwinds', profile.uid), unwindDoc);

  const docRef = await addDoc(collection(db, 'unwinds'), unwindDoc);
  console.log('unwindDoc', unwindDoc);
  return docRef;
}
