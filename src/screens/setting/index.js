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
    console.log('adskajdslajsdlkasdasda',setting)
    this.state = {
      isModalSelectUnit: false,
      scrollY: new Animated.Value(0),
      selectedItem: this.props.app.languegeLocal,
      dataSetting: {
        emailFee: setting[9].isSubscribed,
        emailWorkOrder: setting[10].isSubscribed,
        emailBooking: setting[11].isSubscribed,
        emailEvent: setting[12].isSubscribed,
        emailFeedback: setting[13].isSubscribed,
        emailCommunication: setting[14].isSubscribed,
        emailDelivery: setting[15].isSubscribed,
        emailInbox: setting[16].isSubscribed,

        // notification
        fee: setting[0].isSubscribed,
        workOrder: setting[1].isSubscribed,
        booking: setting[2].isSubscribed,
        event: setting[3].isSubscribed,
        feedback: setting[5].isSubscribed,
        communication: setting[6].isSubscribed,
        delivery: setting[7].isSubscribed,
        inbox: setting[8].isSubscribed
      }
    };
  }

  _toggleModalLanguage() {
    this.setState({ isModalLanguage: !this.state.isModalLanguage });
  }
}

export default Connect(Setting);
