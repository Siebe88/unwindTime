export async function getLocation() {
  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
  } else {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        return { lat: position.coords.latitude, lng: position.coords.longitude };
      },
      () => {
        console.log('Unable to retrieve your location');
      }
    );
  }
}
