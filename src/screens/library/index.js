import React, { Component } from 'react';
import { Animated } from 'react-native';
import Connect from '@stores';
import layout from './layout';

import _ from "lodash";

import Language from "../../utils/language";

class Libary extends layout {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isRefresh: false,
            loadingMore: false,
            scrollY: new Animated.Value(0),
        }
    }

    componentWillMount() {
        this._getList()
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.library.listLibary.result !== nextProps.library.listLibary.result && nextProps.library.listLibary.success && this.state.isRefresh) {
            await this.setState({ data: nextProps.library.listLibary.result });
            await this.setState({ isRefresh: false })
        }

        if (this.props.library.listLibary.result !== nextProps.library.listLibary.result && nextProps.library.listLibary.success && !this.state.isRefresh) {
            await this.setState({ data: this.state.data.concat(nextProps.library.listLibary.result) });
            await this.setState({ loadingMore: false, isRefresh: false })
        }
    }

    _getList() {
        let accessTokenApi = this.props.account.accessTokenAPI;
        let languege = Language.listLanguage[this.props.app.languegeLocal].id
        this.props.actions.library.getList(accessTokenApi, languege);
    }

    // async _onRefresh() {
    //     if (this.state.isRefresh) {
    //         return;
    //     }
    //     await this.setState({ isRefresh: true, pageCount: 1 })
    //     this._getList();
    // }

    // async _onEndReached() {
    //     if (this.state.loadingMore || this.state.pageCount == this.props.feedback.listFeedBack.pageCount) {
    //         return;
    //     }
    //     await this.setState({ loadingMore: true, pageCount: this.state.pageCount + 1 })
    //     await this._getList(this.state.pageCount);
    // }

    _openModalSelectUnit() {
        this.setState({ isModalSelectUnit: true })
    }

}

export default Connect(Libary);
