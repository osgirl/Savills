import React, { Component } from 'react';
import Connect from '@stores';
import layout from './layout';
import { StatusBar } from 'react-native';

import _ from "lodash";

class FAQ extends layout {

    constructor(props) {
        super(props);
        this.state = {
            isModalSelectUnit: false
        }
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('transparent');
    }

}

export default Connect(FAQ);
