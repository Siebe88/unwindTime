import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const centers = [
  {
    lat: 37.772,
    lng: -122.214,
  },
  {
    lat: 37.672,
    lng: -122.219,
  },
  {
    lat: 37.832,
    lng: -122.424,
  },
];

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
              // key={unwind.id}
              icon={{
                path: unwind.relaxMethod.svg,
                fillColor: 'grey',
                fillOpacity: 0.9,
                scale: 1,
                strokeColor: 'grey',
                strokeWeight: 1,
              }}
              position={unwind.location}
            ></Marker>
          ))}
        </div>
      )}
    </GoogleMap>
  ) : (
    <h1>Loading</h1>
  );
}

export default React.memo(UnwindsMap);
