import React, { Component } from 'react';
import { View, Text, Platform, Image, FlatList, RefreshControl, Dimensions, StatusBar, Animated } from 'react-native';
import { Button, FastImage, ModalSelectUnit, Header, AnimatedTitle, PlaceHolderItemH } from '@components';

import call from 'react-native-phone-call';
import Modal from 'react-native-modal';

import IC_CALL from '@resources/icons/Call-button.png';
import IC_BACK from '@resources/icons/back-light.png';
import IC_DROPDOWN from '@resources/icons/dropDown.png';
import IC_AVATARDF from '@resources/icons/avatar-default.png';

import Style from './style';
import Resolution from '@utils/resolution';

const HEADER_MAX_HEIGHT = 60;
const { width } = Dimensions.get('window');

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isRefresh: false
    };
  }

  componentWillMount() {
    this._getEmployeesByOu();
  }

  _getEmployeesByOu() {
    let accessTokenAPI = this.props.account.accessTokenAPI;
    this.props.actions.units.getEmployeesByOu(accessTokenAPI);
  }

  async _onRefresh() {
    if (this.state.isRefresh) {
      return;
    }
    await this.setState({ isRefresh: true });
    await this._getEmployeesByOu();
  }

  _call(number) {
    const args = {
      number: number,
      prompt: false
    };
    call(args).catch(console.error);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.units.employeesByOu !== nextProps.units.employeesByOu && nextProps.units.employeesByOu.success) {
      this.setState({ data: nextProps.units.employeesByOu.result.items, isRefresh: false });
    }
  }

  handleScroll = event => {
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
      {
        listener: event => {
          if (event.nativeEvent.contentOffset.y > 10) {
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

  renderHeader() {
    let unitActive = this.props.units.unitActive;
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
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
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.CONTACTS_TXT_TITLE}</Text>
            </View>
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
        <AnimatedTitle scrollY={this.state.scrollY} label={languages.CONTACTS_TXT_TITLE} />
      </View>
    );
  }

  renderItem(item) {
    let encToken = this.props.account.encToken;
    let image = item.user.fileUrl ? `${item.user.fileUrl}&encToken=${encodeURIComponent(encToken)}` : IC_AVATARDF;
    return (
      <Button
        activeOpacity={1}
        onPress={() => {}}
        style={[
          {
            marginHorizontal: Resolution.scale(20),
            width: width - Resolution.scale(40),
            backgroundColor: '#FFF',
            borderRadius: 5
          }
        ]}
      >
        <View
          style={{ flexDirection: 'row', padding: Resolution.scale(20), justifyContent: 'space-between', alignItems: 'center' }}
        >
          <FastImage
            style={{ width: Resolution.scale(50), height: Resolution.scale(50), borderRadius: Resolution.scale(50) / 2 }}
            source={image}
            resizeMode={'cover'}
          />
          <View style={{ flexDirection: 'column', marginHorizontal: Resolution.scale(20), flex: 3 }}>
            <Text
              numberOfLines={2}
              style={{
                color: '#505E75',
                fontSize: Resolution.scale(14),
                fontFamily: 'OpenSans-Bold',
                width: Resolution.scaleWidth(175)
              }}
            >
              {`${item.user.fullName} - ${item.user.customFields.JobTitle}`}
            </Text>
            <View style={{ flexDirection: 'column' }}>
              <Text numberOfLines={1} style={{ color: '#BABFC8', fontSize: Resolution.scale(10), fontFamily: 'OpenSans-Bold' }}>
                {item.user.emailAddress}
              </Text>
              <Text numberOfLines={1} style={{ color: '#BABFC8', fontSize: Resolution.scale(10), fontFamily: 'OpenSans-Bold' }}>
                {item.user.phoneNumber}
              </Text>
            </View>
          </View>
          <Button style={{ alignItems: 'flex-end' }} onPress={() => this._call(item.user.phoneNumber)}>
            <Image source={IC_CALL} />
          </Button>
        </View>
      </Button>
    );
  }

  render() {
    let unitActive = this.props.units.unitActive;
    return (
      <View style={Style.container}>
        <StatusBar barStyle="light-content" />
        {this.renderHeader()}
        {this.props.units.employeesByOu && this.props.units.employeesByOu.success ? (
          <FlatList
            alwaysBounceVertical={false}
            data={this.state.data || []}
            contentContainerStyle={{
              paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0
            }}
            keyExtractor={item => item.user.id + ''}
            renderItem={({ item, index }) => this.renderItem(item)}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefresh}
                onRefresh={() => this._onRefresh()}
                // Android offset for RefreshControl
                progressViewOffset={HEADER_MAX_HEIGHT}
              />
            }
            onScroll={this.handleScroll}
            scrollEventThrottle={16}
            legacyImplementation={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: Resolution.scale(10) }} />}
            ListHeaderComponent={() => <View style={{ height: Resolution.scale(20) }} />}
            ListFooterComponent={() => <View style={{ height: Resolution.scale(20) }} />}
            contentInset={{
              top: HEADER_MAX_HEIGHT
            }}
            contentOffset={{
              y: -HEADER_MAX_HEIGHT
            }}
          />
        ) : (
          <PlaceHolderItemH />
        )}

        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalSelectUnit}>
          <ModalSelectUnit onClose={() => this.setState({ isModalSelectUnit: false })} />
        </Modal>
      </View>
    );
  }
}
