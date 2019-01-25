import React, { Component } from 'react';
import {
  StyleSheet, Text, View, ScrollView, Dimensions, Image,
  Animated, Platform, ActivityIndicator, Alert, TouchableOpacity, WebView,
} from 'react-native';
import { Header, AnimatedTitle } from '@components';

import Connect from '@stores';

import IC_CLOSE from '@resources/icons/close.png';

import Resolution from '@utils/resolution';
import { isIphoneX } from '@utils/func';
import Utils from '@utils';
import Payoo from '@utils/payoo';
import ModalFaild from './modalFaild';
import Button from '@components/button';
import Configs from '@utils/configs';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import IC_PAY from '@resources/icons/pay.png';
const HEADER_MAX_HEIGHT = Resolution.scale(60);
const { width } = Dimensions.get('window');


class modalConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      scrollY: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0),
      isShowTitleHeader: false,
      isShowModalFaild: false,
      loading: false,
      errorPay: '',
      isAccept: true,
      isShowTerm: false,
    };
  }

  handleScroll = event => {
    Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {}, { useNativeDriver: true })(event);
  };

  _openModalFaild = () => {
    setTimeout(() => {
      this.setState({ isShowModalFaild: true });
    }, 200);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.fee.createOrder !== nextProps.fee.createOrder && nextProps.fee.createOrder.success) {
      this.setState({ loading: false });
      let orderXML = nextProps.fee.createOrder.result.orderXml;
      let orderChecksum = nextProps.fee.createOrder.result.orderChecksum;
      let accessTokenApi = nextProps.account.accessTokenAPI || '';
      let orderId = nextProps.fee.createOrder.result.orderId || '';
      this._payment(orderXML, orderChecksum);
      this.props.actions.fee.getOrderId(accessTokenApi, orderId);
    }

    if (this.props.fee.createOrder !== nextProps.fee.createOrder && !nextProps.fee.createOrder.success) {
      this.setState({ loading: false });

      if (nextProps.fee.createOrder.error && nextProps.fee.createOrder.error.message.length > 0)
        Alert.alert('Comming soon', nextProps.fee.createOrder.error.message, [{ text: 'OK', onPress: () => { } }], {
          cancelable: false
        });
    }
  }

  _createOrder = async () => {
    await this.setState({ loading: true });
    const accessTokenApi = this.props.account.accessTokenAPI;
    const deviceID = Platform.OS === 'ios' ? 1 : 0;
    const { listFeeSelected } = this.props;
    let listID = [];
    listFeeSelected.map(item => {
      listID.push(item.id);
    });
    await this.props.actions.fee.createOrder(accessTokenApi, deviceID, listID);
  };

  _payment = async (orderXML, orderChecksum) => {
    const { languegeLocal } = this.props.app;
    await Payoo.pay(languegeLocal, orderXML, orderChecksum, response => {
      if (response.status === 0) {
        this.props.onClose();
        setTimeout(() => {
          this.props.onSuccess();
        }, 300);
      } else if (response.status !== 3) {
        this.handleErrorMess(response.code || 0);
        setTimeout(() => {
          this._openModalFaild();
        }, 300);
      }
    });
  };

  handleErrorMess = async code => {
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    let errorString = await Payoo.handleErrorMess(code, languages);
    await this.setState({ errorPay: errorString });
  };

  render() {
    let data = this.props.listFeeSelected || [];
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    let serviceFee = 0;
    let summary = 0;
    let total = 0;
    data.map(item => {
      serviceFee += item.serviceAmount;
      summary += item.debitAmount;
    });
    total = summary + serviceFee;

    return (
      <View style={[styles.container, {}]}>
        {this.renderHeader(languages)}
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0
          }}
          contentInset={{
            top: HEADER_MAX_HEIGHT
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT
          }}
        >
          <View
            style={{
              marginHorizontal: Resolution.scale(20),
              paddingVertical: Resolution.scale(20),
              width: width - Resolution.scaleWidth(40),
              borderRadius: 5,
              backgroundColor: '#FFF',
              marginTop: Resolution.scale(20)
            }}
          >
            {data.map((item, index) => this.renderItem(item, index))}
          </View>

          <View
            style={{
              marginHorizontal: Resolution.scale(20),
              backgroundColor: '#FFF',
              borderRadius: 5,
              marginTop: Resolution.scale(20),
              marginBottom: Resolution.scale(40)
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: Resolution.scale(20),
                paddingHorizontal: Resolution.scale(20)
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{ textAlign: 'left', color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}
                >
                  {languages.FEE_DO_SUMMARY}
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    paddingVertical: Resolution.scale(20),
                    color: '#BABFC8',
                    fontSize: Resolution.scale(13),
                    fontFamily: 'OpenSans-SemiBold'
                  }}
                >
                  {languages.FEE_DO_SERVICE_FEE}
                </Text>
              </View>
              <View style={{ flex: 0.8 }}>
                <Text
                  numberOfLines={1}
                  style={{ textAlign: 'right', fontSize: Resolution.scale(13), color: '#505E75', fontFamily: 'OpenSans-Bold' }}
                >
                  {Utils.convertNumber(summary) + ' VND'}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    textAlign: 'right',
                    paddingVertical: Resolution.scale(20),
                    fontSize: Resolution.scale(13),
                    color: '#505E75',
                    fontFamily: 'OpenSans-Bold'
                  }}
                >
                  {Utils.convertNumber(serviceFee) + ' VND'}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#E6EEFB',
                flexDirection: 'row',
                marginHorizontal: Resolution.scale(10),
                borderRadius: 5,
                marginBottom: Resolution.scale(20),
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  padding: Resolution.scale(10),
                  color: '#BABFC8',
                  fontSize: Resolution.scale(13),
                  fontFamily: 'OpenSans-SemiBold'
                }}
              >
                {languages.FEE_DO_TXT_TOTAL}
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: Resolution.scale(16),
                  color: '#505E75',
                  fontFamily: 'OpenSans-Bold',
                  textAlign: 'right'
                }}
              >
                {Utils.convertNumber(total) + ' VND'}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            width: width,
            height: 100,
            backgroundColor: '#FFF',
            paddingTop: 5,
            paddingBottom: 20,
            paddingHorizontal: 20
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              disabled={this.state.loading}
              style={{ flex: 1 }} onPress={() => this.setState({ isShowTerm: true })}>
              <Text style={{ color: '#4A89E8', fontSize: 12, textDecorationLine: 'underline', fontFamily: 'OpenSans-Italic' }}>
                {languages.FEE_DO_BTN_TITLE_TERM || 'FEE_DO_BTN_TITLE_TERM'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ isAccept: !this.state.isAccept })}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ color: '#505E75', fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}>
                {languages.FEE_DO_BTN_TITLE_ACCEPT || 'FEE_DO_BTN_TITLE_ACCEPT'}
              </Text>
              <Image
                style={{ marginLeft: 5, width: 17, height: 17 }}
                source={
                  this.state.isAccept
                    ? require('../../../resources/icons/checked.png')
                    : require('../../../resources/icons/check.png')
                }
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={!this.state.isAccept || this.state.loading}
            onPress={() => this._createOrder()}
            style={{
              width: width - 40,
              height: 30,
              backgroundColor: this.state.isAccept && !this.state.loading ? '#01C772' : '#DEDEDE',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {
              this.state.loading ?
                (
                  <ActivityIndicator size="small" color={Configs.colorMain} />
                ) :
                (
                  <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{languages.FEE_DO_BTN_TITLE_PAY || 'FEE_DO_BTN_TITLE_PAY'}</Text>
                )
            }

          </TouchableOpacity>
        </View>

        <ModalFaild
          isVisible={this.state.isShowModalFaild}
          onClose={() => this.setState({ isShowModalFaild: false })}
          message={this.state.errorPay}
        />
        {this.renderModalRegulations(languages)}
      </View>
    );
  }

  renderModalRegulations = languages => {
    return (
      <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isShowTerm}>
        <View style={{ flex: 1, borderRadius: 5, paddingTop: 40, backgroundColor: '#FFF', marginVertical: Resolution.scale(20), marginHorizontal: Resolution.scale(20) }}>
          <TouchableOpacity
            style={{ position: 'absolute', top: 20, left: 20 }}
            onPress={() => this.setState({ isShowTerm: false })}
          >
            <Image source={require('../../../resources/icons/close-black.png')} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <WebView
              source={{ uri: 'https://savills.spms.asia/termsandconditions/privacy-policy.html#third-party-and-fee' }}
              scalesPageToFit={Platform.OS === 'android' ? true : false}
              automaticallyAdjustContentInsets={false}
            />
          </View>
          <Button
            style={{
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFF',
              paddingVertical: Resolution.scale(10),
            }}
            onPress={() => this.setState({ isShowTerm: false, isAccept: true })}
          >
            <LinearGradient
              colors={['#4A89E8', '#8FBCFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50, width: width - 80, }}
            >
              <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: 'Opensans-SemiBold' }}>
                {languages.FEE_DO_BTN_TITLE_ACCEPT_CONFIRM || 'FEE_DO_BTN_TITLE_ACCEPT_CONFIRM'}
              </Text>
            </LinearGradient>
          </Button>
        </View>
      </Modal>
    );
  };

  renderItem(item, index) {
    return (
      <View
        key={item.id + '__detailOrder'}
        style={[styles.item, { flexDirection: 'row', marginHorizontal: Resolution.scale(20), flex: 1, borderRadius: 5 }]}
      >
        <View style={{ alignSelf: 'flex-start', flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: index === 0 ? 0 : Resolution.scale(20),
              flex: 1
            }}
          >
            <View style={{ flex: 1 }}>
              <Text numberOfLines={2} style={{ fontSize: Resolution.scale(14), fontFamily: 'OpenSans-Bold' }}>
                {item.feeType.typeName}
              </Text>
            </View>
            <View
              style={{
                flex: 0.7
              }}
            >
              <Text
                numberOfLines={2}
                style={{
                  fontSize: Resolution.scale(14),
                  fontFamily: 'OpenSans-Bold',
                  textAlign: 'right'
                }}
              >
                {Utils.convertNumber(item.debitAmount) + ' VND'}
              </Text>
            </View>
          </View>
          <Text numberOfLines={2} style={{ color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  }

  renderHeader(languages) {
    let dateSelected = this.props.dateSelected;
    return (
      <View>
        <Header
          LinearGradient={true}
          leftIcon={IC_CLOSE}
          leftAction={() => this.props.onClose()}
          headercolor={'transparent'}
          showTitleHeader={this.state.isShowTitleHeader}
          center={
            <View>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.FEE_DO_TITLEHEADER}</Text>
            </View>
          }
        />
        <AnimatedTitle scrollY={this.state.scrollY} label={languages.FEE_DO_TITLEHEADER} />
      </View>
    );
  }

  _openModal(item) {
    this.setState({ itemSelected: item });
    this.setState({ isShowModal: true });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FD'
  },

  ButtonAdd: {
    borderRadius: 25,
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: isIphoneX() ? 30 : 20,
    left: width / 2 - 25,
    // backgroundColor: '#01C772',
    // backgroundColor: '#e0e0e0',
    // shadowColor: '#4DD49A',
    // shadowOffset: {width: 3, height: 6 },
    // shadowOpacity: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Connect(modalConfirm);
