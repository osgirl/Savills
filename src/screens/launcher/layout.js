import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, Dimensions } from 'react-native';
import IMG_FLASH from '@resources/image/splash_screen.png';
import Modal from 'react-native-modal';
const { width } = Dimensions.get('window');
export default class extends Component {
  render() {
    return (
      <ImageBackground source={IMG_FLASH} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {this.renderModaMain()}
      </ImageBackground>
    );
  }

  renderModaMain = () => {
    return (
      <Modal style={{ flex: 1, margin: 0, paddingHorizontal: 20 }} isVisible={this.state.popupMaintenance}>
        <View style={{ backgroundColor: '#F1C30E', borderRadius: 10, alignItems: 'center', padding: 20 }}>
          <Image style={{ width: 300 }} resizeMode={'contain'} source={require('../../resources/image/maintenace.png')} />
          <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 20, textAlign: 'center', color: '#FFF', marginBottom: 10 }}>
            Opps !
          </Text>
          <Text style={{ fontFamily: 'OpenSans-Light', fontSize: 13, textAlign: 'center', color: '#FFF' }}>
            {this.props.app.messageErrorAll}
          </Text>
        </View>
      </Modal>
    );
  };
}
