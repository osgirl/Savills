import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StatusBar, Animated, FlatList, Platform, RefreshControl } from 'react-native';
import { Header, Button, ModalSelectUnit, HeaderTitle, PlaceHolderItemH } from '@components';

import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

import IC_CHECK_BLUE from '@resources/icons/check_blue_fee.png';
import IC_CHECKED from '@resources/icons/checked_fee.png';
import IC_HISTORY from '@resources/icons/history_fee.png';
import IC_BACK from '@resources/icons/back-light.png';
import IC_DROPDOWN from '@resources/icons/dropDown.png';
import IC_CHECK_WHITE from '@resources/icons/check_fee.png';
import IC_CHECKED_WHITE from '@resources/icons/checked_white_fee.png';
import IC_EVENTEMTY from '@resources/icons/Events_emty.png';
import IC_PAY from '@resources/icons/pay.png';

import ModalConfirm from './components/modalConfirm';
import ModalHistory from './components/modalHistory';
import Resolution from '@utils/resolution';
import ModalSuccess from './components/modalSuccess';
import ModalReceip from './components/modalReceip';

import { isIphoneX } from '@utils/func';

import Utils from '@utils';

import Styles from './styles';

const { width, height } = Dimensions.get('window');

const HEADER_MAX_HEIGHT = Resolution.scale(50);

export default class extends Component {

