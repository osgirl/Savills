
import React, { Component } from 'react';
import {
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Text
} from 'react-native';
import Styles from "./styles";

export default class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={Styles.Container}>
                <Text>Drawer</Text>
            </View>
        );
    }
}


