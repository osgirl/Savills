import React, { Component } from 'react';
import { View, Text, Platform, TextInput, KeyboardAvoidingView } from 'react-native';

import { Button, InputText, Loading } from '@components';

import LinearGradient from 'react-native-linear-gradient';
import IC_EMAIL from '@resources/icons/ID.png';
import Resolution from '@utils/resolution';
import Style from './style';

export default class extends Component {
  renderLoading() {
    if (this.state.loading) {
      return <Loading visible={this.state.loading} />;
    }
    return null;
  }

  renderModalContent = () => (
    <View style={[Style.modalContent, {}]}>
      <Text style={{ marginTop: Resolution.scaleHeight(40), fontSize: Resolution.scale(15), color: '#505E75', fontFamily: 'OpenSans-Bold' }}>
        Verify Your Code
      </Text>
      <View>
        <TextInput placeholder={'YOURCODE'} style={{ fontSize: Resolution.scale(22), fontFamily: 'OpenSans-Regular', color: '#505E75' }} />
      </View>
      <Button style={{ width: Resolution.scaleWidth(255), marginBottom: Resolution.scaleHeight(40) }} onPress={() => { }}>
        <LinearGradient
          colors={['#4A89E8', '#8FBCFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ alignItems: 'center', borderRadius: 33 }}
        >
          <Text
            style={{
              fontSize: 15,
              color: '#FFFFFF',
              marginVertical: Resolution.scaleHeight(13),
              fontFamily: 'Opensans-SemiBold'
            }}
          >
            OK
          </Text>
        </LinearGradient>
      </Button>
    </View>
  );

  render() {
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? null : 'padding'}
        style={Style.container}
      >
        <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? Resolution.scale(100) : Resolution.scale(80) }}>
          <Text style={Style.txtTop}>{languages.FORGOT_TXT_CONTENT}</Text>

          {
            this.props.account.sendCodeVerify.error ? (
              <Text
                style={{
                  color: '#FF361A',
                  fontSize: Resolution.scale(10),
                  alignSelf: 'center',
                  marginBottom: Resolution.scale(6),
                  textAlign: 'center'
                }}
              >
                {this.props.account.sendCodeVerify.error.message}
              </Text>
            ) : null
          }
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <InputText
            placeholder={languages.FORGOT_TXT_PLACEHOLDER}
            keyboardType="email-address"
            iconLeft={IC_EMAIL}
            onChange={text => {
              this.setState({ email: text });
            }}
          />

          <Button style={Style.btnSent} onPress={() => this._sendPasswordResetCode(this.state.email)}>
            <LinearGradient
              colors={['#4A89E8', '#8FBCFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ alignItems: 'center', borderRadius: 33 }}
            >
              <Text
                style={{
                  fontSize: Resolution.scale(15),
                  color: '#FFFFFF',
                  marginVertical: Resolution.scaleHeight(13),
                  fontFamily: 'Opensans-SemiBold'
                }}
              >
                {languages.FORGOT_BTN_SEND}
              </Text>
            </LinearGradient>
          </Button>
        </View>
        {this.renderLoading()}
      </KeyboardAvoidingView>
    );
  }
}
