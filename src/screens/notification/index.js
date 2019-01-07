import React, { Component } from 'react';
import { Animated, View, Text, Platform } from 'react-native';
import Connect from '@stores';
import layout from './layout';

import _ from 'lodash';
import Resolution from '@utils/resolution';
const HEADER_MAX_HEIGHT = Resolution.scale(60);

class Notification extends layout {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingMore: false,
      isShowTitleHeader: false,
      isModalSelectUnit: false,
      scrollY: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0),
      isRefresh: false,
      errorMess: '',
      isLoadData: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      let accessTokenAPI = this.props.account.accessTokenAPI;
      this.props.actions.notification.getListNotification(accessTokenAPI);
    }, 300);
  }


  async componentWillReceiveProps(nextProps) {
    if (
      this.props.notification.listNoti !== nextProps.notification.listNoti &&
      nextProps.notification.listNoti.success &&
      !this.state.isRefresh
    ) {
      await this.setState({ data: this.state.data.concat(nextProps.notification.listNoti.result.items) });
      await this.setState({ loadingMore: false, isRefresh: false, isLoadData: false });
    }

    if (
      this.props.notification.listNoti !== nextProps.notification &&
      !nextProps.notification.listNoti.success && nextProps.notification.listNoti.error
    ) {
      await this.setState({ errorMess: nextProps.notification.listNoti.error.message });
      await this.setState({ loadingMore: false, isRefresh: false, isLoadData: false });
    }

    if (
      this.props.notification.listNoti !== nextProps.notification.listNoti &&
      nextProps.notification.listNoti.success &&
      this.state.isRefresh
    ) {
      await this.setState({ data: nextProps.notification.listNoti.result.items });
      await this.setState({ loadingMore: false, isRefresh: false, isLoadData: false });
    }

    // if (this.props.notification.listNoti.result.items == nextProps.notification.listNoti.result.items && nextProps.notification.listNoti.result.items.length > 0) {
    //   await this.setState({ data: nextProps.notification.listNoti.items });
    //   await this.setState({ loadingMore: false, isRefresh: false });
    // }
  }

  _onClickItem(item) {
    let accessTokenAPI = this.props.account.accessTokenAPI;
    let tempArr = this.state.data;
    let index = tempArr.findIndex(i => i.id == item.id);
    if (index !== -1) {
      tempArr[index].state = 1;
    }
    this.setState({ data: tempArr });
    this.props.actions.notification.updateRead(accessTokenAPI, item.id);
    this._handleNotification(item.notification);
  }

  async _onRefresh() {
    let accessTokenAPI = this.props.account.accessTokenAPI;
    if (this.state.isRefresh) {
      return;
    }
    await this.setState({ isRefresh: true });
    await this.props.actions.notification.getListNotification(accessTokenAPI);
  }

  async _onEndReached() {
    const totalCount = this.props.notification.listNoti.result.totalCount;
    const start = await this.state.data.length;
    if (this.state.loadingMore || start >= totalCount) {
      return;
    }
    this.setState({ loadingMore: true });
    // let start = await this.state.data.length;
    let accessTokenAPI = this.props.account.accessTokenAPI;
    await this.props.actions.notification.getListNotification(accessTokenAPI, start);
  }

  _openModalSelectUnit() {
    this.setState({ isModalSelectUnit: true });
  }

  _closeModalSelectUnit() {
    this.setState({ isModalSelectUnit: false });
    this._onRefresh();
  }

  _handleNotification = notification => {
    this.mapNavigateToScreen(notification);
  };

  mapNavigateToScreen = notification => {
    let routeName = '';
    const type = notification.data.properties.Type ? notification.data.properties.Type : 0;
    const itemtype = notification.data.properties.Id ? notification.data.properties.Id : 0;
    switch (parseInt(type)) {
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
    this.props.navigation.navigate(routeName, {
      type: 'Navigate',
      routeName: routeName,
      params: {
        itemtype: itemtype
      }
    });
    this.props.onclose();
  };
}

export default Connect(Notification);
