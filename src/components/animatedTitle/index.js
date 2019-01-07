/** @format */

import React, { Component } from 'react';
import { Animated, StyleSheet, Platform } from 'react-native';
import HeaderTitle from '@components/headerTitle';
import LinearGradient from 'react-native-linear-gradient';
import Resolution from "../../utils/resolution";
const HEADER_MAX_HEIGHT = Resolution.scale(60);
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class AnimatedTitle extends Component {
  render() {
    const { scrollY, label } = this.props;

    const scroll = Animated.add(scrollY, Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0);

    const headerTranslate = scroll.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const opacity = scroll.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    return (
      <Animated.View style={[Style.headerTitle, { transform: [{ translateY: headerTranslate }] }]}>
        <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }}>
          <Animated.View style={{ opacity: opacity }}>
            <HeaderTitle title={label} />
          </Animated.View>
        </LinearGradient>
      </Animated.View>
    );
  }
}

const Style = StyleSheet.create({
  headerTitle: {
    position: 'absolute',
    top: Resolution.scale(80),
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    zIndex: -1
  }
});
