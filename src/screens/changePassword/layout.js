import React, { Component } from 'react';
import {
    View,
    Text,
    Platform
} from 'react-native';

import Button from "@components/button";
import InputText from "@components/inputText";
import LinearGradient from 'react-native-linear-gradient';

import IC_EMAIL from "@resources/icons/ID.png";

import Style from "./style";

export default class extends Component {

    render() {
        return (
            <View style={Style.container}>
                <View style={{ marginTop: Platform.OS === 'ios' ? 100 : 80}}>
                    <Text style={Style.txtTop}>
                        {'Change Your Pass'}
                    </Text>
                </View>
                <View>
                    <InputText
                        placeholder={'Current Password'}
                        iconLeft={IC_EMAIL}
                        style={{ marginVertical: 20 }}
                        secureTextEntry
                    />
                    <InputText
                        placeholder={'New Password'}
                        iconLeft={IC_EMAIL}
                        secureTextEntry
                    />
                    <InputText
                        placeholder={'Retype Password'}
                        iconLeft={IC_EMAIL}
                        style={{ marginVertical: 20 }}
                        secureTextEntry
                    />
                    <Button
                        onPress={() => { }}
                    >
                        <LinearGradient
                            colors={['#4A89E8', '#8FBCFF']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            style={Style.btnSave}
                        >
                            <Text style={{ fontSize: 15, color: '#FFFFFF', marginVertical: 13 }}>Send</Text>
                        </LinearGradient>
                    </Button>
                </View>
            </View>
        );
    }
}