"use strict";

import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image,
    Text
} from "react-native";

import Resolution from "@utils/resolution";
import Button from "../button";
import Configs from "../../utils/configs";
import IC_DEFAULT from "@resources/icons/default.png";

import { ItemHome } from "../../components/placeHolder";

export default class ItemProjectApartment extends Component {

    render() {
        return (
            <View style={[Styles.container, { ...Configs.Shadow }]}>
                <ItemHome
                    txtWidth={70}
                    onReady={this.props.loading}
                    bgColor={'#FFF'}
                    animate='fade'>
                    <Button
                        onPress={this.props.onPressItem}
                        style={[Styles.container, { ...Configs.Shadow }]}>
                        <Image source={typeof this.props.image === 'number' ? this.props.image : { uri: this.props.image }} style={{ width: Resolution.scaleWidth(30), height: Resolution.scaleHeight(30) }} />
                        <Text style={{ color: '#505E75', fontSize: 12, marginTop: 10, fontFamily: 'OpenSans-Bold' }}>{this.props.title}</Text>
                    </Button>
                </ItemHome>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 136,
        height: 136,
        backgroundColor: '#FFFFFF',
    }
})
