import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConnection';

//TODO replace this from firebase
export async function createNewProfile(user, profileName) {
  const profilePic =
    user.photoURL ||
    'https://cdn.geekwire.com/wp-content/uploads/2012/02/nerd-bigstock_Extreme_Computer_Nerd_1520708.jpg';

  const name = user.name || profileName || user.displayName || 'NewUser';

  console.log('creating new profile', user);
  const newProfile = {
    uid: user.uid,
    name: name,
    email: user.email,
    profilePic: profilePic,
    relaxMethods: [],
  };
  console.log('new profile', newProfile);
  await setDoc(doc(db, 'profiles', user.uid), newProfile);

  return newProfile;
}

export async function updateProfile(profile, favoRelaxMethods) {
  // const favoMethodsSmall = favoRelaxMethods.map((method) => {
  //   return { id: method.id, name: method.name };
  // });

  //Send update profile to firestore
  const docRef = doc(db, 'profiles', profile.uid);
  const res = await updateDoc(docRef, {
    name: profile.name,
    relaxMethods: favoRelaxMethods,
  });

  return res;
}

export async function findProfile(user) {
  // console.log('findProfile');
  const docRef = doc(db, 'profiles', user.uid);
  const res = await getDoc(docRef);
  // console.log('res:', res.data());
  if (res.data()) {
    return res.data();
  } else {
    console.log('No such document!');
    return await createNewProfile(user);
  }
}
