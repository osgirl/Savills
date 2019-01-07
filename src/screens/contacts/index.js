import React, { Component } from 'react';
import { Animated, Platform } from 'react-native';
import Connect from '@stores';
import Layout from './layout';

import Resolution from '@utils/resolution';

const HEADER_MAX_HEIGHT = Resolution.scale(60);

class Contacts extends Layout {
  constructor(props) {
    super(props);
    this.state = {
      isModalSelectUnit: false,
      scrollY: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0)
    };
  }
}

export default Connect(Contacts);
