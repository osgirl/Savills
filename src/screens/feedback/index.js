import React, { Component } from 'react';
import { Animated } from 'react-native';
import Connect from '@stores';
import layout from './layout';

import _ from "lodash";

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
            loadingMore: false,
            isModalNew: false,
            pageCount: 1,
            itemSelected: null,
            scrollY: new Animated.Value(0),
        }
    }

    componentWillMount() {
        this._getList()
    }

    componentDidMount() {
        let accessTokenApi = this.props.account.accessTokenAPI;
        this.props.actions.feedback.getListCategory(accessTokenApi);
        this.props.actions.feedback.getTypeFeedback(accessTokenApi);
    }

    async componentWillReceiveProps(nextProps) {

        if (this.props.feedback.listFeedBack.items !== nextProps.feedback.listFeedBack.items && nextProps.feedback.listFeedBack.success && this.state.isRefresh) {
            await this.setState({ data: nextProps.feedback.listFeedBack.items });
            await this.setState({ isRefresh: false })
        }

        if (this.props.feedback.listFeedBack.items !== nextProps.feedback.listFeedBack.items && nextProps.feedback.listFeedBack.success && !this.state.isRefresh) {
            await this.setState({ data: this.state.data.concat(nextProps.feedback.listFeedBack.items) });
            await this.setState({ loadingMore: false, isRefresh: false })
        }
    }

    _getList() {
        let accessTokenApi = this.props.account.accessTokenAPI;
        this.props.actions.feedback.getListFeedback(accessTokenApi, this.state.pageCount);
    }

    async _onRefresh() {
        if (this.state.isRefresh) {
            return;
        }
        await this.setState({ isRefresh: true, pageCount: 1 })
        this._getList();
    }

    async _onEndReached() {
        if (this.state.loadingMore || this.state.pageCount == this.props.feedback.listFeedBack.pageCount) {
            return;
        }
        await this.setState({ loadingMore: true, pageCount: this.state.pageCount + 1 })
        await this._getList(this.state.pageCount);
    }

    _openModalSelectUnit() {
        this.setState({ isModalSelectUnit: true })
    }

    _openModalDetail(item) {
        this.setState({ itemSelected: item })
        this.setState({ isModalDetail: true })
    }

    _openModalNew() {
        this.setState({ isModalNew: true })
    }

    _onCloseModalNew() {
        this.setState({ isModalNew: false })
        this._onRefresh();
    }

}

export default Connect(Feedback);
