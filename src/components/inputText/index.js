"use strict";

import React, { Component } from "react";
import {
    View,
    PixelRatio,
    Dimensions,
    Platform,
    StyleSheet,
    TextInput,
    Image
} from "react-native";

import Connect from '@stores';
const { width, height } = Dimensions.get("window");
import Resolution from "../../utils/resolution";
import configs from "../../utils/configs";
class InputText extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    render() {
        return (
            <View style={[
                Styles.inputView,
                {
                    // width: Resolution.scaleWidth(255),
                    ...this.props.style,
                    width: width - 120,
                    marginTop: this.props.margintop,
                    marginHorizontal: this.props.marginHorizontal,
                    marginVertical: this.props.marginVertical
                }]}>
                <TextInput
                    underlineColorAndroid={'transparent'}
                    placeholder={this.props.placeholder}
                    selectionColor="#4A89E8"
                    style={Styles.inputText}
                    placeholderTextColor={"#BABFC8"}
                    onChangeText={e => {
                        this.props.onChange && this.props.onChange(e);
                        this.setState({ text: e })
                    }}
                    keyboardType={this.props.keyboardType}
                    secureTextEntry={this.props.secureTextEntry || false}
                    value={this.state.text}
                    onSubmitEditing={() => this.props.submitAction && this.props.submitAction(this.state.text)}
                />
                <View style={{ position: 'absolute', left: 30 }}>
                    <Image source={this.props.iconLeft} style={{ width: 15, height: 15 }} resizeMode={'contain'} />
                </View>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    inputText: {
        height: Resolution.scaleHeight(50),
        paddingVertical: 0,
        color: '#505E75',
        fontSize: Resolution.scale(13),
        marginHorizontal: Resolution.scale(20),
        marginLeft: Resolution.scale(50),
        flex: 1
    },
    inputView: {
        ...configs.Shadow,
        height: Resolution.scaleHeight(40),
        backgroundColor: '#FFFFFF',
        borderRadius: 33,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})


export default Connect(InputText)