import React, { Component } from 'react';
import { Text, StatusBar, Platform, Animated } from 'react-native';
import Connect from '@stores';
import layout from './layout';
import _ from 'lodash';

import FastImage from '../../components/fastImage';
import Header from '@components/header';
import Button from '@components/button';
import IC_EDIT from '@resources/icons/edit-profile.png';
import IC_NOTIFY from '@resources/icons/notify.png';

let DATA = [
  { id: 1, key: 'Pages.Resident', title: 'Events', screen: 'Events' },
  { id: 2, key: 'Pages.Resident.Booking', title: 'Booking', screen: 'Booking' },
  { id: 3, key: 'Pages.Resident.WorkOrder', title: 'Work Order', screen: 'WorkOrder' },
  { id: 4, key: 'invoice', title: 'Invoice', screen: '' },
  { id: 5, key: 'Pages.Resident.Inbox', title: 'Inbox', screen: '' },
  { id: 6, key: 'Pages.Resident.Feedback', title: 'Feed back', screen: '' },
  { id: 7, key: 'Pages.Libraries', title: 'E-labary', screen: '' },
  { id: 8, key: 'Pages.Resident.Contacts', title: 'Contacts', screen: 'Contacts' },
  { id: 9, key: 'Pages.Resident.FrontDesk', title: 'Frontdesk', screen: '' },
  { id: 10, key: 'Pages.Resident.Fee', title: 'Free', screen: '' },
  { id: 11, key: 'Pages.FAQ', title: 'FAQ', screen: 'FAQ' }
];
import Language from '../../utils/language';

class Home extends layout {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0), // Animated event scroll,
      isShowProfile: false,
      loading: false,
      dataModule: [],
      profile: null,
      numcolumn: 2,
      DATA: [
        {
          id: 1,
          key: 'Pages.Resident',
          title: Language.listLanguage[this.props.app.languegeLocal].data.HOME_TXT_EVENTS,
          screen: 'Events'
        },
        {
          id: 2,
          key: 'Pages.Resident.Booking',
          title: Language.listLanguage[this.props.app.languegeLocal].data.HOME_TXT_BOOKING,
          screen: ''
        },
        {
          id: 3,
          key: 'Pages.Resident.WorkOrder',
          title: Language.listLanguage[this.props.app.languegeLocal].data.HOME_TXT_WORKORDER,
          screen: 'WorkOrder'
        },
        { id: 4, key: 'invoice', title: Language.listLanguage[this.props.app.languegeLocal].data.HOME_TXT_INVOICE, screen: '' },
        {
          id: 5,
          key: 'Pages.Resident.Inbox',
          title: Language.listLanguage[this.props.app.languegeLocal].data.HOME_TXT_FEEDBACK,
          screen: ''
        },
        {
          id: 6,
          key: 'Pages.Resident.Feedback',
          title: Language.listLanguage[this.props.app.languegeLocal].data.HOME_TXT_FEEDBACK,
          screen: ''
        },
        {
          id: 7,
          key: 'Pages.Libraries',
          title: Language.listLanguage[this.props.app.languegeLocal].data.HOME_TXT_E_LIBARY,
          screen: ''
        },
        {
          id: 8,
          key: 'Pages.Resident.Contacts',
          title: Language.listLanguage[this.props.app.languegeLocal].data.HOME_TXT_CONTACTS,
          screen: 'Contacts'
        },
        {
          id: 9,
          key: 'Pages.Resident.FrontDesk',
          title: Language.listLanguage[this.props.app.languegeLocal].data.HOME_TXT_FRONTDESK,
          screen: ''
        },
        {
          id: 10,
          key: 'Pages.Resident.Fee',
          title: Language.listLanguage[this.props.app.languegeLocal].data.HOME_TXT_FREE,
          screen: ''
        },
        { id: 11, key: 'Pages.FAQ', title: Language.listLanguage[this.props.app.languegeLocal].data.HOME_TXT_FAQ, screen: 'FAQ' }
      ]
    };
    this.showCenter = false;
    if (Platform.OS === 'android') {
      StatusBar.setHidden(false);
      StatusBar.setBackgroundColor('#000');
      StatusBar.setBarStyle('light-content');
    } else {
      StatusBar.setHidden(false);
      StatusBar.setBarStyle('dark-content');
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.account.userSettings !== nextProps.account.userSettings && nextProps.account.userSettings.success) {
      let dataGrantedPermissions = nextProps.account.userSettings.result.auth.grantedPermissions;
      let accessTokenApi = this.props.account.accessTokenAPI;
      let arrTemp = [];
      this.state.DATA.map(item => {
        if (item.key in dataGrantedPermissions && dataGrantedPermissions[item.key]) {
          arrTemp.push(item);
        }
      });
      await this.setState({ dataModule: arrTemp });
    }
  }

  async componentWillMount() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    await this.props.navigation.setParams({ openProfileHome: this._openProfile.bind(this) });
    await this.props.actions.userProfile.getCurrentLoginInformations(accessTokenApi);
    await this.props.actions.userProfile.getImageUserProfile(accessTokenApi);
    await this.props.actions.account.getUserSettings(accessTokenApi);
    await this.props.actions.account.getTenantActive();
  }

  componentDidMount() {
    let accessTokenAPI = this.props.account.accessTokenAPI;
    this.props.actions.utilities.getFAQ(accessTokenAPI);
    this.props.actions.notification.getListNotification(accessTokenAPI);
  }

  _gotoChangePassword() {
    if (this.state.isShowProfile) this.setState({ isShowProfile: false });
    this.props.navigation.navigate('ChangePassword', { status: 'change' });
  }

  _openProfile() {
    this.setState({ isShowProfile: true });
  }

  _closeProfile() {
    this.setState({ isShowProfile: false });
  }

  _openFAQ() {
    this.setState({ isShowFAQ: true });
  }

  _closeFAQ() {
    this.setState({ isShowFAQ: false });
  }

  _gotoModule(screen) {
    if (screen === 'FAQ') {
      this._openFAQ();
    } else {
      this.props.navigation.navigate(screen);
    }
  }

  _openNoti() {
    this.setState({ isShowNoti: true });
  }

  _closeNoti() {
    this.setState({ isShowNoti: false });
  }

  async _logOut() {
    await this.setState({ loading: true });
    await this.props.actions.account.logOut('');
    await this.props.actions.units.setUnitLocal({});
    await this.props.actions.account.setTenantLocal({});
    await this.props.actions.account.setAccessTokenLocal('');
    await this.props.actions.account.setAccessApiTokenLocal('');
    await this.props.actions.account.setEncTokenLocal('');

    await this.setState({ loading: false });
    if (this.state.isShowProfile) await this.setState({ isShowProfile: false });
    await this.props.navigation.navigate('Login');
  }
}

export default Connect(Home);
