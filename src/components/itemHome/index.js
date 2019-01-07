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
import IC_PLUS from "../../resources/icons/plush-addnew.png";

import { ItemHome } from "../../components/placeHolder";

const { width, height } = Dimensions.get('window');

export default class ItemHomeComponent extends Component {

    render() {
        let moduleCount = this.props.moduleCount;
        let moduleName = this.props.moduleName;
        let moduleCountByItem = moduleCount && moduleCount.length > 0 ? moduleCount.find(e => e.moduleName === moduleName) : {}
        return (
            <View style={[Styles.container,
            {
                ...Configs.Shadow,
                marginLeft: this.props.index === 0 || this.props.index % 3 === 0 ? 0 : Resolution.scale(10),
                // marginLeft: this.props.index === 0 || this.props.index % 3 === 0 ? 0 : Resolution.scale(5),
            }]}>
                <Button
                    disabled={this.props.loading ? false : true}
                    activeOpacity={0.6}
                    onPress={() => this.props.onPressItem()}
                    style={{}}>
                    <View style={Styles.container}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Image
                                source={Utils.mapItemHome(this.props.image)}
                                style={{ width: Resolution.scale(20), height: Resolution.scale(20) }}
                            />
                        </View>
                        <Text
                            numberOfLines={2}
                            style={{
                                color: '#ACB1BC',
                                fontSize: Resolution.scale(12),
                                marginTop: Resolution.scaleHeight(10),
                                fontFamily: 'OpenSans-Bold',
                                textAlign: 'center',
                                height: Resolution.scale(40)
                            }}
                        >
                            {this.props.title}
                        </Text>
                        {/* {
                                moduleCountByItem && moduleCountByItem.unreadCount > 0 ?
                                    <View style={{ backgroundColor: '#FFF', borderRadius: 10, position: 'absolute', top: (width - 60) / 8, right: (width - 60) / 8 }}>
                                        <View style={{ backgroundColor: '#FF361A', borderRadius: 10, margin: Resolution.scale(3) }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', width: Resolution.scale(30) }}>
                                                <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-Bold', fontSize: Resolution.scale(12) }}>{moduleCountByItem.unreadCount}</Text>
                                            </View>
                                        </View>
                                        <View style={{ backgroundColor: '#FFF', borderRadius: 33, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: -8, top: -8 }}>
                                            <View style={{ backgroundColor: '#FF361A', borderRadius: 33, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', width: 15, height: 15 }}>
                                                    <Image source={IC_PLUS} style={{ width: 10, height: 10 }} />
                                                </View>
                                            </View>
                                        </View>
                                    </View> : null
                            } */}

                        {
                            moduleCountByItem && moduleCountByItem.unreadCount > 0 ?
                                <View style={{ backgroundColor: '#FFF', borderRadius: 10, position: 'absolute', top: Resolution.scale(10), right: Resolution.scale(10) }}>
                                    <View style={{ backgroundColor: '#FF361A', borderRadius: 10, margin: Resolution.scale(3) }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: Resolution.scale(30) }}>
                                            <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-Bold', fontSize: Resolution.scale(12) }}>{moduleCountByItem.unreadCount}</Text>
                                        </View>
                                    </View>
                                </View> : null
                        }


                        {/* <View style={{ backgroundColor: '#FF361A', borderRadius: 16, position: 'absolute', right: 10, top: 10}}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 15,  marginVertical: 1}}>
                                    <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-Bold', fontSize: 13 }}>9s</Text>
                                </View>
                            </View> */}
                    </View>

                </Button>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: (width - Resolution.scale(60)) / 3,
        height: (width - Resolution.scale(60)) / 3,
        backgroundColor: '#FFF',
        marginTop: Resolution.scale(5),
        marginBottom: Resolution.scale(5),
    }
})
