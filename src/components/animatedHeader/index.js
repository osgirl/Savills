import React, { Component, memo } from 'react';
import { Animated, View, Dimensions, Image, StyleSheet } from 'react-native';
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
      outputRange: [1, 0.65],
      extrapolate: 'clamp'
    });

    const navbarOpacity = scrollY.interpolate({
      inputRange: [0, headerMinHeight * 1.5],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    return (
      <View style={styles.body}>
        <LinearGradient style={styles.LinerTop} colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
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
          <Button onPress={() => goBackAction()} style={styles.Button}>
            <Image source={require('@resources/icons/close.png')} />
          </Button>
        ) : (
          <View style={styles.homeMenu} />
        )}
      </View>
    );
  }
}
