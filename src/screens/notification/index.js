import React, { Component } from 'react';
import { Animated, View, Text } from 'react-native';
import Connect from '@stores';
import layout from './layout';

import _ from "lodash";

class Notification extends layout {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.notification.listNoti.items,
            loadingMore: false,
            isShowTitleHeader: false,
            isModalSelectUnit: false,
            scrollY: new Animated.Value(0),
            isRefresh: false
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.notification.listNoti.items !== nextProps.notification.listNoti.items && nextProps.notification.listNoti.success && !this.state.isRefresh) {
            await this.setState({ data: this.state.data.concat(nextProps.notification.listNoti.items) });
            await this.setState({ loadingMore: false, })
        }

        if (this.props.notification.listNoti.items !== nextProps.notification.listNoti.items && nextProps.notification.listNoti.success && this.state.isRefresh) {
            await this.setState({ data: nextProps.notification.listNoti.items });
            await this.setState({ loadingMore: false, isRefresh: false })
        }
    }

    async _onRefresh() {
        let accessTokenAPI = this.props.account.accessTokenAPI;
        if (this.state.isRefresh) {
            return;
        }
        await this.setState({ isRefresh: true })
        await this.props.actions.notification.getListNotification(accessTokenAPI);
    }

    async _onEndReached() {
        if (this.state.loadingMore) {
            return;
        }
        this.setState({ loadingMore: true })
        let start = await this.state.data.length;
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


}

export default Connect(Notification);
