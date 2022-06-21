import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConnection';
import { Profile } from '../interfaces/interfaces';

export async function createNewUnwind(profile: Profile, unwind: Profile) {
  const unwindDoc = {
    createdAt: new Date(),
    ...unwind,
    createdBy: { profilePic: profile.profilePic, name: profile.name, uid: profile.uid },
    attachedUsers: [profile.uid],
    chat: [],
  };

  addDoc(collection(db, 'unwinds'), unwindDoc);
}

//TODO think of smart way to do this
export async function createNewUnwindChat(unwind: Profile, profile: Profile, message: string) {
  const unwindChatDoc = {
    createdAt: new Date(),
    ...unwind,
    createdBy: { profilePic: profile.profilePic, name: profile.name, uid: profile.uid },
  };


  addDoc(collection(db, 'unwindChat'), unwindChatDoc);
}
