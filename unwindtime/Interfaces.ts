import { DocumentData,  QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { ChangeEventHandler } from "react";

interface Props{
  chat?: Chat;
  location?: LocationValue;
  unwindID?: string;
  key?: number | string;
  unwind?: DocumentData | undefined;
  relaxMethod?: RelaxOption;
  classColor?: string;
  onClickRelaxMethod?: Function;
  unwinds?: QueryDocumentSnapshot<DocumentData>[];
  selectedUnwind?:DocumentData;
  handleTillTimeChange?: ChangeEventHandler<HTMLInputElement>;
  handleFromTimeChange?: ChangeEventHandler<HTMLInputElement>;
  fromUnwind?:Date;
  tillUnwind?:Date;
}



interface requestOptions {
  method: string;
  headers: Headers;
  body: string;
  redirect: RequestRedirect;
};


interface EventHandler {
  target: HTMLInputElement;
  preventDefault: Function;
}

interface Unwinds{
  id: string;
  data(): any;
}



interface UnwindType{
  attachedUsers: [];
  chat: [];
  createdAt: number;
  createdBy: Profile;
  from: number;
  location: LocationValue;
  relaxMethod: RelaxOption;
  till: number;
}



interface Chat {
  text: string;
  profile: Profile;
  createdAt: any;
};

interface NewChat {
  text: string;
  profile: Profile;
  createdAt: Date;
};


interface StateProfile {
  value: Profile;

}

interface FirebaseRH {
  metadata: any;
  _document: any
  _firestore: any;
  _firestoreImpl: any;
  _key: any;
  _userDataWrite: any
  id: string;

}


interface State{
    favoRelaxMethods: RelaxOption[];
    location: Location;
    profile: StateProfile;
}

interface LocationValue {
  lat?: string;
  lng?: string;
  latitude?: string;
  longitude?: string;
}

interface Location {
  value: LocationValue;
}

interface Profile {
  profilePic?: string;
  name?: string;
  uid?: string;
  email?: string;
  relaxMethods?: RelaxOption[];
  token?: string;
}


interface RelaxOption {
  id: number;
  name: string;
  svg: string;
  transform: string;
}





export {Profile, StateProfile,  Props,NewChat, FirebaseRH, Chat, State, LocationValue, Location, Unwinds, UnwindType, RelaxOption, EventHandler, requestOptions}