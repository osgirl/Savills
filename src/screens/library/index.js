import React, { Component } from 'react';
import { Animated, Platform } from 'react-native';
import Connect from '@stores';
import layout from './layout';

import _ from 'lodash';

import Language from '../../utils/language';
import Resolution from '@utils/resolution';
const HEADER_MAX_HEIGHT = Resolution.scale(60);

class Libary extends layout {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isRefresh: false,
      loadingMore: false,
      scrollY: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0)
    };
  }

  componentWillMount() {
    this._getList();
  }

  async componentWillReceiveProps(nextProps) {
    if (
      this.props.library.listLibary.result !== nextProps.library.listLibary.result &&
      nextProps.library.listLibary.success 
    ) {
      await this.setState({ data: nextProps.library.listLibary.result });
      await this.setState({ isRefresh: false });
    }
  }

  _getList() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    let languege = this.props.app.listLanguage[this.props.app.languegeLocal].id;
    this.props.actions.library.getList(accessTokenApi, languege);
  }

  async _onRefresh() {
    if (this.state.isRefresh) {
      return;
    }
    await this.setState({ isRefresh: true });
    await this._getList();
  }

  _openModalSelectUnit() {
    this.setState({ isModalSelectUnit: true });
  }

  _goDetail(item) {
    this.props.navigation.navigate('DetailLibrary', { library: item });
  }
}

export default Connect(Libary);
