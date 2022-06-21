import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConnection';
import { User } from "firebase/auth"
import { Profile, RelaxMethods } from '../interfaces/interfaces';

//TODO replace this from firebase
export async function createNewProfile(user: User , profileName?: string) {

  const profilePic =
    user.photoURL ||
    'https://cdn.geekwire.com/wp-content/uploads/2012/02/nerd-bigstock_Extreme_Computer_Nerd_1520708.jpg';

  const name = profileName || user.displayName || 'NewUser';

  //BUG Not altering profile pic
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

export async function updateProfile(profile: Profile, favoRelaxMethods: RelaxMethods[]) {
  // const favoMethodsSmall = favoRelaxMethods.map((method) => {
  //   return { id: method.id, name: method.name };
  // });

  //Send update profile to firestore
  const docRef = doc(db, 'profiles', profile.uid as string);
  const res = await updateDoc(docRef, {
    name: profile.name,
    profilePic: profile.profilePic,
    relaxMethods: favoRelaxMethods,
  });

  return res;
}

export async function findProfile(user: User) {
  // console.log('findProfile');
  const docRef = doc(db, 'profiles', user.uid);
  const res = await getDoc(docRef);
  // console.log('res:', res.data());
  if (res.data()) {
    return res.data();
  } else {
    console.log('No such document!');
    return await createNewProfile(user, 'NewUser');
  }
}
