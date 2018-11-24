import React, { Component } from 'react';
import {
    Animated
} from 'react-native';
import Connect from '@stores';
import layout from './layout';

import _ from "lodash";

class Setting extends layout {

    constructor(props) {
        super(props);
        this.state = {
            isModalSelectUnit: false,
            scrollY: new Animated.Value(0),
            selectedItem: this.props.app.languegeLocal,
        }
    }

    _toggleModalLanguage() {
        this.setState({ isModalLanguage: !this.state.isModalLanguage })
    }

}

export default Connect(Setting);
