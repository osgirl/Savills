import React, { Component } from 'react';
import { View, Text, Animated, FlatList, Image, StatusBar, Dimensions, ActivityIndicator, Platform } from 'react-native';
import Header from '@components/header';
import IC_BACK from '@resources/icons/back-light.png';
import IC_DROPDOWN from '@resources/icons/dropDown.png';
import LinearGradient from 'react-native-linear-gradient';
import Button from '@components/button';
import HeaderTitle from '@components/headerTitle';
import { isIphoneX } from '@utils/func';
import moment from 'moment';
import Configs from '../../utils/configs';
import ModalSelectUnit from '@components/modalSelectUnit';
import Modal from 'react-native-modal';
import Styles from './styles';

import Utils from "../../utils";

import Resolution from '../../utils/resolution';

import { ItemHorizontal2 } from '../../components/placeHolder';
import { ItemPlaceHolderH } from "../../components/placeHolderItem";


const HEADER_MAX_HEIGHT = Platform.OS == 'ios' ? 140 : 120;
const HEADER_MIN_HEIGHT = 75;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const { width } = Dimensions.get('window');

export default class extends Component {

  handleScroll = event => {
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
      {
        listener: event => {
          if (event.nativeEvent.contentOffset.y > 60) {
            if (!this.showCenter) {
              this.showCenter = true;
              this.setState({ isShowTitleHeader: true });
            }
          } else {
            if (this.showCenter) {
              this.showCenter = false;
              this.setState({ isShowTitleHeader: false });
            }
          }
        }
      },
      { useNativeDriver: true }
    )(event);
  };

  _FooterFlatlist() {
    return this.state.loadingMore ? (
      <View style={{ height: Resolution.scaleHeight(HEADER_MAX_HEIGHT + 30), justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Configs.colorMain} />
      </View>
    ) : (
        <View style={{ height: Resolution.scale(HEADER_MAX_HEIGHT + 30) }} />
      );
  }

  renderHeader() {
    let unitActive = this.props.units.unitActive;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });

    const opacity = this.state.scrollY.interpolate({
      inputRange: [0, 25, 50],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp'
    });

    return (
      <Animated.View
        style={{ height: headerHeight, position: 'absolute', top: 0, left: 0, right: 0, overflow: 'hidden', backgroundColor: 'red' }}>
        <Header
          LinearGradient={true}
          leftIcon={IC_BACK}
          leftAction={() => this.props.navigation.goBack()}
          headercolor={'transparent'}
          showTitleHeader={this.state.isShowTitleHeader}
          center={
            <View>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{'Libary'}</Text>
            </View>
          }
          renderViewRight={
            <Button
              onPress={() => this._openModalSelectUnit()}
              style={{ flexDirection: 'row', alignItems: 'center', marginRight: Resolution.scale(20) }}
            >
              <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: Resolution.scale(14) }}>
                {unitActive.fullUnitCode}
              </Text>
              <Image source={IC_DROPDOWN} style={{ marginLeft: Resolution.scale(10) }} />
            </Button>
          }
        />
        <LinearGradient
          colors={['#4A89E8', '#8FBCFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        >
          <Animated.View style={{ opacity: opacity }}>
            <HeaderTitle title={'Libary'} />
          </Animated.View>
        </LinearGradient>
      </Animated.View>
    );
  }

  render() {
    let unitActive = this.props.units.unitActive;
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        <StatusBar barStyle="light-content" />
        {
          this.state.data.length > 0 ?
            // <View style={{ flex: 1 }}>
            <FlatList
              alwaysBounceVertical={false}
              contentContainerStyle={{ marginTop: HEADER_MAX_HEIGHT }}
              data={this.state.data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.id.toString()}
              onScroll={this.handleScroll}
              renderItem={({ item, index }) => this.renderItem(item, index)}
              extraData={this.state}
              legacyImplementation={false}
              ListFooterComponent={() => this._FooterFlatlist()}
            /> : <ItemPlaceHolderH />
        }

        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalSelectUnit}>
          <ModalSelectUnit onClose={() => this.setState({ isModalSelectUnit: false })} />
        </Modal>
        {this.renderHeader()}
      </View>
    );
  }

  renderItem = (item, index) => {
    let date = moment(item.creationTime).format('l');
    return (
      <Button
        onPress={() => { }}
        style={{
          width: width - Resolution.scale(40),
          borderRadius: 10,
          marginTop: index === 0 ? Resolution.scale(20) : Resolution.scale(10),
          backgroundColor: '#FFF',
          padding: Resolution.scale(20),
          marginHorizontal: Resolution.scale(20),
          flexDirection: 'row'
        }}
      >

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{ color: '#505E75', fontWeight: 'bold', fontSize: Resolution.scale(13) }}
            >
              {item.libraryName}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              marginTop: Resolution.scale(10),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ marginRight: Resolution.scale(10) }} source={require('../../resources/icons/calendar.png')} />
              <Text style={{ color: '#C9CDD4', fontSize: Resolution.scale(12) }}>{date}</Text>
            </View>
          </View>
        </View>

        {/* <View style={{ justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'red', borderRadius: 30, width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#FFF', fontSize: Resolution.scale(12), fontFamily: 'OpenSans-Bold' }}>{'2'}</Text>
          </View>
        </View> */}


      </Button>
    );
  };
}
