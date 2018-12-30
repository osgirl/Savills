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
            <View style={{ flex: 1, marginTop: 20, alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Avatar
                        size={64}
                        onReady={false}
                        bgColor={'#FFF'}
                        animate="fade"
                    />
                </View>

                <View>
                    {/* <Line
                        txtWidth={150}
                        height={20}
                        onReady={false}
                        animate="fade"
                    /> */}
                    <Line
                        txtWidth={90}
                        height={15}
                        onReady={false}
                        animate="fade"
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <FlatList
                        scrollEnabled={false}
                        horizontal={false}
                        contentContainerStyle={{ alignItems: 'center', marginTop: 20 }}
                        numColumns={3}
                        data={['1', '2', '3', '4', '5',
                            '6', '7', '8', '9', '10', '11', '12',]}
                        keyExtractor={item => item}
                        renderItem={(item) => (
                            <View style={Styles.container}>
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
        width: (width - 60) / 3,
        height: (width - 60) / 3,
        backgroundColor: '#FFFFFF',
        marginHorizontal: Resolution.scale(5),
        marginTop: Resolution.scale(5),
        marginBottom: Resolution.scale(5),
    }
})
