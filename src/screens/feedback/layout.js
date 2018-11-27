import React, { Component } from 'react';
import { View, Text, Animated, FlatList, Image, StatusBar, Dimensions, ActivityIndicator } from 'react-native';
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
import ModaDetailFeedback from './component/modaDetailFeedback';
import Modal from 'react-native-modal';
import ModalNew from './component/modalNew';
import Styles from './styles';

import Resolution from '../../utils/resolution';

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
      <View style={{ height: Resolution.scaleHeight(50), justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Configs.colorMain} />
      </View>
    ) : (
      <View style={{ height: Resolution.scale(40) }} />
    );
  }

  renderHeader() {
    let unitActive = this.props.units.unitActive;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [-10, 40, 60],
      outputRange: [60, 40, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    return (
      <View>
        <Header
          LinearGradient={true}
          leftIcon={IC_BACK}
          leftAction={() => this.props.navigation.goBack()}
          headercolor={'transparent'}
          showTitleHeader={this.state.isShowTitleHeader}
          center={
            <View>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{'Feedback'}</Text>
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
        <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <Animated.View style={{ height: headerHeight }}>
            <HeaderTitle title={'Feedback'} />
          </Animated.View>
        </LinearGradient>
      </View>
    );
  }

  render() {
    let unitActive = this.props.units.unitActive;
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        <StatusBar barStyle="light-content" />
        {this.renderHeader()}
        <FlatList
          data={this.state.data || []}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.commentBoxId + '__' + index}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          extraData={this.state}
          refreshing={this.state.isRefresh}
          onRefresh={() => this._onRefresh()}
          onEndReached={() => this._onEndReached()}
          onEndReachedThreshold={0.01}
          legacyImplementation={false}
          ListFooterComponent={() => this._FooterFlatlist()}
        />
        <View
          style={{
            backgroundColor: '#FFF',
            width: width,
            height: isIphoneX() ? Resolution.scaleHeight(60) : Resolution.scaleHeight(40)
          }}
        />
        <Button onPress={() => this._openModalNew()} style={[Styles.ButtonAdd, {}]}>
          <Image source={require('../../resources/icons/plush-addnew.png')} />
        </Button>
        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalSelectUnit}>
          <ModalSelectUnit onClose={() => this.setState({ isModalSelectUnit: false })} />
        </Modal>
        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalDetail}>
          <ModaDetailFeedback itemSelected={this.state.itemSelected} onClose={() => this.setState({ isModalDetail: false })} />
        </Modal>
        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalNew}>
          <ModalNew onClose={() => this._onCloseModalNew()} />
        </Modal>
      </View>
    );
  }

  renderItem = (item, index) => {
    let date = moment(item.createdAt).format('l');
    let time = moment(item.createdAt).format('LT');
    return (
      <Button
        onPress={() => this._openModalDetail(item)}
        style={{
          width: width - Resolution.scale(40),
          borderRadius: 10,
          marginTop: index === 0 ? Resolution.scale(20) : Resolution.scale(10),
          backgroundColor: '#FFF',
          padding: Resolution.scale(20),
          marginHorizontal: Resolution.scale(20)
        }}
      >
        <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <View style={{ borderRadius: 5, backgroundColor: '#505E75', width: Resolution.scaleWidth(70), alignItems: 'center' }}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: Resolution.scale(12),
                  fontWeight: 'bold',
                  marginVertical: Resolution.scale(5),
                  marginHorizontal: Resolution.scale(15)
                }}
              >
                #{item.commentBoxId}
              </Text>
            </View>
            <Text
              style={{ color: '#505E75', fontWeight: 'bold', fontSize: Resolution.scale(13), marginTop: Resolution.scale(12) }}
            >
              {item.fullUnitCode}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            marginVertical: Resolution.scale(15),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ marginRight: Resolution.scale(10) }} source={require('../../resources/icons/clock.png')} />
            <Text style={{ color: '#C9CDD4', fontSize: 12 }}>{time}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ marginRight: Resolution.scale(10) }} source={require('../../resources/icons/calendar.png')} />
            <Text style={{ color: '#C9CDD4', fontSize: Resolution.scale(12) }}>{date}</Text>
          </View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: item && item.commentBoxStatus.colorCode
            }}
          >
            <Text
              style={{
                color: '#F8F8F8',
                fontSize: Resolution.scale(10),
                paddingVertical: Resolution.scale(5),
                fontWeight: 'bold',
                paddingHorizontal: Resolution.scale(15)
              }}
            >
              {item && item.commentBoxStatus.statusCode}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: item.lastComment ? '#4A89E8' : '#D4D7DC',
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: Resolution.scale(10),
            paddingVertical: Resolution.scale(5)
          }}
        >
          <Text style={{ flex: 1, color: '#FFF', fontSize: Resolution.scale(12), fontWeight: 'bold' }} numberOfLines={1}>
            {item.lastComment ? item.lastComment : 'No comment'}
          </Text>
        </View>
      </Button>
    );
  };
}
