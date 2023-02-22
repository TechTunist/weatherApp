import React from "react";
import { Button, StyleSheet, View, Text} from 'react-native';
import useWeather from "./utils/useWeather";
import Loading from "./components/Loading";
import Weather from "./components/Weather";
import { Container } from "./components/Styles";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function HomeScreen({navigation}) {
  return (
    <View>
      <Text style={styles.container}>
        Home Screen
      </Text>
      <Button
        title='To the details'
        onPress={() => navigation.navigate('Details')}/>
    </View>
  )
}

function DetailsScreen() {
  return (
    <View>
      <Text style={styles.container}>
        Details Screen
      </Text>
    </View>
  )
}

function LocalWeatherScreen() {
  const weather = useWeather();
  return (
    <Container>
      {!weather ? <Loading /> : <Weather forecast={weather} />}
    </Container>
  )
}


export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='Details' component={DetailsScreen}/> */}
        <Stack.Screen name='LocalWeather' component={LocalWeatherScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  }
})
