import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

import { firebaseConfig } from '../config/firebase';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createNewUnwind(profile, unwind) {
  const unwindDoc = {
    ...unwind,
    ...profile,
    createdAt: new Date(),
  };

  addDoc(collection(db, 'unwinds'), unwindDoc);
}
