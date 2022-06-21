import {  User } from 'firebase/auth';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConnection';
import {  Profile, RelaxOption } from '../../Interfaces';
//TODO replace this from firebase
export async function createNewProfile(user:User, profileName:string) {

  console.log(user, "userrrrrr")
  console.log(profileName, "profileName")
  const profilePic:string =
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

export async function updateProfile(profile:Profile, favoRelaxMethods:RelaxOption) {
  // const favoMethodsSmall = favoRelaxMethods.map((method) => {
  //   return { id: method.id, name: method.name };
  // });

  console.log(favoRelaxMethods, "favoRelaxMethods")

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
  console.log(user, "findProfile")
  // console.log('findProfile');
  const docRef = doc(db, 'profiles', user.uid);
  const res = await getDoc(docRef);
  // console.log('res:', res.data());
  if (res.data()) {
    return res.data();
  } else {
    console.log('No such document!');
    return await createNewProfile(user, "");
  }
}


// USER

  // {
  //   "uid": "VYHeMGBrsxaEpwGhzn0PoTIbtrG3",
  //   "email": "scainmauricio@gmail.com",
  //   "emailVerified": true,
  //   "displayName": "Mauricio Scain",
  //   "isAnonymous": false,
  //   "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GhrHYc3DzG87fFS9j49fTnG4IGZRtm4G1qZhQl34Qs=s96-c",
  //   "providerData": [
  //       {
  //           "providerId": "google.com",
  //           "uid": "102337610404586246254",
  //           "displayName": "Mauricio Scain",
  //           "email": "scainmauricio@gmail.com",
  //           "phoneNumber": null,
  //           "photoURL": "https://lh3.googleusercontent.com/a-/AOh14GhrHYc3DzG87fFS9j49fTnG4IGZRtm4G1qZhQl34Qs=s96-c"
  //       }
  //   ],
  //   "stsTokenManager": {
  //       "refreshToken": "AIwUaOkPRhH8rTJzmsA8AH40a4Wz3uOL3bi77_wnZRmu6XnDDLhKByQ3_GEjoBvUg-A6K50zmlFgXiH7X7EU9-mfl6hN_yrkzrz7NUbKtI369S2SUThtBGByOXyOkLUHwhHxRlaCOrmRjZHzq1aNLLrUa5zw9uBz70R--vvKE5NUn_dCkx3oN5m-3_KuJYU5HEqAM3fccZa8zgt9J2C0G2JIxl6mOyjhBFymgRwHuXoylSV7IMQhY5yd_joM3fPv0ys0gTjPKmIx8Axpk-BB8OnvIw3vBJPoyHo5h6IHNbRxAI3DgPuEcUgF_fkNJp0tS7S6vWeQsD95IzJ3Aqy8-Z_gtaRxBGb97Sf2H8VkmqGymnIidvPJIYrBRfr2_iqU3f5MMadakQ5jVq5YaILAVBHxPyi3XFxX_wuaI2jPKEsvUfGnHKoEH1c",
  //       "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5MGZiMWFlMDQ4YTU0OGZiNjgxYWQ2MDkyYjBiODY5ZWE0NjdhYzYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWF1cmljaW8gU2NhaW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2hySFljM0R6Rzg3ZkZTOWo0OWZUbkc0SUdaUnRtNEcxcVpoUWwzNFFzPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3Vud2luZC10aW1lIiwiYXVkIjoidW53aW5kLXRpbWUiLCJhdXRoX3RpbWUiOjE2NTUzOTExMTEsInVzZXJfaWQiOiJWWUhlTUdCcnN4YUVwd0doem4wUG9USWJ0ckczIiwic3ViIjoiVllIZU1HQnJzeGFFcHdHaHpuMFBvVElidHJHMyIsImlhdCI6MTY1NTUzODMzNCwiZXhwIjoxNjU1NTQxOTM0LCJlbWFpbCI6InNjYWlubWF1cmljaW9AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDIzMzc2MTA0MDQ1ODYyNDYyNTQiXSwiZW1haWwiOlsic2NhaW5tYXVyaWNpb0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.a1bFlgxopg-qWPADzfS4cNJlINMh-t3c97vGczaI8RVRyKqRskRbGmMxvbb8PZI0ivoEpKJEWNaUelKYPBudqrd2XxFCa1TEDZlEQpGaV8ZGyewuVL-Z7gZXwXYjtA9j4WRNCxAxkicJqolM8rmfN4k4r7ftvXgJwxjWuengRjMZwbAC1vW1S8ydBkroWbAqUaJbe-3wKIBIUVX7gu05Fo3b4E8Y9nhfFDpEDIkiUaXbTE18W21I_sks3fBwpLRRlxBP6iPhN-kG-IPp9hKmLzyksc1xdYT_1pu0C6py98l4fW_8KVMEaw1vB0QoeWP94VbCfYnDjJjLmML7tOprAA",
  //       "expirationTime": 1655541932996
  //   },
  //   "createdAt": "1655369334966",
  //   "lastLoginAt": "1655391111208",
  //   "apiKey": "AIzaSyCn9oU3LJO0xMzg_6ERlRphHGXyf982UmI",
  //   "appName": "[DEFAULT]"
