"use strict";

import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image,
    Text
} from "react-native";

import Resolution from "@utils/resolution";
export default class ItemProjectApartment extends Component {

    render() {
        const item = this.props.item;
        return (
            <View style={Styles.container}>
                <Image source={this.props.image} />
                <Text style={{ color: '#505E75', fontSize: 12, marginTop: 10, fontFamily: 'OpenSans-Bold' }}>{item.title}</Text>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: Resolution.scaleWidth(136),
        height: Resolution.scaleHeight(136),
        backgroundColor: '#FFFFFF',

        shadowColor: '#4A89E8',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3, },
        shadowRadius: 1,
        elevation: 2
    }
})
