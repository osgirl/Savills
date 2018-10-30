import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
    TextInput
} from 'react-native';

import Modal from "react-native-modal";
import Button from "@components/button";
import InputText from "@components/inputText";
import LinearGradient from 'react-native-linear-gradient';
import Loading from "@components/loading";
import IC_EMAIL from "@resources/icons/ID.png";
import Resolution from "../../utils/resolution";
import Style from "./style";

export default class extends Component {

    renderLoading() {
        if (this.state.loading) {
            return <Loading
                visible={this.state.loading}
            />
        }
        return null;
    }

    renderModalContent = () => (
        <View style={[Style.modalContent, {}]}>
            <Text style={{ marginTop: 40, fontSize: 15, color: '#505E75', fontFamily: 'OpenSans-Bold' }}>Verify Your Code</Text>
            <View>
                <TextInput
                    placeholder={'YOURCODE'}
                    style={{ fontSize: 22, fontFamily: 'OpenSans-Regular', color: '#505E75' }}
                />
            </View>
            <Button
                style={{ width: Resolution.scaleWidth(255), marginBottom: 40 }}
                onPress={() => { }}
            >
                <LinearGradient
                    colors={['#4A89E8', '#8FBCFF']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={{ alignItems: 'center', borderRadius: 33, }}
                >
                    <Text style={{ fontSize: 15, color: '#FFFFFF', marginVertical: 13, fontFamily: 'Opensans-SemiBold' }}>
                        OK
                     </Text>
                </LinearGradient>
            </Button>
        </View>
    );

    render() {
        return (
            <View style={Style.container}>
                <View style={{ marginTop: Platform.OS === 'ios' ? 100 : 80 }}>
                    <Text style={Style.txtTop}>
                        {' A password reset link will be sent to your password. If you dont get an email within a few minutes, plesase re-try'}
                    </Text>
                </View>
                <View>
                    <InputText
                        placeholder={'Email'}
                        iconLeft={IC_EMAIL}
                        onChange={(text) => { this.setState({ email: text }) }}
                    />

                    <Button
                        style={Style.btnSent}
                        onPress={() => this._sendPasswordResetCode(this.state.email)}
                    >
                        <LinearGradient
                            colors={['#4A89E8', '#8FBCFF']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            style={{ alignItems: 'center', borderRadius: 33, }}
                        >
                            <Text style={{ fontSize: 15, color: '#FFFFFF', marginVertical: 13, fontFamily: 'Opensans-SemiBold' }}>
                                Send
                            </Text>
                        </LinearGradient>
                    </Button>
                </View>
                {/* <Modal
                    onBackdropPress={() => this.setState({ isShowModalVerify: false })}
                    isVisible={this.state.isShowModalVerify}>
                    {this.renderModalContent()}
                </Modal> */}
                {this.renderLoading()}
            </View>
        );
    }
}