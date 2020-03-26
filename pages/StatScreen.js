import React from 'react';
import { Text, View, StyleSheet, Image, SVGAElement } from 'react-native';
import Constants from 'expo-constants';
import SVG from '../components/SVG'

export default class StatScreen extends React.Component {

  static navigationOptions = {
    title: "Statistique",
  };

  render() {
    return (
      <View style={style.container}>
        <SVG style={{ backgroundColor: 'grey' }}>
        </SVG>
      </View>
    );
  }
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
    flexDirection: 'column',
  },

});
