import React, { Component } from 'react';
import { View, Text, Animated, Image, StatusBar, Dimensions, ScrollView, Platform } from 'react-native';
import Modal from 'react-native-modal';
import Picker from 'react-native-wheel-picker';

import { Header, Button, ModalSelectUnit, ButtonSwitch, AnimatedTitle } from '@components';

import IC_BACK from '@resources/icons/close.png';
import IC_ARROWRIGHT from '@resources/icons/arrow_seemore.png';
import Resolution from '../../utils/resolution';

import Styles from './styles';

import Language from '@utils/language';

const { width } = Dimensions.get('window');

var PickerItem = Picker.Item;

const HEADER_MAX_HEIGHT = Resolution.scale(60);

export default class extends Component {
  handleScroll = event => {
    Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {}, { useNativeDriver: true })(event);
  };

  renderHeader(languages) {
    const isShow = this.state.scrollY.interpolate({
      inputRange: [0, 15],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    let unitActive = this.props.units.unitActive;
    return (
      <View>
        <Header
          LinearGradient={true}
          leftIcon={IC_BACK}
          leftAction={() => this.props.navigation.goBack()}
          headercolor={'transparent'}
          showTitleHeader={true}
          center={
            <Animated.View style={{ opacity: isShow }}>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.PROFILE_BTN_SETTING}</Text>
            </Animated.View>
          }
        />
        <AnimatedTitle scrollY={this.state.scrollY} label={languages.PROFILE_BTN_SETTING} />
      </View>
    );
  }

  onPickerSelect(index) {
    let languege = this.props.app.listLanguage[index].id;
    try {
      let accessTokenApi = this.props.account.accessTokenAPI;
      this.props.actions.app.setLanguageLocal(index.toString());
      this.props.actions.app.getLanguageLocal();
      this.setState({
        selectedItem: index
      });
      this.props.actions.app.getSetting(accessTokenApi, languege);
      this.props.actions.utilities.getFAQ(accessTokenApi, languege);
      this.props.actions.app.changeLanguageServer(accessTokenApi, languege);
    } catch (error) {
      console.log(error);
    }
  }

  getIcon = index => {
    let id = this.props.app.listLanguage[index];
    let item = Language.listLanguage.filter(item => {
      if (item.id === id.id) {
        return item;
      }
    });
    return item[0].icon;
  };

  renderModalLanguage(languages) {
    return (
      <View>
        <View style={Styles.modalContent}>
          <Text style={{ fontSize: Resolution.scale(13), fontFamily: 'OpenSans-Bold', marginTop: Resolution.scale(20) }}>
            {languages.ST_SELECT_LANGUAGE}
          </Text>
          <Picker
            style={{ width: width - Resolution.scaleWidth(20), flex: 1, justifyContent: 'center' }}
            selectedValue={parseInt(this.state.selectedItem)}
            itemStyle={{ color: '#333333', fontSize: Resolution.scale(20), fontWeight: 'bold' }}
            onValueChange={index => this.onPickerSelect(index)}
          >
            {this.props.app.listLanguage.map((item, index) => (
              <PickerItem label={this.getIcon(index) + item.title} value={index} key={'id_' + index} />
            ))}
          </Picker>
        </View>
      </View>
    );
  }

  render() {
    let {
      fee,
      workOrder,
      booking,
      event,
      feedback,
      communication,
      delivery,
      inbox,
      emailFee,
      emailWorkOrder,
      emailBooking,
      emailEvent,
      emailFeedback,
      emailCommunication,
      emailDelivery,
      emailInbox
    } = this.state.dataSetting;
    const setting = this.props.app.getSetting;

    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        {this.renderHeader(languages)}
        <ScrollView
          onScroll={this.handleScroll}
          showsVerticalScrollIndicator={false}
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
          <StatusBar barStyle="light-content" />
          <View style={{ padding: Resolution.scale(20), paddingBottom: 0 }}>
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginBottom: Resolution.scale(10) }}>
              <Text style={Styles.titleHeader}>{languages.ST_DETAIL_NOTI}</Text>
              <Image source={require('@resources/icons/notify_setting.png')} />
              <Image style={{ marginHorizontal: 30 }} source={require('@resources/icons/mail_setting.png')} />
            </View>
            <View
              style={{ backgroundColor: '#FFF', borderRadius: 5, padding: 20, paddingBottom: 0, justifyContent: 'space-between' }}
            >
              {/* Fee */}
              <ViewSwitch
                text={setting[0].displayName}
                noti={fee}
                email={emailFee}
                onToggleEmail={tugle => this.changeNoti('emailFee', tugle)}
                onToggle={tugle => this.changeNoti('fee', tugle)}
              />
              {/* WorkOrder */}
              <ViewSwitch
                text={setting[1].displayName}
                noti={workOrder}
                email={emailWorkOrder}
                onToggle={tugle => this.changeNoti('workOrder', tugle)}
                onToggleEmail={tugle => this.changeNoti('emailWorkOrder', tugle)}
              />
              {/* Booking */}
              <ViewSwitch
                text={setting[2].displayName}
                noti={booking}
                email={emailBooking}
                onToggle={tugle => this.changeNoti('booking', tugle)}
                onToggleEmail={tugle => this.changeNoti('emailBooking', tugle)}
              />
              {/* event */}
              <ViewSwitch
                text={setting[3].displayName}
                noti={event}
                email={emailEvent}
                onToggle={tugle => this.changeNoti('event', tugle)}
                onToggleEmail={tugle => this.changeNoti('emailEvent', tugle)}
              />
              {/* FeedBack */}
              <ViewSwitch
                text={setting[5].displayName}
                noti={feedback}
                email={emailFeedback}
                onToggle={tugle => this.changeNoti('feedback', tugle)}
                onToggleEmail={tugle => this.changeNoti('emailFeedback', tugle)}
              />
              {/* Communication ===> chat */}
              <ViewSwitch
                text={setting[6].displayName}
                noti={communication}
                email={emailCommunication}
                onToggle={tugle => this.changeNoti('communication', tugle)}
                onToggleEmail={tugle => this.changeNoti('emailCommunication', tugle)}
              />
              {/* Delivery */}
              <ViewSwitch
                text={setting[7].displayName}
                noti={delivery}
                email={emailDelivery}
                onToggle={tugle => this.changeNoti('delivery', tugle)}
                onToggleEmail={tugle => this.changeNoti('emailDelivery', tugle)}
              />
              {/* Inbox */}
              <ViewSwitch
                text={setting[8].displayName}
                noti={inbox}
                email={emailInbox}
                onToggle={tugle => this.changeNoti('inbox', tugle)}
                onToggleEmail={tugle => this.changeNoti('emailInbox', tugle)}
              />
            </View>
          </View>

          {/* ====== Thông báo chi tiết ======= */}
          <View style={{ padding: Resolution.scale(20), marginBottom: Resolution.scale(40) }}>
            <Text style={[Styles.titleHeader, { marginBottom: 10 }]}>{languages.ST_LANGUAGE}</Text>
            <Button onPress={() => this._toggleModalLanguage()} style={{ backgroundColor: '#FFF', borderRadius: 5 }}>
              <View
                style={{
                  padding: Resolution.scale(20),
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Text>{this.props.app.listLanguage[this.props.app.languegeLocal].title}</Text>
                <Image source={IC_ARROWRIGHT} />
              </View>
            </Button>
          </View>

          <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalSelectUnit}>
            <ModalSelectUnit onClose={() => this.setState({ isModalSelectUnit: false })} />
          </Modal>
          <Modal
            onBackdropPress={() => this._toggleModalLanguage()}
            isVisible={this.state.isModalLanguage}
            style={{
              justifyContent: 'flex-end',
              margin: Resolution.scale(20)
            }}
          >
            {this.renderModalLanguage(languages)}
          </Modal>
        </ScrollView>
      </View>
    );
  }

  changeNoti = (key, value) => {
    clearTimeout(this.timeOut);
    let accessTokenApi = this.props.account.accessTokenAPI;
    let temptUser = Object.assign({}, this.state.dataSetting);
    temptUser[key] = value;
    this.setState({
      dataSetting: temptUser
    });
    this.timeOut = setTimeout(() => {
      this.props.actions.app.updateSetting(accessTokenApi, this.state.dataSetting);
    }, 1000);
  };

  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }
}

class ViewSwitch extends React.Component {
  render() {
    const { noti, onToggle, onToggleEmail, text, style, email } = this.props;
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: Resolution.scale(20)
          },
          { ...style }
        ]}
      >
        <Text style={{ color: '#505E75', fontFamily: 'OpenSans-Regular', fontSize: 13, flex: 1 }}>{text}</Text>
        <ButtonSwitch
          size={'small'}
          isOn={noti}
          onToggle={isOnDefaultToggleSwitch => {
            onToggle(isOnDefaultToggleSwitch);
          }}
        />
        <ButtonSwitch
          size={'small'}
          isOn={email}
          onToggle={isOnDefaultToggleSwitch => {
            onToggleEmail(isOnDefaultToggleSwitch);
          }}
        />
      </View>
    );
  }
}
