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
import IC_DEFAULT from "@resources/icons/default.png";

const { width } = Dimensions.get('window');

export default class ItemListHome extends Component {

    render() {
        return (
            <View style={[Styles.container, { ...Configs.Shadow }]}>
                {
                    this.props.loading ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={Utils.mapItemHomeCircle(this.props.image)} style={{ marginHorizontal: 20, marginVertical: 10 }} />
                                <Text style={{ color: '#505E75', fontSize: 12, fontFamily: 'OpenSans-Bold' }}>{this.props.title}</Text>
                            </View>
                            <View style={{ marginHorizontal: 20, justifyContent: 'center' }}>
                                <View style={{ backgroundColor: '#FF361A', borderRadius: 20 }}>
                                    <Text style={{ color: '#FFFFFF', padding: 5 }}>9+</Text>
                                </View>
                            </View>
                        </View>
                        :
                        <Image source={IC_DEFAULT} />
                }

            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        width: width - 40,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginVertical: 5
    }
})
