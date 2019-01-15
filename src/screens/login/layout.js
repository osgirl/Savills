import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

import { ButtonCustom, Button, InputText, Loading } from '@components';
import _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import Picker from 'react-native-wheel-picker';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import IC_EMAIL from '@resources/icons/ID.png';
import IC_PASS from '@resources/icons/password.png';
import IMG_LOGIN from '@resources/image/imgLogin.png';
import LOGO from '@resources/icons/logo.png';

import Configs from '@utils/configs';
import Style from './style';
import Resolution from '@utils/resolution';
import Language from '@utils/language';

const { width, height } = Dimensions.get('window');

var PickerItem = Picker.Item;

export default class extends Component {
  onPickerSelect(index) {
    try {
      this.props.actions.app.setLanguageLocal(index.toString());
      this.setState({
        selectedItem: index
      });
    } catch (error) {
      console.log(error);
    }
  }

  getIcon = index => {
    let id = this.props.app.listLanguage[index];
    let item = Language.listLanguage.filter(item => {
      if (item.id === id.id) {
        return item;
      }
    });
    return item[0].icon;
  };

  renderModalContent() {
    return (
      <View>
        <View style={Style.modalContent}>
          <Text style={{ fontSize: Resolution.scale(13), fontFamily: 'OpenSans-Bold', marginTop: Resolution.scale(20) }}>
            Select Language
          </Text>
          <Picker
            style={{ width: width - Resolution.scale(20), flex: 1, justifyContent: 'center' }}
            selectedValue={parseInt(this.state.selectedItem)}
            itemStyle={{ color: '#333333', fontSize: Resolution.scale(20), fontWeight: 'bold' }}
            onValueChange={index => this.onPickerSelect(index)}
          >
            {this.props.app.listLanguage.map((item, index) => (
              <PickerItem label={this.getIcon(index) + item.title} value={index} key={'id_' + index} />
            ))}
          </Picker>
        </View>
      </View>
    );
  }

  renderLoading() {
    if (this.state.loading) {
      return <Loading visible={this.state.loading} onRequestClose={() => {}} />;
    }
    return null;
  }

  render() {
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    let iconFlag = this.getIcon(this.props.app.languegeLocal);
    return (
      <View style={Style.container}>
        <KeyboardAwareScrollView>
          <View
            style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column', height: height, flex: 1 }}
          >
            <View style={[Style.btnLanguage]}>
              <ButtonCustom
                background={'transparent'}
                display="text"
                haveMargin={false}
                color={'#4A89E8'}
                onPress={() => this._toggleModalLanguage()}
                text={iconFlag + ' ' + languages.LOGIN_BTN_LANGUAGE}
                fontFamily={'OpenSans-Regular'}
              />
            </View>
            <View
              style={{
                marginTop: Resolution.scale(70),
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={[Style.txtTop, { marginHorizontal: Resolution.scale(60), textAlign: 'center' }]}>
                {languages.LOGIN_TITLE_1}
              </Text>
              <Text style={Style.txtTop}>{languages.LOGIN_TITLE_2}</Text>
              <Image
                source={LOGO}
                style={{
                  width: Resolution.scale(200),
                  height: Resolution.scale(50),
                  marginTop: Resolution.scale(10)
                }}
                resizeMode={'contain'}
              />
              <Image
                source={IMG_LOGIN}
                style={{
                  marginTop: Resolution.scale(5),
                  flex: 1
                }}
                resizeMode={'contain'}
              />
            </View>
            {this.props.account.error ? (
              <Text
                style={{
                  color: '#FF361A',
                  fontSize: Resolution.scale(10),
                  alignSelf: 'center',
                  marginBottom: Resolution.scale(6),
                  textAlign: 'center'
                }}
              >
                {this.props.account.error.message + '\n' + this.props.account.error.details}
              </Text>
            ) : null}
            {this.props.account.tenant.error ? (
              <Text
                style={{
                  color: '#FF361A',
                  fontSize: Resolution.scale(10),
                  alignSelf: 'center',
                  marginBottom: Resolution.scale(6),
                  textAlign: 'center'
                }}
              >
                {this.props.account.tenant.error.message + '\n' + this.props.account.tenant.error.details}
              </Text>
            ) : null}
            <View style={{ width: width - Resolution.scaleWidth(80) }}>
              <InputText
                placeholder={languages.LOGIN_TXT_PLACEHOLDER_EMAIL}
                iconLeft={IC_EMAIL}
                keyboardType="email-address"
                onChange={data => {
                  this.setState({ username: data });
                }}
                style={this.props.account.error ? Style.errorTextinput : null}
              />
              <InputText
                placeholder={languages.LOGIN_TXT_PLACEHOLDER_PASSWORD}
                iconLeft={IC_PASS}
                secureTextEntry
                marginVertical={Resolution.scale(20)}
                style={this.props.account.error ? Style.errorTextinput : null}
                onChange={data => {
                  this.setState({ password: data });
                }}
              />

              <Button onPress={() => this._login(this.state.username, this.state.password)} style={{ ...Configs.ShadowButton }}>
                <LinearGradient
                  colors={['#4A89E8', '#8FBCFF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={Style.btnLogin}
                >
                  <Text
                    style={{
                      fontSize: Resolution.scale(15),
                      color: '#FFFFFF',
                      marginVertical: Resolution.scale(13),
                      fontFamily: 'OpenSans-SemiBold'
                    }}
                  >
                    {languages.LOGIN_BTN_LOGIN}
                  </Text>
                </LinearGradient>
              </Button>

              <View style={{ alignItems: 'center', marginVertical: Resolution.scale(30) }}>
                <ButtonCustom
                  background={'transparent'}
                  display="text"
                  fontSize={Resolution.scale(12)}
                  haveMargin={false}
                  color={'#BABFC8'}
                  onPress={() => this._gotoForgotPassword()}
                  text={languages.LOGIN_TXT_FORGOTPASSWORD + ' ?'}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Modal
          onBackdropPress={() => this._toggleModalLanguage()}
          isVisible={this.state.isModalLanguage}
          style={{
            justifyContent: 'flex-end',
            margin: Resolution.scale(20)
          }}
        >
          {this.renderModalContent()}
        </Modal>
        {this.renderLoading()}
      </View>
    );
  }
}
