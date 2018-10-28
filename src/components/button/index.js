'use strict';

import React, { Component } from 'react';
import {
    TouchableOpacity
} from 'react-native';

export default class ButtonLogin extends Component {

    constructor(props) {
        super(props);
        this.click = true;
    }

    render() {
        return (
            <TouchableOpacity
                {...this.props}
                activeOpacity={this.props.activeOpacity || 0.8}
                onPress={() => this.onPress()}
            >

            </TouchableOpacity>
        );
    }

    onPress() {
        if (this.click) {
            this.props.onPress();
        }
        setTimeout(() => {
            this.click = true;
        }, 1000);
        this.click = false;
    }

    componentWillUnmount() {
        this.click = false;
    }

}

