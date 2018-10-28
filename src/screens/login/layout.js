import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import Button from "@components/button";
import InputText from "@components/inputText";
import IC_EMAIL from "@resources/icons/calendar.png";

export default class extends Component {

    render() {
        return (
            <View
                style={{ flex: 1, alignItems: 'center', }}
            >
                <View style={{ position: 'absolute', top: 20, right: 20 }}>
                    <Button
                        background={'transparent'}
                        display='text'
                        haveMargin={false}
                        color={'#4A89E8'}
                        onPress={this.props.leftAction || null}
                        text="language"
                    />
                </View>
                <View style={{ marginTop: 105 }}>
                    <Text style={{ fontSize: 15, color: '#505E75', textAlign: 'center' }}>
                        {' Redefining Your Home \n Search Experience'}
                    </Text>
                    <InputText
                        placeholder={'Email'}
                        iconLeft={IC_EMAIL}
                    />
                    <InputText
                        placeholder={'Password'}
                        iconLeft={IC_EMAIL}
                        secureTextEntry
                        style={{marginVertical: 20}}
                    />
                </View>
            </View>
        );
    }

}