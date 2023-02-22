import { View, Text, Alert, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, Image, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import * as Location from 'expo-location';

const apiKey = 'b07ce6c8a93a606ff7222b11ce82d280';

const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&exclude=minutely&appid=${apiKey}`;

const Weather = () => {

    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

    const loadForecast = async () => {
        setRefreshing(true);
        // ask permission to access location
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
        }

        // get location
        let location = await Location.getCurrentPositionAsync({enablehighAccuracy: true});

        // fetches the weather data from the api
        const response = await fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
        
        // convert response to json
        const data = await response.json();

        // if no data found
        if(!response.ok) {
            Alert.alert('Error', 'something went wrong');
        }else{
            // set the data to forecast
            setForecast(data);
            console.log(forecast);
        }
        setRefreshing(false);
    }

    // useEffect(() => {
    //     loadForecast();
    // },[]);


    useEffect(() => {
        (async() => {
          let {status} = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission denied');
            return;
          }
    
          let loc = await Location.getCurrentPositionAsync({});
    
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
            setForecast(json);
            // setData(json);
            // console.log(location);
          })
          .catch((error) => {
            console.log(error);
          });
        })();
      }, []);

    if (!forecast) {
        return(
            <SafeAreaView style={styles.loading}>
                <ActivityIndicator size='large'/>
            </SafeAreaView>
        );
    }

    // get the current weather
    const current = forecast?.current?.weather[0];

    return (
    <SafeAreaView style={styles.container}>
        <ScrollView
            refreshControl={
                <RefreshControl

            refreshing={refreshing}
            onRefresh={() => loadForecast()}/>
            }
            style={{marginTop:50}}
        >
            <Text style={styles.title}>
                Current Weather
            </Text>
            <Text style={{alignItems: 'center', textAlign: 'center'}}>
                Your Location
            </Text>
            <View style={styles.current}>
                <Image
                    style={styles.largeicon}
                    source={{
                        uri: `http://openweathermap.org/img/wn/${current?.icon}@4x.png`
                    }}
                />
                <Text>
                    {Math.round(forecast?.current?.temp)}°C
                </Text>
                
            </View>

        </ScrollView>
    </SafeAreaView>
  )
}

export default Weather

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ecdbba',
        backgroundColor: '#fff',
    },  
    title: {
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        color: '#c84b31'
    },
    current: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    largeIcon: {
        width: 300,
        height: 250,
    },
})