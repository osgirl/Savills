import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Image, Text, Animated, ActivityIndicator, Platform, StatusBar } from 'react-native';
import Header from '@components/header';
import LinearGradient from 'react-native-linear-gradient';
import HeaderTitle from '@components/headerTitle';
import moment from 'moment';
import ModalSelectUnit from '@components/modalSelectUnit';
import Modal from 'react-native-modal';

import IC_BACK from '../../resources/icons/close.png';
import IC_CALENDAR from '../../resources/icons/calendar.png';
import IC_CLOCK from '../../resources/icons/clock.png';
import { } from '../';

import Configs from '../../utils/configs';
import Button from '../../components/button';

import IC_DROPDOWN from '@resources/icons/dropDown.png';
import IC_DEFAULT from '@resources/icons/default.png';

import Language from '../../utils/language';
import Resolution from '../../utils/resolution';

const { width } = Dimensions.get('window');

const HEADER_MAX_HEIGHT = Resolution.scale(135);
const HEADER_MIN_HEIGHT = Resolution.scale(Platform.OS === "android" ? 50 : 70);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class extends Component {
  renderItem(item) {
    let state = item.state;
    let times = moment(item.notification.creationTime).format('LT');
    let date = moment(item.dateCreate).format('l');
    return (
      <View style={[Styles.item]}>
        <Button onPress={() => { }} style={{ alignItems: 'flex-start' }}>
          <View style={{ marginHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 10, justifyContent: 'space-between' }}>
              <View style={{ backgroundColor: state === 0 ? '#505E75' : '#BABFC8', borderRadius: 5 }}>
                <Text style={{ color: '#F8F8F8', paddingVertical: 2, paddingHorizontal: 20 }}>{`#${
                  item.notification.data.properties.Id
                  }`}</Text>
              </View>
              {state === 0 ? <View style={{ backgroundColor: '#FF361A', width: 8, height: 8, borderRadius: 33 }} /> : null}
            </View>
            <View>
              <Text style={{ color: state === 0 ? '#343D4D' : '#BABFC8', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>
                {`${item.notification.data.message}`}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={IC_CLOCK} />
                <Text style={{ marginLeft: 10, fontSize: 12, color: '#C9CDD4', fontFamily: 'OpenSans-Regular' }}>{times}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                <Image source={IC_CALENDAR} style={{}} />
                <Text style={{ marginLeft: 10, fontSize: 12, color: '#C9CDD4', fontFamily: 'OpenSans-Regular' }}>{date}</Text>
              </View>
            </View>
          </View>
        </Button>
      </View>
    );
  }

  _HeaderFlatlist() {
    let LG = Language.listLanguage[this.props.app.languegeLocal].data;
    return (
      <LinearGradient
        colors={['#4A89E8', '#8FBCFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ width: width, marginBottom: 20 }}
      >
        <HeaderTitle title={LG.NOTIFICATION_TXT_TITLE} />
      </LinearGradient>
    );
  }

  _FooterFlatlist() {
    return this.state.loadingMore ? (
      <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Configs.colorMain} />
      </View>
    ) : (
        <View style={{ height: 20 }} />
      );
  }

  handleScroll = event => {
    Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
      listener: event => {
        if (event.nativeEvent.contentOffset.y > 50) {
          if (!this.showCenter) {
            this.showCenter = true;
            this.setState({ isShowTitleHeader: true });
            // this.props.navigation.setParams({ eventTitle: 'Events' });
          }
        } else {
          if (this.showCenter) {
            this.showCenter = false;
            // this.props.navigation.setParams({ eventTitle: null });
            this.setState({ isShowTitleHeader: false });
          }
        }
      }
    })(event);
  };

  render() {
    let unitActive = this.props.units.unitActive;
    let LG = Language.listLanguage[this.props.app.languegeLocal].data;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });

    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        <StatusBar
          barStyle="light-content"
        />
        <FlatList
          data={this.state.data}
          horizontal={false}
          contentContainerStyle={{ alignItems: 'center' }}
          keyExtractor={(item, index) => item.id + '__' + index}
          renderItem={({ item, index }) => this.renderItem(item)}
          onScroll={this.handleScroll}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={16}
          onEndReached={() => this._onEndReached()}
          legacyImplementation={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          ListHeaderComponent={() => <View style={{ marginTop: HEADER_MAX_HEIGHT + 20 }} />}
          ListFooterComponent={() => this._FooterFlatlist()}
        />

        <Animated.View style={[Styles.header, { height: headerHeight }]}>
          <Header
            LinearGradient={true}
            leftIcon={IC_BACK}
            leftAction={() => this.props.onclose()}
            headercolor={'transparent'}
            showTitleHeader={this.state.isShowTitleHeader}
            center={
              <View>
                <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{LG.NOTIFICATION_TXT_TITLE}</Text>
              </View>
            }
            renderViewRight={
              <Button
                onPress={() => this._openModalSelectUnit()}
                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
              >
                <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: 14 }}>{unitActive.fullUnitCode}</Text>
                <Image source={IC_DROPDOWN} style={{ marginLeft: 10 }} />
              </Button>
            }
          />
          <LinearGradient
            colors={['#4A89E8', '#8FBCFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: width, marginBottom: 20 }}
          >
            <HeaderTitle title={LG.NOTIFICATION_TXT_TITLE} />
          </LinearGradient>
        </Animated.View>

        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalSelectUnit}>
          <ModalSelectUnit onClose={() => this.setState({ isModalSelectUnit: false })} />
        </Modal>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  item: {
    width: width - 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 5
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden'
  }
});
