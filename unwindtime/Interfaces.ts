interface Props{
  chat: Chat;
  location: LocationValue;
  unwindID: string;
  // unwind:UnwindType;
  relaxMethod: RelaxOption;
  classColor: string;
  onClickRelaxMethod: Function;
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


interface GoogleLocation{
  lat: google.maps.LatLng;
  lng:  google.maps.LatLng;
  latitude:  google.maps.LatLng;
  longitude: google.maps.LatLng;

}

interface Chat {
  text: string;
  profile: Profile;
  createdAt: Date;
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





export {Props, Chat, State, LocationValue, Unwinds, UnwindType, RelaxOption, EventHandler, requestOptions}