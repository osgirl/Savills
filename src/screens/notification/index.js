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
            scrollY: new Animated.Value(0),
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.notification.listNoti.items !== nextProps.notification.listNoti.items && nextProps.notification.listNoti.success) {
            await this.setState({ data: this.state.data.concat(nextProps.notification.listNoti.items) });
            await this.setState({ loadingMore: false })
        }
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


}

export default Connect(Notification);
