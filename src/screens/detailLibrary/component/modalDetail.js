import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  ScrollView,
  Image,
  FlatList,
  WebView,
  Platform,
  StatusBar,
  ActivityIndicator
} from 'react-native';

import Connect from '@stores';
import LinearGradient from 'react-native-linear-gradient';
import Resolution from '@utils/resolution';
import Button from '@components/button';
import IC_CLOSE from '../../../resources/icons/close.png';
import IC_CALENDAR from '@resources/icons/calendar.png';
import IC_CLOCK from '@resources/icons/clock.png';
import Modal from 'react-native-modal';
import HeaderTitle from '@components/headerTitle';

import Header from '@components/header';
import AnimatedTitle from '@components/animatedTitle';
import HTML from 'react-native-render-html';

import IC_EVENTEMTY from '@resources/icons/Events_emty.png';
import Configs from '../../../utils/configs';
const { width, height } = Dimensions.get('window');

class ModalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(Platform.OS === 'ios' ? -50 : 0)
    };
  }

  onScroll = e => {
    const scrollSensitivity = 4;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollY.setValue(offset);
  };

  renderHeader() {
    const { itemSelected } = this.props;

    const opacityTextHeader = this.state.scrollY.interpolate({
      inputRange: [0, 30],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    return (
      <View>
        <Header
          LinearGradient={true}
          leftIcon={IC_CLOSE}
          leftAction={() => this.props.onClose()}
          headercolor={'transparent'}
          showTitleHeader={true}
          center={
            <View style={{}}>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{'Detail'}</Text>
            </View>
          }
        />
        {/* 
        <AnimatedTitle
          scrollY={this.state.scrollY}
          label={'Detail'}
        /> */}
      </View>
    );
  }

  render() {
    const { itemSelected } = this.props;
    console.log(itemSelected);
    const encToken = this.props.account.encToken;
    const file = itemSelected.file && `${itemSelected.file.fileUrl}&encToken=${encodeURIComponent(encToken)}`;
    return (
      <View style={[styles.container, {}]}>
        {this.renderHeader()}
        {/* <View style={{ position: 'absolute', top: 20, left: 0, zIndex: 10 }}>
          <Button
            onPress={() => this.props.onClose()}
            style={{ padding: 20 }}>
            <Image source={IC_CLOSE} />
          </Button>
        </View> */}
        <View style={{ flex: 1 }}>
          {file ? (
            // <WebView automaticallyAdjustContentInsets url={file} />
            <WebView
              javaScriptEnabled={true}
              builtInZoomControls={false}
              source={{
                uri: file
              }}
              scalesPageToFit={true}
            />
          ) : (
            <View>
              <ActivityIndicator size={'large'} color={Configs.colorMain} />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FD'
  }
});

export default Connect(ModalDetail);
