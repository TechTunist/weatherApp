import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
import React, {useState, useCallback} from 'react';
import axios from 'axios';


export default function searchWeather() {

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const api = 'b07ce6c8a93a606ff7222b11ce82d280';

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api}`
    })
    .then(res => {
      console.log(res.data);
      setData(res.data);
    })
    .catch(e => console.dir(e))
    .finally(() => setLoading(false));
  }, [input, api]);

  console.log(data);
  console.log(input);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Android-rain.jpg')}
        resizeMode="cover"
        style={styles.image}>
      <TextInput
        placeholder='Enter location'
        onChangeText={text => setInput(text)}
        value={input}
        placeholderTextColor={'#000'}
        style={styles.textInput}
        onSubmitEditing={fetchDataHandler}
      />
      {loading && (
      <View>
        <ActivityIndicator
          size={'large'}
          color={'black'}
        />
      </View>
      )}
      {data && (
        <View style={styles.infoView}>
          <Text style={styles.cityCountryText}>
            {`${data?.name}, ${data?.sys?.country}`}
          </Text>
          <Text style={styles.cityCountryText}>
            {`${Math.round((data?.main?.temp - 273.15) * 10) / 10}°C`}
          </Text>
          <Image
            source={{
              uri:`http://openweathermap.org/img/wn/${data?.weather[0].icon}.png`
            }}
            style={{width: 100, height: 100}}
          />
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString()}
          </Text>
        </View>
        )}
      <StatusBar style="auto" />
      
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    padding: 5,
    paddingVertical: 13,
    marginVertical: 100,
    marginHorizontal: 15, 
    backgroundColor: '#fff',
    fontsize: 22,
    borderRadius: 16,
  },
  weather: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoView: {
    alignItems: 'center',
  },
  cityCountryText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 45,
    color: '#fff',
    marginVertical: 10
  },
  minMaxText: {
    fontSize: 32,
    color: '#fff',
    marginVertical: 10,
    fontWeight: 500
  }
});
