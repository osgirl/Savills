"use strict";

import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions
} from "react-native";

import Resolution from "@utils/resolution";
import Utils from "../../utils";
import Configs from "../../utils/configs";
import Button from "../button";
import IC_DEFAULT from "@resources/icons/default.png";

import { ItemHome } from "../../components/placeHolder";

const { width, height } = Dimensions.get('window');

export default class ItemHomeComponent extends Component {

    render() {
        return (
            <View style={[Styles.container, { ...Configs.Shadow }]}>
                <ItemHome
                    txtWidth={70}
                    onReady={this.props.loading}
                    bgColor={'#FFF'}
                    animate='fade'>
                    <Button
                        onPress={() => this.props.onPressItem()}
                        style={[Styles.container,]}>
                        <Image source={Utils.mapItemHome(this.props.image)} />
                        <Text style={{ color: '#505E75', fontSize: 12, marginTop: Resolution.scaleHeight(10), fontFamily: 'OpenSans-Bold' }}>{this.props.title}</Text>
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
        width: (width - 60) / 2,
        height: (width - 60) / 2,
        backgroundColor: '#FFFFFF',
        margin: 10
    }
})
