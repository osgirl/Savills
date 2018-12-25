import React, { Component } from 'react';
import { Animated, Platform } from 'react-native';
import Connect from '@stores';
import layout from './layout';
import Resolution from '@utils/resolution';
import _ from 'lodash';

import Language from '../../utils/language';

const HEADER_MAX_HEIGHT = 60;

class Feedback extends layout {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataCompleted: [],
      isModalSelectUnit: false,
      isShowTitleHeader: false,
      isModalDetail: false,
      isRefresh: false,
      isRefreshCompleted: false,
      isModalNew: false,
      loadingMore: false,
      loadingMoreCompleted: false,
      pageCount: 1,
      pageCountCompleted: 1,
      commentBoxId: null,
      isLoadData: true,
      isLoadDataCompleted: true,
      scrollY: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0)
    };
  }

  componentWillMount = () => {
    this._getList();
  };

  componentDidMount = () => {
    this._getList();
    this._getListCompleted();
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
      nextProps.feedback.listFeedBack.success &&
      this.props.feedback.listFeedBack.items !== nextProps.feedback.listFeedBack.items &&
      this.state.isRefresh
    ) {
      await this.setState({ isRefresh: false });
      await this.setState({ data: nextProps.feedback.listFeedBack.items, isLoadData: false });
    }

    if (
      this.props.feedback.listFeedBack.items !== nextProps.feedback.listFeedBack.items &&
      nextProps.feedback.listFeedBack.success &&
      !this.state.isRefresh
    ) {
      await this.setState({ data: this.state.data.concat(nextProps.feedback.listFeedBack.items) });
      await this.setState({ loadingMore: false, isRefresh: false, isLoadData: false });
    }

    //COMPLETED
    if (
      nextProps.feedback.listFeedBackCompleted.success &&
      this.props.feedback.listFeedBackCompleted.items !== nextProps.feedback.listFeedBackCompleted.items &&
      this.state.isRefreshCompleted
    ) {
      await this.setState({ isRefreshCompleted: false });
      await this.setState({ dataCompleted: nextProps.feedback.listFeedBackCompleted.items, isLoadDataCompleted: false });
    }

    if (
      this.props.feedback.listFeedBackCompleted.items !== nextProps.feedback.listFeedBackCompleted.items &&
      nextProps.feedback.listFeedBackCompleted.success &&
      !this.state.isRefreshCompleted
    ) {
      await this.setState({ dataCompleted: this.state.dataCompleted.concat(nextProps.feedback.listFeedBackCompleted.items) });
      await this.setState({ loadingMoreCompleted: false, isRefreshCompleted: false, isLoadDataCompleted: false });
    }
  }

  _getList(pageCount = this.state.pageCount) {
    let accessTokenApi = this.props.account.accessTokenAPI;
    let languege = Language.listLanguage[this.props.app.languegeLocal].id;
    this.props.actions.feedback.getListFeedback(accessTokenApi, languege, pageCount);
  }

  _getListCompleted(pageCountCompleted = this.state.pageCountCompleted) {
    let accessTokenApi = this.props.account.accessTokenAPI;
    let languege = Language.listLanguage[this.props.app.languegeLocal].id;
    this.props.actions.feedback.getListFeedbackCompleted(accessTokenApi, languege, pageCountCompleted);
  }

  async _onRefresh() {
    if (this.state.isRefresh) {
      return;
    }
    await this.setState({ isRefresh: true, pageCount: 1, isLoadData: true });
    this._getList();
  }

  async _onRefreshCompleted() {
    if (this.state.isRefreshCompleted) {
      return;
    }
    await this.setState({ isRefreshCompleted: true, pageCountCompleted: 1, isLoadDataCompleted: true });
    this._getListCompleted();
  }

  async _onEndReached() {
    if (this.state.loadingMore || this.state.pageCount > this.props.feedback.listFeedBack.pageCount) {
      return;
    }
    await this.setState({ loadingMore: true, pageCount: this.state.pageCount + 1 });
    await this._getList(this.state.pageCount);
  }

  async _onEndReachedCompleted() {
    if (this.state.loadingMoreCompleted || this.state.pageCountCompleted == this.props.feedback.listFeedBackCompleted.pageCount) {
      return;
    }
    await this.setState({ loadingMoreCompleted: true, pageCountCompleted: this.state.pageCountCompleted + 1 });
    await this._getListCompleted(this.state.pageCountCompleted);
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
    this.ScrollableTab.goToPage(0);
    this._onRefresh();
  }
}

export default Connect(Feedback);
