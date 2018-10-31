import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';

import ButtonCustom from "@components/buttonCustom";
import Button from "@components/button";
import InputText from "@components/inputText";
import LinearGradient from 'react-native-linear-gradient';
import Picker from 'react-native-wheel-picker';
import Modal from "react-native-modal";
import Resolution from "@utils/resolution";

import IC_EMAIL from "@resources/icons/ID.png";
import IC_PASS from "@resources/icons/password.png";

import IMG_LOGIN from "@resources/image/imgLogin.png";

import Loading from "@components/loading";
import Configs from "../../utils/configs";
import Style from "./style";

const { width } = Dimensions.get('window');

let DATA_LANGUAGE = [
    { id: 1, title: 'Vietnamese' },
    { id: 2, title: 'English' }
]
var PickerItem = Picker.Item;
export default class extends Component {

    onPickerSelect(index) {
        try {
            alert(index)
            this.setState({
                selectedItem: index,
            })
        } catch (error) {
            console.log(error)
        }

    }

    renderModalContent() {
        return (
            <View>
                <View style={Style.modalContent}>
                    <Text style={{ fontSize: 13, fontFamily: 'OpenSans-Bold', marginTop: 20 }}>Select Language</Text>
                    <Picker
                        style={{ width: width - 20, flex: 1, justifyContent: 'center', }}
                        selectedValue={this.state.selectedItem}
                        itemStyle={{ color: "#333333", fontSize: 20, fontWeight: 'bold' }}
                        onValueChange={(index) => this.onPickerSelect(index)}>
                        {
                            DATA_LANGUAGE.map((item, index) => (
                                <PickerItem
                                    label={item.title}
                                    value={index}
                                    key={"id_" + index}
                                />
                            ))
                        }
                    </Picker>
                </View>
            </View>
        )
    };

    renderLoading() {
        if (this.state.loading) {
            return <Loading
                visible={this.state.loading}
                onRequestClose={() => { }}
            />
        }
        return null;
    }

    render() {
        return (
            <View style={Style.container}>
                <View style={[Style.btnLanguage]}>
                    <ButtonCustom
                        background={'transparent'}
                        display='text'
                        haveMargin={false}
                        color={'#4A89E8'}
                        onPress={() => this._toggleModalLanguage()}
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
                    {
                        this.props.account.error ?
                            <Text style={{ color: '#FF361A', fontSize: 10, alignSelf: 'center', marginBottom: 6, textAlign: 'center' }}>{this.props.account.error.message + '\n' + this.props.account.error.details}</Text> : null
                    }
                    <InputText
                        placeholder={'Username or Email'}
                        iconLeft={IC_EMAIL}
                        onChange={(data) => {
                            this.setState({ username: data })
                        }}
                        style={this.props.account.error ? Style.errorTextinput : null}
                    />
                    <InputText
                        placeholder={'Password'}
                        iconLeft={IC_PASS}
                        secureTextEntry
                        marginVertical={20}
                        style={this.props.account.error ? Style.errorTextinput : null}
                        onChange={(data) => {
                            this.setState({ password: data })
                        }}
                    />

                    <Button
                        onPress={() => this._login(this.state.username, this.state.password)}
                        style={{ ...Configs.ShadowButton }}
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
                            onPress={() => this._gotoForgotPassword()}
                            text="Forgot Password?"
                        />
                    </View>
                </View>
                <Modal
                    onBackdropPress={() => this._toggleModalLanguage()}
                    isVisible={this.state.isModalLanguage}
                    style={{
                        justifyContent: "flex-end",
                        margin: 20,
                    }}
                >
                    {this.renderModalContent()}
                </Modal>
                {this.renderLoading()}
            </View>
        );
    }
}