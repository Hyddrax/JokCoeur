import React from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

//For React Navigation 4+
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './pages/HomeScreen';
import SettingsScreen from './pages/SettingsScreen';
import JournalScreen from './pages/JournalScreen';
import StatScreen from './pages/StatScreen'
import ConnectScreen from './pages/ConnectScreen'

const JournalStack = createStackNavigator(
  {
    //Defination of Navigaton from home screen
    // Home: { screen: HomeScreen },
    Journal: { screen: JournalScreen },
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#800080',
      },
      headerTintColor: '#FFFFFF',
      title: 'Journal',
      //Header title
    },
  }
);

const StatStack = createStackNavigator(
  {
    //Defination of Navigaton from Stat screen
    Stat: { screen: StatScreen },
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#800080',
      },
      headerTintColor: '#FFFFFF',
      title: 'Stats',
      //Header title
    },
  }
);


const SettingsStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    Settings: { screen: SettingsScreen },
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#800080',
      },
      headerTintColor: '#FFFFFF',
      title: 'Settings',
      //Header title
    },
  }
);

const ConnectStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    Connect: { screen: ConnectScreen },
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#800080',
      },
      headerTintColor: '#FFFFFF',
      title: 'Login',
      //Header title
    },
  }
);

const MainTabNavigator = createBottomTabNavigator(
  {

    Journal: { screen: JournalStack },
    Stat: { screen: StatStack },
    Settings: { screen: SettingsStack },

  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Journal') {
          iconName = "ios-book";
        } else if (routeName === 'Settings') {
          iconName = "ios-settings";
        } else if (routeName === 'Stat') {
          iconName = "ios-stats";
        }
        //${focused ? '' : '-outline'}`
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: "#800080",
      inactiveTintColor: 'gray',
    },
  }
);

const App = createStackNavigator(
  {
    Connect: { screen: ConnectStack },
    Main: {
      screen: MainTabNavigator
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
    initialRouteName: 'Connect',
  }
);

export default createAppContainer(App);