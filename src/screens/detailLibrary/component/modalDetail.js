import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, FlatList } from 'react-native';

import Connect from '@stores';
import LinearGradient from 'react-native-linear-gradient';
import Resolution from "@utils/resolution";
import Button from "@components/button";
import IC_CLOSE from "@resources/icons/close.png";
import IC_CALENDAR from "@resources/icons/calendar.png";
import IC_CLOCK from "@resources/icons/clock.png";
import Modal from "react-native-modal";
import HeaderTitle from '@components/headerTitle';

import Header from '@components/header';

import IC_EVENTEMTY from '@resources/icons/Events_emty.png';
const { width, height } = Dimensions.get('window');

class ModalDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={[styles.container, {}]}>
        <Header
          LinearGradient={true}
          leftIcon={IC_CLOSE}
          leftAction={() => this.props.onClose()}
          headercolor={'transparent'}
        />
        <LinearGradient
          colors={['#4A89E8', '#8FBCFF']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={{}}>
          <HeaderTitle title={'Detail'} />
        </LinearGradient>



      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FD',
  }
});


export default Connect(ModalDetail);