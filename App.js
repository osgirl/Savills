import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import Stores from './src/stores/store';
import * as Screens from './src/screens';
import Resolution from './src/utils/resolution';
let stacks = {};
Object.keys(Screens).forEach(name => {
  stacks[name] = {
    screen: Screens[name]
  };
});

const Stack = createStackNavigator(stacks, {
  // initialRouteName: 'Test',
  initialRouteName: 'Launcher',
  navigationOptions: ({ navigation }) => ({
    header: null,
    gesturesEnabled: false
  }),

  transitionConfig: () => ({
    transitionSpec: {
      duration: 250,
      timing: Animated.timing,
      // easing: Easing.step0
    }
  })
});

export default class App extends Component {
  render() {
    return (
      <Provider store={Stores}>
        <Stack />
      </Provider>
    );
  }
}
