import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,

} from "react-native";

import Resolution from "../../utils/resolution";

export default class HeaderTitle extends Component {
    static defaultProps = {
        marginHorizontal: Resolution.scale(20),
        margintop: 0,
        marginVertical: 0
    };

    render() {
        return (
            <Text
                style={{
                    fontSize: Resolution.scale(35), fontFamily: 'OpenSans-Bold', color: '#FFF', marginTop: this.props.margintop,
                    marginHorizontal: this.props.marginHorizontal, marginVertical: this.props.marginVertical,
                }}
            >
                {this.props.title}
            </Text>
        )
    }
}

const style = StyleSheet.create({
    container: {
        marginBottom: Resolution.scale(20),
        flexDirection: "row",
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})