import React, { Component } from 'react';
import { Text, StatusBar, Platform, Animated, PushNotificationIOS } from 'react-native';
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
      isRefresh: false
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
    // if (this.props.account.userSettings !== nextProps.account.userSettings && nextProps.account.userSettings.success) {
    //   let dataGrantedPermissions = nextProps.account.userSettings.result.auth.grantedPermissions;
    //   let accessTokenApi = this.props.account.accessTokenAPI;
    //   let arrTemp = [];
    //   this.state.DATA.map(item => {
    //     if (item.key in dataGrantedPermissions && dataGrantedPermissions[item.key]) {
    //       arrTemp.push(item);
    //     }
    //   });
    //   await this.setState({ dataModule: arrTemp });
    //   if (this.state.isRefresh) {
    //     await this.setState({ isRefresh: false });
    //   }
    // }

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
      let dataGrantedPermissions = nextProps.account.userSettings.result.auth.grantedPermissions;
      let arrTemp = [];
      this.state.DATA.map(item => {
        if (item.key in dataGrantedPermissions && dataGrantedPermissions[item.key]) {
          arrTemp.push(item);
        }
      });
      await this.setState({ dataModule: arrTemp });
    }
  }

  _setData(language) {
    this.setState({
      DATA: [
        {
          id: 1,
          key: 'Pages.CalendarEvents',
          title: Language.listLanguage[language].data.HOME_TXT_EVENTS,
          moduleName: 'Events',
          screen: 'Events'
        },
        {
          id: 2,
          key: 'Pages.Resident.Booking',
          title: Language.listLanguage[language].data.HOME_TXT_BOOKING,
          moduleName: 'Booking',
          screen: 'Booking'
        },
        {
          id: 3,
          key: 'Pages.Resident.WorkOrder',
          title: Language.listLanguage[language].data.HOME_TXT_WORKORDER,
          moduleName: 'Work order',
          screen: 'WorkOrder'
        },

        {
          id: 4,
          key: 'Pages.Resident.Contacts',
          title: Language.listLanguage[language].data.HOME_TXT_CONTACTS,
          moduleName: '_',
          screen: 'Contacts'
        },
        {
          id: 5,
          key: 'Pages.FAQ',
          title: Language.listLanguage[language].data.HOME_TXT_FAQ,
          moduleName: '_',
          screen: 'FAQ'
        },
        {
          id: 6,
          key: 'Pages.Resident.Inbox',
          title: Language.listLanguage[language].data.HOME_TXT_INBOX,
          moduleName: 'Inboxes',
          screen: 'Inbox'
        },
        {
          id: 7,
          key: 'invoice',
          title: Language.listLanguage[language].data.HOME_TXT_INVOICE,
          moduleName: '_',
          screen: ''
        },
        {
          id: 8,
          key: 'Pages.Resident.Feedback',
          title: Language.listLanguage[language].data.HOME_TXT_FEEDBACK,
          moduleName: 'Feedbacks',
          screen: 'Feedback'
        },
        {
          id: 9,
          key: 'Pages.Libraries',
          title: Language.listLanguage[language].data.HOME_TXT_E_LIBARY,
          moduleName: 'Library',
          screen: 'Library'
        },

        {
          id: 10,
          key: 'Pages.Resident.FrontDesk',
          title: Language.listLanguage[language].data.HOME_TXT_FRONTDESK,
          moduleName: '_',
          screen: 'FrontDesk'
        },
        {
          id: 11,
          key: 'Pages.Resident.Fee',
          title: Language.listLanguage[language].data.HOME_TXT_FREE,
          moduleName: 'Fee/Phí',
          screen: 'Fee'
        }
      ]
    });
  }

  async componentWillMount() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    let unitID = this.props.units.unitActive.unitId;
    if (unitID) {
      this.props.actions.notification.getListCountModule(accessTokenApi, unitID);
    } else {
      this.props.actions.units.getUnitLocal().then(() => {
        this.props.actions.notification.getListCountModule(accessTokenApi, this.props.units.unitActive.unitId);
      });
    }
    await this.props.actions.notification.getListNotification(accessTokenApi);
    await this._setData(this.props.app.languegeLocal);
    await this.props.navigation.setParams({ openProfileHome: this._openProfile.bind(this) });
    await this.props.actions.userProfile.getCurrentLoginInformations(accessTokenApi);
    await this.props.actions.userProfile.getImageUserProfile(accessTokenApi);
    await this.props.actions.app.getModuleHome(accessTokenApi);
    await this.props.actions.app.getLanguageApp(accessTokenApi);
    // await this.props.actions.account.getUserSettings(accessTokenApi);

    await this.props.actions.account.getTenantActive();
  }

  componentDidMount() {
    let accessTokenAPI = this.props.account.accessTokenAPI;
    this.props.actions.utilities.getFAQ(accessTokenAPI);
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
    this.pushNotification = this.setupPushNotification(this._handleNotificationOpen);
  }

  pushNotiIOS = () => {
    let accessTokenAPI = this.props.account.accessTokenAPI;
    const uniqueId = DeviceInfo.getUniqueID();
    PushNotificationIOS.addEventListener('register', token => {
      this.props.actions.app.registerNotification(accessTokenAPI, Platform.OS === 'ios' ? 1 : 2, token, uniqueId);
    });
    PushNotificationIOS.requestPermissions();
  };

  setupPushNotification = async handleNotification => {
    let accessTokenAPI = this.props.account.accessTokenAPI;
    const uniqueId = DeviceInfo.getUniqueID();
    await PushNotification.configure({
      onRegister: token => {
        console.log('asdkljasdklasjdlkasdas', token);
        this.props.actions.app.registerNotification(accessTokenAPI, Platform.OS === 'ios' ? 1 : 2, token.token, uniqueId);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        if (notification.foreground) {
          if (notification.userInteraction) {
            console.log('NOTIFICATION touched:', notification);
            handleNotification(notification);
          } else {
            console.log('NOTIFICATION foreground userInteraction:', notification.userInteraction);
            handleNotification(notification);
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
    // }
    // } catch (error) {
    //   Alert.alert('error', error);
    // }
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
    if (this.state.isRefresh) {
      return;
    }
    await this.setState({ isRefresh: true });
    await this.props.actions.app.getModuleHome(accessTokenAPI);
    await this.props.actions.notification.getListNotification(accessTokenAPI);
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
