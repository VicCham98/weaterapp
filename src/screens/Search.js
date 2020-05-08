import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInput, Button, Card} from 'react-native-paper';

const Search = ({navigation}) => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const fetchCities = text => {
    setCity(text);
    fetch('https://autocomplete.wunderground.com/aq?query=' + text)
      .then(item => item.json())
      .then(cityData => {
        setCities(cityData.RESULTS.slice(0, 9));
    });
  };
  const btnClick = async () => {
    await AsyncStorage.setItem('newCity', city);
    navigation.navigate('Home', {city: city});
  };

  const listClick = async cityName => {
    setCity(cityName);
    await AsyncStorage.setItem('newCity', cityName);
    navigation.navigate('Home', {city: cityName});
  };
  return (
    <View style={{flex: 1}}>
      <Header name="Search screen" />
      <TextInput
        label="city name"
        theme={{colors: {primary: '#00aaff'}}}
        value={city}
        onChangeText={text => fetchCities(text)}
      />
      <Button
        icon="content-save"
        mode="contained"
        theme={{colors: {primary: '#00aaff'}}}
        style={{margin: 20}}
        onPress={() => btnClick()}>
        <Text style={{color: 'white'}}>Press me</Text>
      </Button>
      <FlatList
        data={cities}
        renderItem={({item}) => {
          return (
            <Card
              style={{margin: 2, padding: 12}}
              onPress={() => listClick(item.name)}>
              <Text>{item.name}</Text>
            </Card>
          )
        }}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Search;
