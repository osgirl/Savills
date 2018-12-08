import React, { Component } from 'react';
import { Animated } from 'react-native';
import Connect from '@stores';
import layout from './layout';

import _ from 'lodash';

class Setting extends layout {
  constructor(props) {
    super(props);
    this.timeOut = null;
    let setting = this.props.app.getSetting;
    this.state = {
      isModalSelectUnit: false,
      scrollY: new Animated.Value(0),
      selectedItem: this.props.app.languegeLocal,
      dataSetting: {
        emailOne: setting[8].isSubscribed,
        emailTwo: setting[9].isSubscribed,
        emailThree: setting[10].isSubscribed,
        emailFour: setting[11].isSubscribed,
        emailFive: setting[12].isSubscribed,
        emailSix: setting[13].isSubscribed,
        emailSevent: setting[14].isSubscribed,
        one: setting[0].isSubscribed,
        two: setting[1].isSubscribed,
        three: setting[2].isSubscribed,
        four: setting[3].isSubscribed,
        five: setting[5].isSubscribed,
        six: setting[6].isSubscribed,
        sevent: setting[7].isSubscribed
      }
    };
  }

  _toggleModalLanguage() {
    this.setState({ isModalLanguage: !this.state.isModalLanguage });
  }
}

export default Connect(Setting);
