import React, { Component } from 'react';
import { Animated, AppRegistry } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import Stores from '../../stores/store';
import * as Screens from '../../screens';

let stacks = {};
Object.keys(Screens).forEach(name => {
  stacks[name] = {
    screen: Screens[name]
  };
});

const Stack = createStackNavigator(stacks, {
  initialRouteName: 'Launcher',
  navigationOptions: ({ navigation }) => ({
    header: null,
    gesturesEnabled: false
  }),

  transitionConfig: () => ({
    transitionSpec: {
      duration: 250,
      timing: Animated.timing
    }
  })
});

class App extends Component {
  render() {
    return (
      <Provider store={Stores}>
        <Stack />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('com.savills.uat', () => App);
