// import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { doc, updateDoc, getDoc, setDoc, collection } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

import { firebaseConfig } from '../config/firebase';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//TODO replace this from firebase
export async function createNewProfile(user) {
  console.log('creating new profile', user);
  const newProfile = {
    uid: user.uid,
    name: user.name ? user.name : 'NewUser',
    email: user.email,
    profilePic: user.profilePic
      ? user.profilePic
      : 'https://cdn.geekwire.com/wp-content/uploads/2012/02/nerd-bigstock_Extreme_Computer_Nerd_1520708.jpg',
    relaxMethods: [],
  };
  console.log('new profile', newProfile);
  // await setDoc(collection(db, 'profiles', user.uid), newProfile);
  await setDoc(doc(db, 'profiles', user.uid), newProfile);

  return newProfile;
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

export async function findProfile(user) {
  console.log('findProfile');
  const docRef = doc(db, 'profiles', user.uid);
  const res = await getDoc(docRef);
  console.log('res:', res.data());
  if (res.data()) {
    return res.data();
  } else {
    console.log('No such document!');
    return await createNewProfile(user);
  }
}
