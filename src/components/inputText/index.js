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
                    width : width - 120,
                    marginTop: this.props.margintop,
                    marginHorizontal: this.props.marginHorizontal,
                }]}>
                <TextInput
                    underlineColorAndroid={'transparent'}
                    placeholder={this.props.placeholder}
                    selectionColor="white"
                    style={Styles.inputText}
                    placeholderTextColor={"#ACB4BD"}
                    onChangeText={e => {
                        this.props.onChange && this.props.onChange(e);
                        this.setState({ text: e })
                    }}
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
        height: 50,
        paddingVertical: 0,
        color: '#ACB4BD',
        fontSize: PixelRatio.roundToNearestPixel(14),
        marginHorizontal: 20,
        marginLeft: 50,
        flex: 1
    },
    inputView:
        Platform.OS === 'ios' ?
            {
                height: PixelRatio.roundToNearestPixel(40),
                backgroundColor: '#FFFFFF',
                borderRadius: 33,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                shadowColor: '#4A89E8',
                shadowOffset: { width: 0, height: 3, },
                shadowOpacity: 0.2,
                shadowRadius: 10,

            } : {
                height: PixelRatio.roundToNearestPixel(40),
                backgroundColor: '#FFFFFF',
                borderRadius: 33,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // elevation: 3,
                // shadowColor: '#4A89E8',
                // shadowOffset: { width: 0, height: 3, },
                // shadowOpacity: 0.1,
                // shadowRadius: 10,
                // borderWidth: 0.4,
                borderColor: '#ACB4BD'
            },
})


export default Connect(InputText)