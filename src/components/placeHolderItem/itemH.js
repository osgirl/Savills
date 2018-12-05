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

const { width, height } = Dimensions.get('window');

export default class extends Component {

    render() {
        return (
            ['', '', '', '', ''].map(
                (i, id) => <ItemHorizontal2 key={'H_' + id} onReady={false} bgColor={'#FFF'} animate="fade" />
            )

        );
    }
}
