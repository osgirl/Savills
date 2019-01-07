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

  renderHeader(languages) {
    const { itemSelected } = this.props;
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
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.LIBRARY_HEADER_DETAIL}</Text>
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
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    return (
      <View style={[styles.container, {}]}>
        {this.renderHeader(languages)}
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
