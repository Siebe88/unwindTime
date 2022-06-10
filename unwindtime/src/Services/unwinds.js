import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConnection';

export async function createNewUnwind(profile, unwind) {
  const unwindDoc = {
    ...unwind,
    ...profile,
    createdAt: new Date(),
  };

  addDoc(collection(db, 'unwinds'), unwindDoc);
}
