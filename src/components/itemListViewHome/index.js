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

const { width } = Dimensions.get('window');

export default class ItemListHome extends Component {

    render() {
        let moduleCount = this.props.moduleCount;
        let moduleName = this.props.moduleName;
        let moduleCountByItem = moduleCount && moduleCount.length > 0 ? moduleCount.find(e => e.moduleName === moduleName) : {}
        return (
            <View style={[Styles.container, { ...Configs.Shadow }]}>
                {
                    this.props.loading ?
                        <Button
                            activeOpacity={0.6}
                            onPress={() => this.props.onPressItem()}
                            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={Utils.mapItemHomeCircle(this.props.image)} style={{ marginHorizontal: Resolution.scale(20), marginVertical: Resolution.scale(10) }} />
                                <Text style={{ color: '#505E75', fontSize: Resolution.scale(12), fontFamily: 'OpenSans-Bold' }}>{this.props.title}</Text>
                            </View>
                            {
                                moduleCountByItem && moduleCountByItem.unreadCount > 0 ?
                                    <View style={{ marginHorizontal: Resolution.scale(20), justifyContent: 'center' }}>
                                        <View style={{ backgroundColor: '#FF361A', borderRadius: 20, width: Resolution.scale(30), alignItems: 'center' }}>
                                            <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-Bold', fontSize: Resolution.scale(12) }}>{moduleCountByItem.unreadCount}</Text>
                                        </View>
                                    </View> : null
                            }

                        </Button>
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
        marginVertical: 5
    }
})
