import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import IMG_FLASH from '@resources/image/splash_screen.png';

export default class extends Component {
  render() {
    return <ImageBackground source={IMG_FLASH} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }
}
