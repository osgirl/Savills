import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Image,
  FlatList,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import Connect from '@stores';
import LinearGradient from 'react-native-linear-gradient';
import Resolution from '@utils/resolution';
import Button from '@components/button';
import IC_CLOSE from '@resources/icons/close.png';
import IC_CALENDAR from '@resources/icons/calendar.png';
import IC_CLOCK from '@resources/icons/clock.png';
import moment from 'moment';
import Modal from 'react-native-modal';
import HeaderTitle from '@components/headerTitle';
import { isIphoneX } from '@utils/func';
import Utils from '@utils';
import _ from 'lodash';

import IC_EVENTEMTY from '@resources/icons/Events_emty.png';

import Header from '@components/header';

import { ItemPlaceHolderH } from '@components/placeHolderItem';

const { width, height } = Dimensions.get('window');
import AnimatedTitle from '@components/animatedTitle';
import Configs from '../../../utils/configs';

import Language from '../../../utils/language';

const HEADER_MAX_HEIGHT = 60;

class modalReceip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollYDetail: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0),
      isShowTitleHeader: false,
      data: null
    };
  }

  componentDidMount() {
    this._getDetail();
  }

  handleScrollDetail = event => {
    Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollYDetail } } }], {}, { useNativeDriver: true })(event);
  };

  _getDetail() {
    const { idReceip } = this.props;
    let accessTokenApi = this.props.account.accessTokenAPI;
    let languege = Language.listLanguage[this.props.app.languegeLocal].id;
    setTimeout(() => {
      this.props.actions.fee.getDetailHistory(accessTokenApi, languege, idReceip);
    }, 300);
  }

  renderLoading = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
      <ActivityIndicator size={'large'} color={Configs.colorMain} />
    </View>
  );

  render() {
    const { detailHistory } = this.props.fee;

    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    return (
      <View style={{ backgroundColor: '#F6F8FD', flex: 1 }}>
        {this.renderHeaderDetail(languages)}
        <AnimatedTitle scrollY={this.state.scrollYDetail} label={languages.FEE_RECEIPT_TITLEHEADER} />
        {_.isEmpty(detailHistory) ? (
          this.renderLoading()
        ) : (
          <ScrollView
            alwaysBounceVertical={false}
            scrollEventThrottle={16}
            onScroll={this.handleScrollDetail}
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
            <View>
              <View style={{ padding: 20, flex: 1 }}>
                <View style={{ backgroundColor: '#FFF', borderRadius: 5, padding: Resolution.scale(20) }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <Text style={{ flex: 0.4, fontFamily: 'OpenSans-SemiBold', fontSize: 13, color: '#BABFC8' }}>
                      {languages.FEE_RECEIPT_NO + ' :'}
                    </Text>
                    <Text style={{ flex: 1, fontFamily: 'OpenSans-Bold', fontSize: 14, textAlign: 'right', color: '#505E75' }}>
                      {detailHistory && detailHistory.receiptNumber}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: Resolution.scale(20)
                    }}
                  >
                    <Text style={{ flex: 0.4, fontFamily: 'OpenSans-SemiBold', fontSize: 13, color: '#BABFC8' }}>
                      {languages.FEE_RECEIPT + ' :'}
                    </Text>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 14, textAlign: 'right', color: '#505E75' }}>
                        {detailHistory.feePayer && detailHistory.feePayer.email}
                      </Text>
                      <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 14, textAlign: 'right', color: '#505E75' }}>
                        {detailHistory.feePayer && detailHistory.feePayer.phoneNumber}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ flex: 0.5, fontFamily: 'OpenSans-SemiBold', fontSize: 13, color: '#BABFC8' }}>
                      {languages.FEE_RECEIPT_METHOD + ' :'}
                    </Text>
                    <Text style={{ flex: 1, fontFamily: 'OpenSans-Bold', fontSize: 14, textAlign: 'right', color: '#505E75' }}>
                      {detailHistory.paymentChanel && detailHistory.paymentChanel.name}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: width - 80,
                      height: 1,
                      backgroundColor: '#DEDEDE',
                      opacity: 0.5,
                      marginHorizontal: Resolution.scale(20),
                      marginVertical: Resolution.scale(20)
                    }}
                  />

                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ flex: 0.4, fontFamily: 'OpenSans-SemiBold', fontSize: 13, color: '#BABFC8' }}>
                      {languages.FEE_RECEIPT_TOTAL + ' :'}
                    </Text>
                    <Text style={{ flex: 1, fontFamily: 'OpenSans-Bold', fontSize: 20, textAlign: 'right', color: '#505E75' }}>
                      {detailHistory.incommingDetails && Utils.convertNumber(detailHistory.paidAmount) + ' VND'}
                    </Text>
                  </View>
                </View>
              </View>

              <Text
                style={{ fontFamily: 'OpenSans-Bold', fontSize: 15, color: '#BABFC8', marginHorizontal: 20, marginBottom: 20 }}
              >
                {languages.FEE_RECEIPT_TITLE_DETAIL}
              </Text>

              <View style={{ paddingHorizontal: 20 }}>
                {detailHistory.incommingDetails &&
                  detailHistory.incommingDetails.map(data => {
                    console.log(data);
                    return (
                      <View
                        key={data.incomingId + '__'}
                        style={{ padding: 20, backgroundColor: '#FFFFFF', borderRadius: 5, marginBottom: 10 }}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: width - 165 }}>
                              <Text numberOfLines={2} style={{ fontSize: 12, color: '#343D4D', fontFamily: 'OpenSans-SemiBold' }}>
                                {data.feeDetail.description}
                              </Text>
                              <Text numberOfLines={1} style={{ fontSize: 13, color: '#DEDEDE', fontFamily: 'OpenSans-SemiBold' }}>
                                {data.feeDetail.fullUnitCode}
                              </Text>
                            </View>
                          </View>
                          <View>
                            <Text style={{ color: '#BABFC8', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>
                              {'VND ' + Utils.convertNumber(data.paidAmount)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }

  renderHeaderDetail(languages) {
    const opacityTextHeader = this.state.scrollYDetail.interpolate({
      inputRange: [0, 10],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    return (
      <View>
        <Header
          LinearGradient={true}
          leftIcon={IC_CLOSE}
          leftAction={() => this.props.onClose()}
          headercolor={'transparent'}
          showTitleHeader={true}
          center={
            <Animated.View style={{ opacity: opacityTextHeader }}>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.FEE_RECEIPT_TITLEHEADER}</Text>
            </Animated.View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FD'
  }
});

export default Connect(modalReceip);
