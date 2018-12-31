import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, WebView, Platform, ActivityIndicator } from 'react-native';
import { Header } from '@components';

import Connect from '@stores';

import IC_CLOSE from '@resources/icons/close.png';
import Configs from '@utils/configs';

class ModalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(Platform.OS === 'ios' ? -60 : 0)
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
      </View>
    );
  }

  render() {
    const { itemSelected } = this.props;
    const encToken = this.props.account.encToken;
    const file = itemSelected.file && `${itemSelected.file.fileUrl}&encToken=${encodeURIComponent(encToken)}`;
    return (
      <View style={[styles.container, {}]}>
        {this.renderHeader()}
        <View style={{ flex: 1 }}>
          {file ? (
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
