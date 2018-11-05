import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import Stores from './src/stores/store';
import * as Screens from './src/screens';
import Resolution from './src/utils/resolution';
// YellowBox.ignoreWarnings([
//     'Warning: isMounted',
//     'Module RCTImageLoader',
//     'Module RNGoogleSignin'
// ])

let stacks = {};
Object.keys(Screens).forEach(name => {
  stacks[name] = {
    screen: Screens[name]
  };
});

const Stack = createStackNavigator(stacks, {
  initialRouteName: 'WorkOrder',
  navigationOptions: ({ navigation }) => ({
    header: null,
    gesturesEnabled: false
  }),
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0
    }
  })
});

// const DrawerNavigator = createDrawerNavigator({
// 	Events: {
// 		screen: Stack
// 	}
// }, {
// 		contentComponent: Screens.Drawer,
// 		drawerWidth: Resolution.scaleWidth(600),
// 		navigationOptions: {
// 			// drawerLockMode: 'locked-closed',
// 		}
// 	},
// );

export default class App extends Component {
  render() {
    return (
      <Provider store={Stores}>
        <Stack />
      </Provider>
    );
  }
}
