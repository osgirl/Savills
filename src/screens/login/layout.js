import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import ButtonCustom from "@components/buttonCustom";
import Button from "@components/button";
import InputText from "@components/inputText";
import LinearGradient from 'react-native-linear-gradient';
import Resolution from "@utils/resolution";

import IC_EMAIL from "@resources/icons/ID.png";
import IC_PASS from "@resources/icons/password.png";

import IMG_LOGIN from "../../resources/image/imgLogin.png";

import Style from "./style";

export default class extends Component {

    render() {
        return (
            <View style={Style.container}>
                <View style={Style.btnLanguage}>
                    <ButtonCustom
                        background={'transparent'}
                        display='text'
                        haveMargin={false}
                        color={'#4A89E8'}
                        onPress={() => { }}
                        text="language"
                        fontFamily={'OpenSans-Regular'}
                    />
                </View>
                <View style={{ marginTop: 105 }}>
                    <Text style={Style.txtTop}>
                        {' Redefining Your Home \n Search Experience'}
                    </Text>
                    <Image source={IMG_LOGIN} style={{ marginTop: 31, width: Resolution.scaleWidth(206), height: Resolution.scaleHeight(146) }} />
                </View>
                <View>
                    <InputText
                        placeholder={'Email'}
                        iconLeft={IC_EMAIL}
                    />
                    <InputText
                        placeholder={'Password'}
                        iconLeft={IC_PASS}
                        secureTextEntry
                        style={{ marginVertical: 20 }}
                    />

                    <Button
                        onPress={() => { }}
                    >
                        <LinearGradient
                            colors={['#4A89E8', '#8FBCFF']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            style={Style.btnLogin}
                        >
                            <Text style={{ fontSize: 15, color: '#FFFFFF', marginVertical: 13, fontFamily: 'OpenSans-SemiBold' }}>Login</Text>
                        </LinearGradient>
                    </Button>

                    <View style={{ alignItems: 'center', marginVertical: 40 }}>
                        <ButtonCustom
                            background={'transparent'}
                            display='text'
                            fontSize={12}
                            haveMargin={false}
                            color={'#BABFC8'}
                            onPress={() => { }}
                            text="Forgot Password?"
                        />
                    </View>
                </View>
            </View>
        );
    }
}