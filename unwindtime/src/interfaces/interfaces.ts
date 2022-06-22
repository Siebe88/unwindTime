import { DocumentData, Timestamp } from "firebase/firestore";
import { ChangeEventHandler } from "react";

interface GeneralState {
  profile: State;
  favoRelaxMethods: RelaxMethods[];
  location: LocationState;
}

interface State {
  value: Profile;
}
interface LocationState {
  value: Location;
}

interface User {
  name: string;
  photoURL: string;
  email: string;
  uid: string;
  displayName: string;
}

interface Profile {
  uid?: string;
  name?: string;
  email?: string;
  profilePic?: string;
  relaxMethods?: string;
  token?: string;
}
interface RelaxMethods {
  id: number;
  name: string;
  svg: string;
  transform: string;
}
interface Location {
  lat: number;
  lng: number;
  latitude: number;
  longitude: number;
}

interface Chat {
  text: string;
  profile: Profile;
  createdAt: Timestamp ;
}
interface ChatProps {
  chat: Chat;
}

interface RelaxMethodProps {
  relaxMethod: RelaxMethods;
  onClickRelaxMethod: Function;
  classColor: string;
}

interface UnwindProps {
  unwind?: DocumentData;
  unwindID: string;
  location: Location;
}

interface UnwindFilterBoxProps {
  onClickRelaxMethod: Function;
  selectedUnwind: RelaxMethods;
  handleTillTimeChange: ChangeEventHandler<HTMLInputElement>;
  handleFromTimeChange: ChangeEventHandler<HTMLInputElement>;
  fromUnwind: Date;
  tillUnwind: Date;
}

interface UnwindsMapProps {
  unwinds: DocumentData[] | undefined;
  location: Location;
}

export {
  State,
  Profile,
  Chat,
  ChatProps,
  RelaxMethods,
  Location,
  LocationState,
  GeneralState,
  User,
  RelaxMethodProps,
  UnwindProps,
  UnwindFilterBoxProps,
  UnwindsMapProps,
};
