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
                        {' A password reset link will be sent to your password. If you dont get an email within a few minutes, plesase re-try'}
                    </Text>
                </View>
                <View>
                    <InputText
                        placeholder={'Email'}
                        iconLeft={IC_EMAIL}
                    />

                    <Button
                        onPress={() => { }}
                    >
                        <LinearGradient
                            colors={['#4A89E8', '#8FBCFF']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            style={Style.btnSent}
                        >
                            <Text style={{ fontSize: 15, color: '#FFFFFF', marginVertical: 13, fontFamily: 'Opensans-SemiBold' }}>Send</Text>
                        </LinearGradient>
                    </Button>
                </View>
            </View>
        );
    }
}