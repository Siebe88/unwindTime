import { DocumentData } from "firebase/firestore";

interface GeneralState {
  profile: State;
  favoRelaxMethods: RelaxMethods[];
  location: 
}

interface State {
  value: Profile;
}
interface LocationState {
    value: Location
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
  lat: number  ;
  lng: number ;
  latitude: number ;
  longitude: number ;
}

interface Chat {
  text: string;
  profile: Profile;
  createdAt: number;
}
interface Props {
  chat?: Chat;
  relaxMethod?: RelaxMethods;
  onClickRelaxMethod?: Function;
  classColor?: string;
  unwind?: DocumentData;
  location?: Location;
  unwindID?: string;
  selectedUnwind?: RelaxMethods;
  handleTillTimeChange?: Function;
  handleFromTimeChange?: Function;
  fromUnwind?: Date;
  tillUnwind?: Date;
  unwinds?: DocumentData[];
}

export { State, Profile, Chat, Props, RelaxMethods, Location, LocationState, GeneralState, User };
