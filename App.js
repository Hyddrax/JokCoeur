import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

//For React Navigation 4+
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SettingsScreen from './pages/App/Setting/SettingsScreen';
import JournalScreen from './pages/App/Journal/JournalScreen';
import StatScreen from './pages/App/Stats/StatScreen'
import LoginScreen from './pages/Connect/LoginScreen'
import RegisterScreen from './pages/Connect/RegisterScreen'
import AboutScreen from './pages/App/Setting/AboutScreen';
import MyAccountScreen from './pages/App/Setting/MyAccountScreen';
import ContactScreen from './pages/App/Setting/ContactScreen';

const JournalStack = createStackNavigator(
  {
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
    About: { screen: AboutScreen },
    MyAccount: { screen: MyAccountScreen },
    Contact: { screen: ContactScreen }
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
    initialRouteName: 'Settings',

  }
);

const ConnectStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    SignIn: { screen: LoginScreen },
    SignUp: { screen: RegisterScreen },
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#800080',
      },
      headerTintColor: '#FFFFFF',
      title: 'SignIn',
      //Header title
    },
    initialRouteName: 'SignIn',
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