import React, { Component } from 'react';
import { View, Text, WebView, Image, StatusBar, ActivityIndicator } from 'react-native';
import { Header, ModalSelectUnit, Button } from '@components';

import Modal from 'react-native-modal';

import IC_BACK from '@resources/icons/close.png';
import IC_DROPDOWN from '@resources/icons/dropDown.png';

import Configs from '@utils/configs';

export default class extends Component {
  render() {
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    let unitActive = this.props.units.unitActive;
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <StatusBar
          barStyle="light-content"
        />
        <Header
          LinearGradient={true}
          leftIcon={IC_BACK}
          leftAction={() => this.props.onClose()}
          headercolor={'transparent'}
          showTitleHeader={true}
          center={
            <View>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.FAQ_HEADER_TEXT}</Text>
            </View>
          }
          renderViewRight={
            <Button
              onPress={() => this.setState({ isModalSelectUnit: true })}
              style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
            >
              <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: 14 }}>{unitActive.fullUnitCode}</Text>
              <Image source={IC_DROPDOWN} style={{ marginLeft: 10 }} />
            </Button>
          }
        />
        {this.props.utilities && !this.props.utilities.FAQ.success ? (
          <View style={{ justifyContent: 'center', alignContent: 'center' }}>
            <ActivityIndicator size={'large'} color={Configs.colorMain} />
          </View>
        ) : null}
        {this.props.utilities && this.props.utilities.FAQ.success ? (
          <WebView originWhitelist={['*']} source={{ html: this.props.utilities.FAQ.result.faqHtmlContent }} />
        ) : (
          <View />
        )}
        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalSelectUnit}>
          <ModalSelectUnit onClose={() => this.setState({ isModalSelectUnit: false })} />
        </Modal>
      </View>
    );
  }
}
