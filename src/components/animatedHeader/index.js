/** @format */

import React, { Component } from 'react';
import { Animated, View, Dimensions, Image } from 'react-native';
import styles from './styles';
import Button from '@components/button';
import LinearGradient from 'react-native-linear-gradient';
const headerMinHeight = 80;
const { width } = Dimensions.get('window');

export default class AnimatedHeader extends Component {
  render() {
    const { scrollY, label, goBack, goBackAction } = this.props;

    const titleTransformY = scrollY.interpolate({
      inputRange: [0, headerMinHeight],
      outputRange: [0, -40],
      extrapolate: 'clamp'
    });
    const titleTransformX = scrollY.interpolate({
      inputRange: [0, headerMinHeight],
      outputRange: [0, width / 2 - 50],
      extrapolate: 'clamp'
    });
    const titleScale = scrollY.interpolate({
      inputRange: [0, headerMinHeight],
      outputRange: [1, 0.8],
      extrapolate: 'clamp'
    });
    const navbarOpacity = scrollY.interpolate({
      inputRange: [0, headerMinHeight * 1.5],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    const headerHeight = scrollY.interpolate({
      inputRange: [0, headerMinHeight * 1.5],
      outputRange: [180, 50],
      extrapolate: 'clamp'
    });

    return (
      <View style={styles.body}>
        <LinearGradient
          style={{ position: 'absolute', top: 0, width: width, height: 80 }}
          colors={['#4A89E8', '#8FBCFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <Animated.View style={[styles.headerView, { opacity: navbarOpacity }]} />

        {label && (
          <Animated.Text
            style={[
              styles.headerLabel,
              {
                transform: [{ translateY: titleTransformY }, { translateX: titleTransformX }, { scale: titleScale }]
              }
            ]}
          >
            {label}
          </Animated.Text>
        )}
        {typeof goBack != 'undefined' ? (
          <Button
            onPress={() => goBackAction()}
            style={{
              position: 'absolute',
              top: 30,
              left: 10,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Image source={require('@resources/icons/close.png')} />
          </Button>
        ) : (
          <View style={styles.homeMenu} />
        )}
      </View>
    );
  }
}
