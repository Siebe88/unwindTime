import React from "react";
import Unwind from "./Unwind";
import { GoogleMap, useJsApiLoader, InfoWindow } from "@react-google-maps/api"; //eslint-disable-line

import { Props } from "../../Interfaces";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function UnwindsMap(props: Props) {
  const { location } = props;
  const { unwinds } = props;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCez882QWlP85wQRNooAi0llw1ymzL96zI",
  });

  return isLoaded && location ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      id="41684020cb892eae"
      center={location as unknown as google.maps.LatLng}
      zoom={14}
    >
      {unwinds && (
        <div>
          {unwinds.map((unwind) => {
            return (
              <InfoWindow
                position={location as unknown as google.maps.LatLng}
                key={unwind.id}
              >
                <Unwind
                  key={unwind.id}
                  unwind={unwind.data()}
                  unwindID={unwind.id}
                  location={location}
                ></Unwind>
              </InfoWindow>
            );
          })}
        </div>
      )}
    </GoogleMap>
  ) : (
    <h1>Loading</h1>
  );
}

export default React.memo(UnwindsMap);
