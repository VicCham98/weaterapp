import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Appbar, Title} from 'react-native-paper';

const Header = ({name}) => {
  return (
    <Appbar.Header theme={{
        colors: {
          primary: '#00aaff',
        },
      }}
      style={{flexDirection: 'row', justifyContent: 'center'}}>
      <Title style={{color: 'white'}}>{name}</Title>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({});

export default Header;
