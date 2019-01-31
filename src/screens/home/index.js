import React, { Component } from 'react';
import { Text, StatusBar, Platform, Animated, PushNotificationIOS, DeviceEventEmitter, NetInfo } from 'react-native';
import Connect from '@stores';
import layout from './layout';
import _ from 'lodash';

import { BackHandler } from 'react-native';
import Language from '../../utils/language';

import DeviceInfo from 'react-native-device-info';
import PushNotification from 'react-native-push-notification';

class Home extends layout {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0), // Animated event scroll,
      isShowProfile: false,
      loading: false,
      dataModule: [],
      profile: null,
      numcolumn: 3,
      moduleCount: [],
      DATA: [],
      isRefresh: false,
      isAnnountMent: false,
      listAnnoument: []
    };
    this.showCenter = false;
    if (Platform.OS === 'android') {
      StatusBar.setHidden(false);
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');
    } else {
      StatusBar.setHidden(false);
      StatusBar.setBarStyle('dark-content');
    }

    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.app.moduleHome !== nextProps.app.moduleHome && nextProps.app.moduleHome.success) {
      const dataTemp = this.state.DATA.slice();
      let arrMaptemp = [];
      nextProps.app.moduleHome.result.modules.map(item => {
        dataTemp.map(itemData => {
          if (item === itemData.key) {
            item = itemData;
            arrMaptemp.push(item);
          }
        });
      });
      await this.setState({ dataModule: arrMaptemp });
      if (this.state.isRefresh) {
        await this.setState({ isRefresh: false });
      }
    }

    if (
      this.props.notification.listCountModule !== nextProps.notification.listCountModule &&
      nextProps.notification.listCountModule.success
    ) {
      this.setState({ moduleCount: nextProps.notification.listCountModule.result });
    }

    if (this.props.app.languegeLocal !== nextProps.app.languegeLocal) {
      await this._setData(nextProps.app.languegeLocal);
      const dataTemp = this.state.DATA.slice();
      let arrMaptemp = [];
      nextProps.app.moduleHome.result.modules.map(item => {
        dataTemp.map(itemData => {
          if (item === itemData.key) {
            item = itemData;
            arrMaptemp.push(item);
          }
        });
      });
      await this.setState({ dataModule: arrMaptemp });
      if (this.state.isRefresh) {
        await this.setState({ isRefresh: false });
      }
    }

    // reload count
    if (this.props.notification.updateRead !== nextProps.notification.updateRead && nextProps.notification.updateRead.success) {
      let unitID = this.props.units.unitActive.unitId;
      let accessTokenAPI = this.props.account.accessTokenAPI;
      await this.props.actions.notification.getListNotification(accessTokenAPI);
      await this.props.actions.notification.getListCountModule(accessTokenAPI, unitID);
      await this.props.actions.notification.getUnreadCount(accessTokenAPI);
    }
    if (nextProps.app.listLanguage && nextProps.app.listLanguage != this.props.app.listLanguage) {
      this.initData();
      let accessTokenAPI = this.props.account.accessTokenAPI;
      let languages = this.props.app.listLanguage[this.props.app.languegeLocal].id;
      this.props.actions.utilities.getFAQ(accessTokenAPI, languages);
    }
    if (
      nextProps.app.announCements &&
      nextProps.app.announCements.length > 0 &&
      this.props.app.announCements != nextProps.app.announCements
    ) {
      this.setState({ listAnnoument: nextProps.app.announCements }, () => {
        setTimeout(() => {
          this.setState({ isAnnountMent: true });
        }, 500);
      });
    }
  }

  _setData(languegeLocal = this.props.app.languegeLocal) {
    let languages = this.props.app.listLanguage[languegeLocal].data;
    this.setState({
      DATA: [
        {
          id: 1,
          key: 'Pages.CalendarEvents',
          title: languages.HOME_TXT_EVENTS,
          moduleName: 'Events',
          screen: 'Events'
        },
        {
          id: 2,
          key: 'Pages.Resident.Booking',
          title: languages.HOME_TXT_BOOKINGS,
          moduleName: 'Booking',
          screen: 'Booking'
        },
        {
          id: 3,
          key: 'Pages.Resident.WorkOrder',
          title: languages.HOME_TXT_WORKORDER,
          moduleName: 'Work order',
          screen: 'WorkOrder'
        },

        {
          id: 4,
          key: 'Pages.Resident.Contacts',
          title: languages.HOME_TXT_CONTACTS,
          moduleName: '_',
          screen: 'Contacts'
        },
        {
          id: 5,
          key: 'Pages.FAQ',
          title: languages.HOME_TXT_FAQ,
          moduleName: '_',
          screen: 'FAQ'
        },
        {
          id: 6,
          key: 'Pages.Resident.Inbox',
          title: languages.HOME_TXT_INBOX,
          moduleName: 'Inboxes',
          screen: 'Inbox'
        },
        {
          id: 7,
          key: 'invoice',
          title: languages.HOME_TXT_INVOICE,
          moduleName: '_',
          screen: ''
        },
        {
          id: 8,
          key: 'Pages.Resident.Feedback',
          title: languages.HOME_TXT_FEEDBACK,
          moduleName: 'Feedbacks',
          screen: 'Feedback'
        },
        {
          id: 9,
          key: 'Pages.Libraries',
          title: languages.HOME_TXT_E_LIBARY,
          moduleName: 'Library',
          screen: 'Library'
        },

        {
          id: 10,
          key: 'Pages.Resident.FrontDesk',
          title: languages.HOME_TXT_FRONTDESK,
          moduleName: '_',
          screen: 'FrontDesk'
        },
        {
          id: 11,
          key: 'Pages.Resident.Fee',
          title: languages.HOME_TXT_FREE,
          moduleName: 'Fee/Phí',
          screen: 'Fee'
        }
      ]
    });
  }

  // await this.props.actions.notification.getListCountModule(accessTokenAPI, unitID);

  async initData() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    let unitID = await this.props.units.unitActive.unitId;
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].id;
    if (unitID) {
      await this.props.actions.notification.getListCountModule(accessTokenApi, unitID);
    } else {
      this.props.actions.units.getUnitLocal().then(() => {
        this.props.actions.notification.getListCountModule(accessTokenApi, this.props.units.unitActive.unitId);
      });
    }
    // await this.props.actions.notification.getListNotification(accessTokenApi);
    await this._setData();
    await this.props.actions.notification.getUnreadCount(accessTokenApi);
    await this.props.navigation.setParams({ openProfileHome: this._openProfile.bind(this) });
    await this.props.actions.userProfile.getCurrentLoginInformations(accessTokenApi);
    await this.props.actions.userProfile.getImageUserProfile(accessTokenApi);
    await this.props.actions.app.getModuleHome(accessTokenApi, languages);
    await this.props.actions.account.getTenantActive();
  }

  componentDidMount() {
    let accessTokenAPI = this.props.account.accessTokenAPI;
    this.props.actions.app.getLanguageProject(accessTokenAPI);
    const version = DeviceInfo.getVersion();
    this.props.actions.app.GetAnnouncement(accessTokenAPI, version);
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
    this.pushNotification = this.setupPushNotification(this._handleNotificationOpen);
  }

  setupPushNotification = async handleNotification => {
    let accessTokenAPI = this.props.account.accessTokenAPI;
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].id;
    const uniqueId = DeviceInfo.getUniqueID();
    await PushNotification.configure({
      onRegister: token => {
        this.props.actions.app.registerNotification(
          accessTokenAPI,
          Platform.OS === 'ios' ? 1 : 2,
          token.token,
          uniqueId,
          languages
        );
      },
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);

        if (notification.foreground) {
          if (notification.userInteraction) {
            console.log('NOTIFICATION touched:', notification);
            // handleNotification(notification);
          } else {
            console.log('NOTIFICATION foreground userInteraction:', notification.userInteraction);
            // handleNotification(notification);
          }
        } else {
          if (notification.userInteraction) {
            console.log('NOTIFICATION touched:', notification);
            handleNotification(notification);
          } else {
            console.log('NOTIFICATION userInteraction:', notification.userInteraction);
            handleNotification(notification);
          }
        }

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      senderID: '31918583407',
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });
    return PushNotification;
  };

  _handleNotificationOpen = notification => {
    let notis = null;
    if (notification.data) {
      notis = notification.data;
    } else {
      notis = notification;
    }
    const { navigate } = this.props.navigation;
    this.mapNavigateToScreen(navigate, notis);
  };

  mapNavigateToScreen = (navigate, notification) => {
    let routeName = '';
    switch (parseInt(notification.type)) {
      case 1:
        routeName = 'Fee';
        break;
      case 2:
        routeName = 'WorkOrder';
        break;
      case 3:
        routeName = 'Booking';
        break;
      case 4:
        routeName = 'Events';
        break;
      case 5:
        routeName = 'Library';
        break;
      case 6:
        routeName = 'Feedback';
        break;
      case 12:
        routeName = 'FrontDesk';
        break;
      case 13:
        routeName = 'FrontDesk';
        break;
      case 14:
        routeName = 'Inbox';
        break;
      default:
        routeName = 'Home';
    }
    navigate(routeName, {
      type: 'Navigate',
      routeName: routeName,
      params: {
        itemtype: parseInt(notification.parentid)
      }
    });
  };

  async _onRefresh() {
    let accessTokenAPI = this.props.account.accessTokenAPI;
    let unitID = this.props.units.unitActive.unitId;
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].id;
    if (this.state.isRefresh) {
      return;
    }
    await this.setState({ isRefresh: true });
    await this.props.actions.app.getModuleHome(accessTokenAPI, languages);
    await this.props.actions.notification.getListCountModule(accessTokenAPI, unitID);
    await this.props.actions.notification.getUnreadCount(accessTokenAPI);
    // await this.props.actions.notification.getListNotification(accessTokenAPI);
  }

  onBackButtonPressAndroid = () => {
    return true;
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  _gotoChangePassword() {
    if (this.state.isShowProfile) this.setState({ isShowProfile: false });
    this.props.navigation.navigate('ChangePassword', { status: 'change' });
  }

  _gotoSetting() {
    if (this.state.isShowProfile) this.setState({ isShowProfile: false });
    this.props.navigation.navigate('Setting');
  }

  _openProfile() {
    if (this.props.userProfile.imageProfile.success) {
      setTimeout(() => {
        this.setState({ isShowProfile: true });
      }, 100);
    }
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
    let accessTokenAPI = this.props.account.accessTokenAPI;
    await this.setState({ loading: true });
    await this.props.actions.app.logoutNoti(accessTokenAPI);
    await this.props.actions.account.logOut('');
    await this.props.actions.units.setUnitLocal({});
    // await this.props.actions.account.setTenantLocal({});
    // await this.props.actions.account.setAccessTokenLocal('');
    // await this.props.actions.account.setAccessApiTokenLocal('');
    // await this.props.actions.account.setEncTokenLocal('');

    await this.setState({ loading: false });
    if (this.state.isShowProfile) await this.setState({ isShowProfile: false });
    await this.props.navigation.replace('Login');
  }
}

export default Connect(Home);
