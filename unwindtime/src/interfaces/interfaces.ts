import { DocumentData, QuerySnapshot } from 'firebase/firestore'

interface GeneralState {
    profile : State
}

interface State {
    value: Profile
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
    svg:string;
    transform: string
  }
  interface Location {
    lat: number | null;
    lng: number | null;
    latitude: number | null;
    longitude: number | null;
  }


  interface Chat  {
    text: string,
    profile: Profile,
    createdAt: number,
  };
  interface Props {
    chat: Chat
    relaxMethod: RelaxMethods
    onClickRelaxMethod: Function
    classColor: string
    unwind: DocumentData
    location: Location
    unwindID: string
  selectedUnwind: RelaxMethods
  handleTillTimeChange: Function
  handleFromTimeChange: Function
  fromUnwind: Date
  tillUnwind: Date
  unwinds: DocumentData[]
  }


  export { State, Profile, Chat, Props, RelaxMethods, Location, GeneralState }