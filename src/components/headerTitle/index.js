import React, { Component } from 'react';

import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';

import Resolution from '../../utils/resolution';
const { width } = Dimensions.get('window');
export default class HeaderTitle extends Component {
  static defaultProps = {
    marginHorizontal: Resolution.scale(20),
    margintop: 0,
    marginBottom: Resolution.scale(0),
    marginVertical: 0
  };

  render() {
    let fontSize = Math.sqrt(((width - 40) * 50) / this.props.title.length);
    return (
      <Text
        adjustsFontSizeToFit={true}
        style={{
          fontSize: Resolution.scale(Platform.OS === 'ios' ? 28 : fontSize),
          fontFamily: 'OpenSans-Bold',
          color: '#FFF',
          marginTop: this.props.margintop,
          marginHorizontal: this.props.marginHorizontal,
          marginVertical: this.props.marginVertical,
          marginBottom: this.props.marginBottom
        }}
      >
        {this.props.title}
      </Text>
    );
  }
}

const style = StyleSheet.create({
  container: {
    // marginBottom: Resolution.scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10
  }
});
