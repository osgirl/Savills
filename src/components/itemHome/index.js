"use strict";

import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image,
    Text
} from "react-native";

import Resolution from "@utils/resolution";
import Utils from "../../utils";
import Configs from "../../utils/configs";
export default class ItemHome extends Component {

    render() {
        return (
            <View style={[Styles.container, { ...Configs.Shadow }]}>
                <Image source={Utils.mapItemHome(this.props.image)} />
                <Text style={{ color: '#505E75', fontSize: 12, marginTop: 10, fontFamily: 'OpenSans-Bold' }}>{this.props.title}</Text>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: Resolution.scaleWidth(157),
        height: Resolution.scaleHeight(157),
        backgroundColor: '#FFFFFF',
        margin: 10,

        // shadowColor: '#4A89E8',
        // shadowOpacity: 0.2,
        // shadowOffset: { width: 0, height: 3, },
        // shadowRadius: 1,
        // elevation: 2
    }
})
