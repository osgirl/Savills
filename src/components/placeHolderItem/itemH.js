"use strict";

import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions
} from "react-native";

import { ItemHorizontal2 } from "../placeHolder";
import Resolution from "../../utils/resolution";
const { width, height } = Dimensions.get('window');

export default class extends Component {

    render() {
        return (
            <View style={{ marginTop: this.props.noMargin ? Resolution.scale(10) : Resolution.scale(40) }}>
                {
                    ['1', '2', '3', '4', '5'].map(
                        (item) => <ItemHorizontal2 key={'H_' + item}
                            onReady={false}
                            bgColor={'#FFF'}
                            animate="fade"
                        />
                    )
                }
            </View>

        );
    }
}
