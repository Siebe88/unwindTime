import {  User } from 'firebase/auth';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConnection';
import {  Profile, RelaxOption } from '../../Interfaces';
//TODO replace this from firebase
export async function createNewProfile(user:User, profileName:string) {


  const profilePic:string =
    user.photoURL ||
    'https://cdn.geekwire.com/wp-content/uploads/2012/02/nerd-bigstock_Extreme_Computer_Nerd_1520708.jpg';

  const name = profileName || user.displayName || 'NewUser';

  //BUG Not altering profile pic

  const newProfile = {
    uid: user.uid,
    name: name,
    email: user.email,
    profilePic: profilePic,
    relaxMethods: [],
  };

  await setDoc(doc(db, 'profiles', user.uid), newProfile);

  return newProfile;
}

export async function updateProfile(profile:Profile, favoRelaxMethods:RelaxOption) {

  //Send update profile to firestore
  const docRef = doc(db, 'profiles', profile.uid as string);
  const res = await updateDoc(docRef, {
    name: profile.name,
    profilePic: profile.profilePic,
    relaxMethods: favoRelaxMethods,
  });

  return res;
}

export async function findProfile(user:User )  {


  const docRef = doc(db, 'profiles', user.uid);
  const res = await getDoc(docRef);

  if (res.data()) {
    return res.data();
  } else {

    return await createNewProfile(user, "");
  }
}

