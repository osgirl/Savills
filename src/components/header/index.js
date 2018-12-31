'use strict';

import React, { Component } from 'react';
import { View, Text, Dimensions, Platform, StyleSheet, Animated } from 'react-native';

import { SafeAreaView } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import ButtonCustom from '../buttonCustom';
import Connect from '@stores';

import Resolution from '../../utils/resolution';

const { width, height } = Dimensions.get('window');

class Header extends Component {
  static defaultProps = {
    headercolor: '#FFF'
  };

  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    if (this.props.showTitleHeader) {
      this.show();
    } else {
      this.hide();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showTitleHeader !== this.props.showTitleHeader) {
      if (this.props.showTitleHeader) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  show() {
    const timing = Animated.timing;
    timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 300
    }).start();
  }

  hide() {
    const timing = Animated.timing;
    timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 300
    }).start();
  }

  renderContent() {
    let fixHeader = this.props.headercolor === 'transparent' && !this.props.LinearGradient ? true : false;
    const Opacity = { opacity: this.state.fadeAnim };
    return (
      <View
        style={[
          style.container,
          {
            backgroundColor: this.props.headercolor,

            position: fixHeader ? 'absolute' : 'relative',
            top: fixHeader && Platform.OS === 'ios' ? 0 : 0
          }
        ]}
      >
        <View style={{ marginTop: 20 }} />
        <View style={style.wrapper}>
          <View style={{ width: width / 3, alignItems: 'flex-start' }}>
            {this.props.leftIcon ? (
              <ButtonCustom
                background={this.props.headercolor}
                haveMargin={false}
                onPress={this.props.leftAction || null}
                icon={this.props.leftIcon}
              />
            ) : (
              <View />
            )}
          </View>
          <Animated.View style={[{ width: width / 3, alignItems: 'center' }, Opacity]}>
            {this.props.center ? this.props.center : <View />}
          </Animated.View>
          <View style={{ width: width / 3, alignItems: 'flex-end' }}>
            {this.props.renderViewRight ? (
              <View style={{ flexDirection: 'row', flex: 1 }}>{this.props.renderViewRight}</View>
            ) : (
              <View style={{ width: 60 }} />
            )}
          </View>
        </View>
      </View>
    );
  }

  render() {
    if (this.props.LinearGradient) {
      return (
        <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          {this.renderContent()}
        </LinearGradient>
      );
    } else {
      return this.renderContent();
    }
  }

  renderTitle() {
    return (
      <View style={style.titleContainer}>
        <Text numberOfLines={1} style={style.titleText}>
          {this.props.center}
        </Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: 'center',
    zIndex: 4
  },
  wrapper: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    // marginTop: Platform.OS === "ios" ? Resolution.scale(20) : 0,
    height: Resolution.scaleHeight(60)
  },
  titleContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  titleText: {
    color: '#000',
    backgroundColor: 'transparent',
    fontWeight: '400'
  }
});

export default Connect(Header);
