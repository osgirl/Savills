"use strict";

import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    FlatList
} from "react-native";

import { ItemHome, Avatar, Line } from "../placeHolder";
import Resolution from "../../utils/resolution";

const { width, height } = Dimensions.get('window');

export default class extends Component {

    render() {
        return (
            <View style={{ flex: 1, marginTop: Resolution.scale(20), alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Avatar
                        size={Resolution.scale(64)}
                        onReady={false}
                        bgColor={'#FFF'}
                        animate="fade"
                    />
                </View>

                <View>
                    <Line
                        txtWidth={Resolution.scale(90)}
                        height={15}
                        onReady={false}
                        animate="fade"
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <FlatList
                        scrollEnabled={false}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ alignItems: 'flex-start', flex: 1, width: width - Resolution.scale(40), marginHorizontal: Resolution.scale(20) }}
                        numColumns={3}
                        data={['1', '2', '3', '4', '5',
                            '6', '7', '8', '9', '10', '11', '12',]}
                        keyExtractor={item => item}
                        renderItem={({ item, index }) => (
                            <View style={[Styles.container, {
                                marginLeft: index === 0 || index % 3 === 0 ? 0 : Resolution.scale(10),
                            }]}>
                                <ItemHome
                                    onReady={false}
                                    bgColor={'#FFF'}
                                    animate="fade"
                                />
                            </View>
                        )}
                    />
                </View>
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
