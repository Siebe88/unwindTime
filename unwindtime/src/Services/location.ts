export async function getLocation(): Promise<any | undefined> {
  console.log('getLocation');
  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
    return;
  } else {
    navigator.geolocation.getCurrentPosition((position) => {
      return { lat: position.coords.latitude, lng: position.coords.longitude };
    });
  }
}