  handleScroll = event => {
    const scrollSensitivity = 4;
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
      {
        listener: event => {
          const offset = event.nativeEvent.contentOffset.y / scrollSensitivity;
          this.state.scrollY.setValue(offset);
        }
      },
      { useNativeDriver: true }
    )(event);
  };

  onScroll = e => {
    const scrollSensitivity = 4;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.state.scrollY.setValue(offset);
  };

  renderEmty(lanauges) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: Resolution.scale(60) }}>
        <Image source={IC_EVENTEMTY} />
        <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#343D4D' }}>
          {lanauges.FEE_EMPTY_EVENT_1}
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#343D4D' }}>
          {lanauges.FEE_EMPTY_EVENT_2}
        </Text>
      </View>
    );
  }

  render() {
    let unitActive = this.props.units.unitActive;

    const headertitleHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT / 3],
      outputRange: [HEADER_MAX_HEIGHT, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const headertitleHeightTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT / 3],
      outputRange: [0, -HEADER_MAX_HEIGHT],
      extrapolate: 'clamp'
    });

    const opacityTextTitle = this.state.scrollY.interpolate({
      inputRange: [0, Resolution.scale(20)],
      outputRange: [1, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const opacityView1 = this.state.scrollY.interpolate({
      inputRange: [Resolution.scale(20), Resolution.scale(40)],
      outputRange: [1, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const opacityView2 = this.state.scrollY.interpolate({
      inputRange: [0, Resolution.scale(39), Resolution.scale(40)],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const headerHeightContentTop = this.state.scrollY.interpolate({
      inputRange: [Resolution.scale(20), Resolution.scale(40)],
      outputRange: [Resolution.scale(60), 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const opacityTextHeader = this.state.scrollY.interpolate({
      inputRange: [0, Resolution.scale(20)],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    // TODO LANGUAGE LOCAL
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    let checkAll =
      this.props.fee.listUserFee.result && this.state.listFeeSelected.length === this.props.fee.listUserFee.result.items.length
        ? true
        : false;
    let checkDisabledPay = this.state.listFeeSelected.length <= 0 ? true : false;
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        <StatusBar barStyle="light-content" />
        <Header
          LinearGradient={true}
          leftIcon={IC_BACK}
          leftAction={() => this.props.navigation.goBack()}
          headercolor={'transparent'}
          showTitleHeader={true}
          center={
            <Animated.View style={{ opacity: opacityTextHeader }}>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.FEE_TXT_FEE}</Text>
            </Animated.View>
          }
          renderViewRight={
            <Button
              onPress={() => this.setState({ isModalSelectUnit: true })}
              style={{ flexDirection: 'row', alignItems: 'center', marginRight: Resolution.scale(20) }}
            >
              <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: Resolution.scale(14) }}>
                {unitActive.fullUnitCode}
              </Text>
              <Image source={IC_DROPDOWN} style={{ marginLeft: Resolution.scale(10) }} />
            </Button>
          }
        />

        {/* title top */}
        <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ zIndex: -2 }}>
          <Animated.View
            style={{
              height: headertitleHeight,
              transform: [{ translateY: headertitleHeightTranslate }]
            }}
          >
            <Animated.View style={{ opacity: opacityTextTitle, position: 'absolute' }}>
              <HeaderTitle title={languages.FEE_TXT_FEE} />
            </Animated.View>
          </Animated.View>
        </LinearGradient>

        <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ zIndex: -2, justifyContent: 'center' }}>
          {/* <Animated.View
            style={{
              // transform: [{ translateY: headerContentTopTranslate }],
              backgroundColor: 'blue'
            }}
          > */}
          <Animated.View
            style={{
              alignItems: 'center',
              opacity: opacityView1,
              height: headerHeightContentTop,
            }}
          >
            {/* <Text style={{ color: '#FFFFFF', fontSize: Resolution.scale(14), fontFamily: 'OpenSans-Semibold' }}>October / 2018</Text> */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: Resolution.scale(35), fontFamily: 'OpenSans-Semibold', color: '#FFF' }}>
                {Utils.convertNumber(this.state.totalPay)}
              </Text>
              <Text
                style={{
                  fontSize: Resolution.scale(20),
                  fontFamily: 'OpenSans-Semibold',
                  color: '#FFF',
                  textAlign: 'right',
                  marginLeft: Resolution.scale(10)
                }}
              >
                VND
                </Text>
            </View>
            <Text style={{ fontSize: Resolution.scale(14), fontFamily: 'OpenSans-Semibold', color: '#FFF', opacity: 0.5 }}>
              {unitActive.fullUnitCode}
            </Text>
          </Animated.View>

          <Animated.View style={{ opacity: opacityView2, }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: Resolution.scale(20),
                height: 60
              }}
            >
              <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                {/* <Text style={{ color: '#FFFFFF', fontSize: Resolution.scale(10), fontFamily: 'OpenSans-Semibold', textAlign: 'left' }}>October / 2018</Text> */}
                <Text
                  style={{
                    fontSize: Resolution.scale(12),
                    fontFamily: 'OpenSans-Semibold',
                    color: '#FFF',
                    opacity: 1,
                    textAlign: 'left'
                  }}
                >
                  {unitActive.fullUnitCode}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', alignSelf: 'center' }}>
                <Text
                  style={{
                    fontSize: Resolution.scale(12),
                    fontFamily: 'OpenSans-Semibold',
                    color: '#FFF',
                    textAlign: 'right',
                    marginRight: Resolution.scale(10),
                    paddingBottom: Resolution.scale(5)
                  }}
                >
                  VND
                  </Text>
                <Text style={{ fontSize: Resolution.scale(22), fontFamily: 'OpenSans-Semibold', color: '#FFF' }}>
                  {Utils.convertNumber(this.state.totalPay)}
                </Text>
              </View>
            </View>
          </Animated.View>
          {/* </Animated.View> */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: Resolution.scale(20),
              paddingVertical: Resolution.scale(10)
            }}
          >
            <Button onPress={() => this._addAllitem()} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={checkAll ? IC_CHECKED_WHITE : IC_CHECK_WHITE} style={{ marginRight: Resolution.scale(20) }} />
              <Text style={{ fontSize: Resolution.scale(12), fontFamily: 'OpenSans-Semibold', color: '#FFF' }}>
                {languages.FEE_TITLE_BTN_CHECKALL}
              </Text>
            </Button>
            <Button onPress={() => this._openModalHistory()} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: Resolution.scale(12),
                  fontFamily: 'OpenSans-Semibold',
                  color: '#FFF',
                  marginRight: Resolution.scale(20)
                }}
              >
                {languages.FEE_TITLE_BTN_HISTORY}
              </Text>
              <Image source={IC_HISTORY} />
            </Button>
          </View>
        </LinearGradient>


        {this.props.fee.listUserFee.result && this.props.fee.listUserFee.result.totalCount === 0 ? (
          this.renderEmty(languages)
        ) : this.state.data.length > 0 ? (
          <FlatList
            alwaysBounceVertical={false}
            data={this.state.data}
            refreshControl={<RefreshControl refreshing={this.state.isRefesh} onRefresh={() => this._onRefresh()} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item[0].id + '__' + index}
            onScroll={this.handleScroll}
            // onScroll={this.onScroll}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            ListFooterComponent={() => <View style={{ height: Resolution.scaleHeight(30) }} />}
            extraData={this.state}
          />
        ) : (
              <PlaceHolderItemH noMargin />
            )}
        {this.state.data.length > 0 ? (
          <View>
            <View
              style={{
                backgroundColor: '#FFF',
                width: width,
                height: isIphoneX() ? Resolution.scaleHeight(60) : Resolution.scaleHeight(40)
              }}
            />
            <Button
              disabled={checkDisabledPay}
              onPress={() => this._openModalConfirm()}
              style={[Styles.ButtonAdd, { backgroundColor: this.state.listFeeSelected.length > 0 ? '#01C772' : '#e0e0e0' }]}
            >
              {/* <Text style={{ color: '#F8F8F8', fontSize: Resolution.scale(14), fontFamily: 'OpenSans-SemiBold' }}>
                {languages.FEE_LIST_PAY}
              </Text> */}
              <Image source={IC_PAY} />
            </Button>
          </View>
        ) : null}

        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalSelectUnit}>
          <ModalSelectUnit onClose={() => this._closeModalSelectUnit()} />
        </Modal>

        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isShowModalConfirm}>
          <ModalConfirm
            onClose={() => this._closeModalConfirm()}
            onSuccess={() => this._openModalSuccess()}
            listFeeSelected={this.state.listFeeSelected}
          />
        </Modal>
        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isShowModalHistory}>
          <ModalHistory onClose={() => this._closeModalHistory()} />
        </Modal>
        <Modal isVisible={this.state.isShowModalDetail} style={{ flex: 1, margin: 0, height: height }}>
          <ModalReceip idReceip={this.state.idReceip} onClose={() => this.setState({ isShowModalDetail: false })} />
        </Modal>
        <Modal isVisible={this.state.isShowModalSuccess} style={{ flex: 1, margin: 0, height: height }}>
          <ModalSuccess
            onClose={() => this._closeModalSuccess()}
            goDetail={(id) => this._openDetailOrder(id, true)}
            message="Thanh  toán thành công ."
          />
        </Modal>
      </View>
    );
  }

  renderItem(item, index, loading) {
    return (
      <View>
        <View style={{ marginHorizontal: Resolution.scale(20), marginVertical: Resolution.scale(20) }}>
          <Text style={{ color: '#505E75', fontSize: Resolution.scale(14), fontFamily: 'OpenSans-Bold' }}>
            {item[0].package.period + '-' + item[0].package.year}
          </Text>
        </View>
        {item.map((data, index) => {
          let check = this.state.listFeeSelected.some(e => e.id === data.id);
          return (
            <Button
              key={data.id + 'itemFee____' + index}
              onPress={() => this._addItemListFeeSelected(data)}
              style={{
                padding: Resolution.scale(20),
                backgroundColor: '#FFFFFF',
                borderRadius: 5,
                marginBottom: Resolution.scale(10),
                marginHorizontal: Resolution.scale(20)
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Image source={check ? IC_CHECKED : IC_CHECK_BLUE} style={{ marginRight: Resolution.scale(20) }} />
                  <View style={{}}>
                    <Text
                      numberOfLines={2}
                      style={{ flex: 0.6, fontSize: Resolution.scale(12), color: '#343D4D', fontFamily: 'OpenSans-SemiBold' }}
                    >
                      {data.feeType.typeName}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{ flex: 0.6, fontSize: Resolution.scale(13), color: '#DEDEDE', fontFamily: 'OpenSans-SemiBold' }}
                    >
                      {data.fullUnitCode}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 0.7, alignItems: 'flex-end', }}>
                  <Text style={{ color: '#BABFC8', fontSize: Resolution.scale(14), fontFamily: 'OpenSans-SemiBold' }}>
                    {Utils.convertNumber(data.totalAmount) + 'đ'}
                  </Text>
                </View>
              </View>
            </Button>
          );
        })}
      </View>
    );
  }
}
