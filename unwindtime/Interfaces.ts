interface Props{
  chat: Chat;
  location: LocationValue;
  unwinds: Unwinds[];
  unwindID: String;
  unwind:UnwindType;
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


interface GoogleLocation{
  lat: google.maps.LatLng;
  lng:  google.maps.LatLng;
  latitude:  google.maps.LatLng;
  longitude: google.maps.LatLng;

}

interface Chat {
  text: string;
  profile: Profile;
  createdAt: number;
};


interface StateProfile {
  value: Profile;

}

interface State{
    favoRelaxMethods: RelaxOption[];
    location: Location;
    profile: StateProfile;
}

interface LocationValue {
  lat: string;
  lng: string;
  latitude: string;
  longitude: string;
}

interface Location {
  value: LocationValue;
}

interface Profile {
  profilePic: string;
  name: string;
  uid: string;
  email: string;
  relaxMethods: RelaxOption[];
  token: string;
}


interface RelaxOption {
  id: number;
  name: string;
  svg: string;
  transform: string;
}



export {Props, State, LocationValue, Unwinds, UnwindType}