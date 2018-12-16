import React, { Component } from 'react';
import { Animated, Platform } from 'react-native';
import Connect from '@stores';
import layout from './layout';
import Resolution from '@utils/resolution';
import _ from 'lodash';

import Language from '../../utils/language';

const HEADER_MAX_HEIGHT = 50;

class Feedback extends layout {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isModalSelectUnit: false,
      isShowTitleHeader: false,
      isModalSelectUnit: false,
      isModalDetail: false,
      isRefresh: false,
      isModalNew: false,
      loadingMore: false,
      pageCount: 1,
      commentBoxId: null,
      scrollY: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0)
    };
  }

  componentWillMount = () => {
    this._getList();
  };

  componentDidMount = () => {
    let accessTokenApi = this.props.account.accessTokenAPI;
    let languege = Language.listLanguage[this.props.app.languegeLocal].id;
    this.props.actions.feedback.getListCategory(accessTokenApi, languege);
    this.props.actions.feedback.getTypeFeedback(accessTokenApi, languege);
    let ida = this.props.navigation.getParam('params', false);
    if (ida.itemtype) {
      setTimeout(() => {
        this._openModalDetail(ida.itemtype);
      }, 300);
    }
  };

  async componentWillReceiveProps(nextProps) {
    if (
      this.props.feedback.listFeedBack.items !== nextProps.feedback.listFeedBack.items &&
      nextProps.feedback.listFeedBack.success &&
      this.state.isRefresh
    ) {
      await this.setState({ data: nextProps.feedback.listFeedBack.items });
      await this.setState({ isRefresh: false });
    }

    if (
      this.props.feedback.listFeedBack.items !== nextProps.feedback.listFeedBack.items &&
      nextProps.feedback.listFeedBack.success &&
      !this.state.isRefresh
    ) {
      await this.setState({ data: this.state.data.concat(nextProps.feedback.listFeedBack.items) });
      await this.setState({ loadingMore: false, isRefresh: false });
    }
  }

  _getList() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    let languege = Language.listLanguage[this.props.app.languegeLocal].id;
    this.props.actions.feedback.getListFeedback(accessTokenApi, this.state.pageCount, languege);
  }

  async _onRefresh() {
    if (this.state.isRefresh) {
      return;
    }
    await this.setState({ isRefresh: true, pageCount: 1 });
    this._getList();
  }

  async _onEndReached() {
    if (this.state.loadingMore || this.state.pageCount == this.props.feedback.listFeedBack.pageCount) {
      return;
    }
    await this.setState({ loadingMore: true, pageCount: this.state.pageCount + 1 });
    await this._getList(this.state.pageCount);
  }

  _openModalSelectUnit() {
    this.setState({ isModalSelectUnit: true });
  }

  _openModalDetail(id) {
    this.setState({ commentBoxId: id });
    this.setState({ isModalDetail: true });
  }

  _openModalNew() {
    this.setState({ isModalNew: true });
  }

  _onCloseModalNew() {
    this.setState({ isModalNew: false });
    this._onRefresh();
  }
}

export default Connect(Feedback);
