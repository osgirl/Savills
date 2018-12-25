import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Image, FlatList, Platform, ScrollView } from 'react-native';

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

import IC_EVENTEMTY from '@resources/icons/Events_emty.png';

import Header from '@components/header';

import { ItemPlaceHolderH } from '@components/placeHolderItem';

import ModalReceip from './modalReceip';

const { width, height } = Dimensions.get('window');
import AnimatedTitle from '@components/animatedTitle';

import Language from '../../../utils/language';

const HEADER_MAX_HEIGHT = 60;

class modalHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0),
      scrollYDetail: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0),
      isShowTitleHeader: false,
      isShowModal: false,
      isShowModalDetail: false,
      data: [],
      idReceip: null
    };
  }

  componentDidMount() {
    let unitActive = this.props.units.unitActive;
    let accessTokenApi = this.props.account.accessTokenAPI;
    let languege = Language.listLanguage[this.props.app.languegeLocal].id;
    setTimeout(() => {
      this.props.actions.fee.getListHistory(accessTokenApi, languege, unitActive.fullUnitCode);
    }, 300);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fee.history !== nextProps.fee.history && nextProps.fee.history.success) {
      this.setState({ data: nextProps.fee.history.result.items });
    }
  }

  handleScroll = event => {
    Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {}, { useNativeDriver: true })(event);
  };

  _openModalDetail(id) {
    this.setState({ idReceip: id });
    setTimeout(() => {
      this.setState({ isShowModalDetail: true });
    }, 200);
  }

  renderEmty(languages) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: Resolution.scale(60) }}>
        <Image source={IC_EVENTEMTY} />
        <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#343D4D' }}>
          {languages.FEE_EMPTY_BILL}
        </Text>
      </View>
    );
  }

  render() {
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    return (
      <View style={[styles.container, {}]}>
        {this.renderHeader(languages)}
        {this.props.fee.history.result && this.props.fee.history.result.totalCount === 0 ? (
          this.renderEmty(languages)
        ) : this.state.data.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.data}
            renderItem={({ item, index }) => this.renderItem(item)}
            keyExtractor={(item, index) => item.id.toString()}
            onScroll={this.handleScroll}
            onEndReachedThreshold={0.01}
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
            ListFooterComponent={() => <View style={{ height: 20 }} />}
          />
        ) : (
          <ItemPlaceHolderH />
        )}
        <Modal isVisible={this.state.isShowModalDetail} style={{ flex: 1, margin: 0, height: height }}>
          <ModalReceip idReceip={this.state.idReceip} onClose={() => this.setState({ isShowModalDetail: false })} />
        </Modal>
      </View>
    );
  }

  renderItem(item, index) {
    let date = moment(item.creationTime).format('l');
    return (
      <View style={{ width: width - 40, marginHorizontal: 20 }}>
        <Text style={{ fontSize: 14, color: '#505E75', fontFamily: 'OpenSans-Bold', marginVertical: 10 }}>{date}</Text>
        <Button onPress={() => this._openModalDetail(item.id)} style={{ flexDirection: 'row', borderRadius: 5 }}>
          <View style={{ flexDirection: 'column', backgroundColor: '#FFFFFF', borderRadius: 5, padding: 20, flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
              <Text numberOfLines={2} style={{ fontSize: 13, flex: 0.4, fontFamily: 'OpenSans-SemiBold', color: '#BABFC8' }}>
                {'Invoice #'}
              </Text>
              <Text
                numberOfLines={2}
                style={{ flex: 1, fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#343D4D', textAlign: 'right' }}
              >
                {item.receiptNumber}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, flex: 1 }}>
              <Text numberOfLines={2} style={{ fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#DEDEDE', flex: 0.4 }}>
                {item.fullUnitCode}
              </Text>
              <Text
                numberOfLines={2}
                style={{ fontSize: 14, fontFamily: 'OpenSans-Bold', color: '#BABFC8', flex: 1, textAlign: 'right' }}
              >
                {Utils.convertNumber(item.paidAmount) + ' VND'}
              </Text>
            </View>
          </View>
        </Button>
      </View>
    );
  }

  renderHeader(languages) {
    const opacityTextHeader = this.state.scrollY.interpolate({
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
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.FEE_HT_TXTHEADER}</Text>
            </Animated.View>
          }
        />
        <AnimatedTitle scrollY={this.state.scrollY} label={languages.FEE_HT_TXTHEADER} />
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

export default Connect(modalHistory);
