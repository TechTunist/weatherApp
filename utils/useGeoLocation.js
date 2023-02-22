import { useState, useEffect } from "react";
import * as Location from 'expo-location';

export default function useGeoLocation(lat, lon) {
  const [latLon, setLatLon] = useState(null);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       setLatLon([position.coords.latitude, position.coords.longitude]);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }, []);


  useEffect(() => {
    (async() => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});

      setLatLon([loc.coords.latitude, loc.coords.longitude]);

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&appid=b07ce6c8a93a606ff7222b11ce82d280`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        // setLocation(json);
        // setData(json);
        // console.log(location);
      })
      .catch((error) => {
        console.log(error);
      });
    })();
  }, []);

  return latLon;
}
