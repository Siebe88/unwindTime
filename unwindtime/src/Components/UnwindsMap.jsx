import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

import Unwind from './Unwind';

const containerStyle = {
  width: '100%',
  height: '100%',
};

function UnwindsMap({ location, unwinds }) {
  console.log(unwinds);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCez882QWlP85wQRNooAi0llw1ymzL96zI',
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(location);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {unwinds && (
        <div>
          {unwinds.map((unwind) => (
            <Marker
              key={unwind.id}
              icon={{
                path: unwind.data().relaxMethod.svg,
                fillColor: 'grey',
                fillOpacity: 0.9,
                scale: 1,
                strokeColor: 'grey',
                strokeWeight: 1,
              }}
              position={location}
            ></Marker>
          ))}
        </div>
      )}

      {/* {unwinds && (
        <div>
          {unwinds.map((unwind) => (
            <InfoWindow position={location} key="3">
              <Unwind
                key={unwind.id}
                unwind={unwind.data()}
                unwindID={unwind.id}
                location={location}
              ></Unwind>
            </InfoWindow>
          ))}
        </div>
      )} */}

      <InfoWindow position={location} key="3">
        <div>
          <h1>InfoWindow2</h1>
        </div>
      </InfoWindow>
    </GoogleMap>
  ) : (
    <h1>Loading</h1>
  );
}

export default React.memo(UnwindsMap);
