import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Text,
  Animated,
  ActivityIndicator,
  Platform,
  StatusBar,
  RefreshControl
} from 'react-native';

import { Header, HeaderTitle, ModalSelectUnit, AnimatedTitle, PlaceHolderItemH, Button } from '@components';

import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Modal from 'react-native-modal';

import IC_BACK from '@resources/icons/close.png';
import IC_CALENDAR from '@resources/icons/calendar.png';
import IC_CLOCK from '@resources/icons/clock.png';
import IC_DROPDOWN from '@resources/icons/dropDown.png';

import Resolution from '@utils/resolution';
import Configs from '@utils/configs';

const HEADER_MAX_HEIGHT = Resolution.scale(60);

const { width } = Dimensions.get('window');

export default class extends Component {
  renderItem(item) {
    let state = item.state;
    let times = moment(item.notification.creationTime).format('LT');
    let date = moment(item.dateCreate).format('l');
    return (
      <View style={[Styles.item]}>
        {state === 0 ? (
          <View
            style={{
              backgroundColor: '#FF361A',
              position: 'absolute',
              top: Resolution.scale(20),
              right: Resolution.scale(20),
              width: Resolution.scale(8),
              height: Resolution.scale(8),
              borderRadius: 33
            }}
          />
        ) : null}
        <Button onPress={() => this._onClickItem(item)} style={{ alignItems: 'flex-start' }}>
          <View style={{ marginHorizontal: Resolution.scale(20) }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: Resolution.scale(20),
                marginBottom: Resolution.scale(10),
                justifyContent: 'space-between'
              }}
            >
              <View style={{ backgroundColor: state === 0 ? '#505E75' : '#BABFC8', borderRadius: 5 }}>
                {item.notification.data.properties.Id ? (
                  <Text
                    style={{
                      color: '#F8F8F8',
                      paddingVertical: Resolution.scale(2),
                      paddingHorizontal: Resolution.scale(20),
                      fontSize: Resolution.scale(13),
                      fontFamily: 'OpenSans-SemiBold'
                    }}
                  >
                    {`#${item.notification.data.properties.Id}`}
                  </Text>
                ) : null}
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: state === 0 ? '#343D4D' : '#BABFC8',
                  fontSize: Resolution.scale(14),
                  fontFamily: 'OpenSans-SemiBold'
                }}
              >
                {`${item.notification.data.message}`}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: Resolution.scale(10), marginBottom: Resolution.scale(20) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={IC_CLOCK} />
                <Text
                  style={{
                    marginLeft: Resolution.scale(10),
                    fontSize: Resolution.scale(12),
                    color: '#C9CDD4',
                    fontFamily: 'OpenSans-Regular'
                  }}
                >
                  {times}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: Resolution.scale(20) }}>
                <Image source={IC_CALENDAR} style={{}} />
                <Text
                  style={{
                    marginLeft: Resolution.scale(10),
                    fontSize: Resolution.scale(12),
                    color: '#C9CDD4',
                    fontFamily: 'OpenSans-Regular'
                  }}
                >
                  {date}
                </Text>
              </View>
            </View>
          </View>
        </Button>
      </View>
    );
  }

  _FooterFlatlist() {
    return this.state.loadingMore ? (
      <View style={{ height: Resolution.scaleHeight(50), justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Configs.colorMain} />
      </View>
    ) : (
        <View style={{ height: Resolution.scaleHeight(20) }} />
      );
  }

  handleScroll = event => {
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
      {
        listener: event => { }
      },
      { useNativeDriver: true }
    )(event);
  };

  renderHeader(languages) {
    let unitActive = this.props.units.unitActive;
    const isShow = this.state.scrollY.interpolate({
      inputRange: [0, 15],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    return (
      <View>
        <Header
          LinearGradient={true}
          leftIcon={IC_BACK}
          leftAction={() => this.props.onclose()}
          headercolor={'transparent'}
          showTitleHeader={true}
          center={
            <Animated.View style={{ opacity: isShow }}>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.NOTIFICATION_TXT_TITLE}</Text>
            </Animated.View>
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
        <AnimatedTitle scrollY={this.state.scrollY} label={languages.NOTIFICATION_TXT_TITLE} />
      </View>
    );
  }

  render() {
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        <StatusBar barStyle="light-content" />
        {this.renderHeader(languages)}
        {this.state.isLoadData === false ? (
          <FlatList
            data={this.state.data}
            horizontal={false}
            contentContainerStyle={{
              alignItems: 'center',
              paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0
            }}
            keyExtractor={(item, index) => item.id + '__' + index}
            renderItem={({ item, index }) => this.renderItem(item)}
            onScroll={this.handleScroll}
            onEndReachedThreshold={0.01}
            scrollEventThrottle={16}
            onEndReached={() => this._onEndReached()}
            legacyImplementation={false}
            extraData={this.state}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: Resolution.scaleWidth(20) }} />}
            ListHeaderComponent={() => <View style={{ height: Resolution.scaleHeight(20) }} />}
            ListFooterComponent={() => this._FooterFlatlist()}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefresh}
                onRefresh={() => this._onRefresh()}
                // Android offset for RefreshControl
                progressViewOffset={HEADER_MAX_HEIGHT}
              />
            }
            ListEmptyComponent={() => {
              return (
                <Text
                  style={{
                    color: '#505E75',
                    fontSize: 15,
                    fontFamily: 'OpenSans-Bold',
                    textAlign: 'center',
                    marginTop: width / 2
                  }}
                >
                  {languages.NOTI_EMPTY_LIST}
                </Text>
              );
            }}
            contentInset={{
              top: HEADER_MAX_HEIGHT
            }}
            contentOffset={{
              y: -HEADER_MAX_HEIGHT
            }}
          />
        ) : (
            <View style={{ marginTop: HEADER_MAX_HEIGHT }}>
              <PlaceHolderItemH noMargin />
            </View>

          )}
        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalSelectUnit}>
          <ModalSelectUnit onClose={() => this._closeModalSelectUnit()} />
        </Modal>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  item: {
    width: width - Resolution.scale(40),
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginHorizontal: Resolution.scale(20),
    marginVertical: Resolution.scale(5)
  },

});
