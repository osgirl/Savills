import React, { Component } from 'react';
import { Animated } from 'react-native';
import Connect from '@stores';
import Layout from './layout';

class Contacts extends Layout {

    constructor(props) {
        super(props);
        this.state = {
            isModalSelectUnit: false,
            scrollY: new Animated.Value(0),
        }
    }
}

export default Connect(Contacts);

