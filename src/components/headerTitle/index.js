import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,

} from "react-native";

export default class HeaderTitle extends Component {
    static defaultProps = {
        marginHorizontal: 20,
        margintop: 0
    };

    render() {
        return (
            <View style={[style.container,
            {
                marginTop: this.props.margintop,
                marginHorizontal: this.props.marginHorizontal
            }]}>
                {/* <Image source={this.props.icon} /> */}
                <Text
                    style={{fontSize: 35, fontWeight: '900', color: '#FFF'}}
                >
                    {this.props.title}
                </Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        marginBottom: 20,
        // marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})