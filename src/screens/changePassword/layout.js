import React, { Component } from 'react';
import {
    View,
    Text,
    Platform
} from 'react-native';

import Button from "@components/button";
import InputText from "@components/inputText";
import LinearGradient from 'react-native-linear-gradient';
import Loading from "@components/loading";

import IC_EMAIL from "@resources/icons/ID.png";

import Style from "./style";

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            verifyCode: '',
            currPass: '',
            newPass: '',
            rePass: '',
            loading: false,
            flag: true
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.account.resetPassword && nextProps.account.resetPassword.success && this.state.flag) {
            await this.setState({ loading: false, flag: false });
            await this._gotoLogin();
        }
    }

    _resetPassWord() {
        this.setState({ loading: true })
        if (!this.state.flag) {
            this.setState({ flag: true })
        }
        if (this.state.newPass !== this.state.rePass) {
            this.setState({ loading: false })
            alert('password not equal repass');
            return;
        }
        this.props.actions.account.resetPassword(this.state.verifyCode, this.state.newPass)
    }

    _gotoLogin() {
        this.props.navigation.navigate('Login')
    }

    renderLoading() {
        if (this.state.loading) {
            return <Loading
                visible={this.state.loading}
            />
        }
        return null;
    }

    render() {
        let { status } = this.props.navigation.state.params;
        // console.log(status)
        return (
            <View style={Style.container}>
                <View style={{ marginTop: Platform.OS === 'ios' ? 100 : 80 }}>
                    <Text style={Style.txtTop}>
                        {'Change Your Pass'}
                    </Text>
                </View>
                <View>
                    <View style={{ marginVertical: 20 }}>
                        {
                            status == 'forgot' ?
                                <InputText
                                    placeholder={'Verify Code'}
                                    onChange={(text) => this.setState({ verifyCode: text })}
                                    iconLeft={IC_EMAIL}
                                /> :
                                status == 'change' ?
                                    <InputText
                                        placeholder={'Current Password'}
                                        onChange={(text) => this.setState({ currPass: text })}
                                        iconLeft={IC_EMAIL}
                                        secureTextEntry
                                    /> : null
                        }

                    </View>
                    <InputText
                        placeholder={'New Password'}
                        iconLeft={IC_EMAIL}
                        onChange={(text) => this.setState({ newPass: text })}
                        secureTextEntry
                    />
                    <View style={{ marginVertical: 20 }}>
                        <InputText
                            placeholder={'Retype Password'}
                            iconLeft={IC_EMAIL}
                            onChange={(text) => this.setState({ rePass: text })}
                            secureTextEntry
                        />
                    </View>
                    <Button
                        onPress={() => this._resetPassWord()}
                        style={{ marginBottom: 100 }}
                    >
                        <LinearGradient
                            colors={['#4A89E8', '#8FBCFF']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            style={{ alignItems: 'center', borderRadius: 33 }}
                        >
                            <Text style={{ fontSize: 15, color: '#FFFFFF', marginVertical: 13, fontFamily: 'OpenSans-SemiBold' }}>Send</Text>
                        </LinearGradient>
                    </Button>
                </View>
                {this.renderLoading()}
            </View>
        );
    }
}