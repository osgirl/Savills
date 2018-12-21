import React, { Component } from 'react';
import { Animated } from 'react-native';
import Connect from '@stores';
import layout from './layout';

import _ from "lodash";
import Language from '../../utils/language';

class Fee extends layout {

    constructor(props) {
        super(props);
        this.state = {
            isModalSelectUnit: false,
            isShowModalConfirm: false,
            isShowModalHistory: false,
            isShowModalSuccess: false,
            isShowTitleHeader: false,
            isShowModalDetail: false,
            data: [],
            isRefesh: false,
            listFeeSelected: [],
            totalPay: 0,
            isShowModalReceip: false,
            idReceip: null,
            scrollY: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this._getListUserFee();
        let ida = this.props.navigation.getParam('params', false);
        if (ida.itemtype) {
            setTimeout(() => {
                this._openDetailOrder(ida.itemtype);
            }, 300)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.fee.listUserFee !== nextProps.fee.listUserFee && nextProps.fee.listUserFee.success) {
            let items = nextProps.fee.listUserFee.result.items || [];
            const dataMap = _.groupBy(items, 'package.period' && 'package.year');
            this.setState({ data: _.toArray(dataMap), isRefesh: false });
        }
    }

    _getListUserFee() {
        let unitActive = this.props.units.unitActive;
        let accessTokenApi = this.props.account.accessTokenAPI;
        let languege = Language.listLanguage[this.props.app.languegeLocal].id;
        this.props.actions.fee.getListUserFees(accessTokenApi, languege, unitActive.fullUnitCode);
    }


    _onRefresh() {
        if (this.state.isRefesh) {
            return;
        }
        this.setState({ isRefesh: true });
        this._getListUserFee();
    }



    groupBy(arr, prop) {
        return arr.reduce(function (groups, item) {
            const val = item[prop]
            groups[val] = groups[val] || []
            groups[val].push(item)
            return groups
        }, [])
    }

    async _addItemListFeeSelected(item) {
        let arrTemp = this.state.listFeeSelected.slice();
        let index = arrTemp.findIndex(i => i.id === item.id);
        if (this.state.listFeeSelected.length > 0) {
            if (index === -1) {
                arrTemp.push(item);
            } else if (index > -1) {
                arrTemp.splice(index, 1);
            }
        } else {
            arrTemp.push(item);
        }
        await this.setState({
            listFeeSelected: arrTemp
        })
        this._calTotalPay();
    }

    async _calTotalPay() {
        let total = 0;
        this.state.listFeeSelected.map(item => {
            total += item.totalAmount;
        })
        await this.setState({ totalPay: total })
    }

    async _addAllitem() {
        let listitem = this.props.fee.listUserFee.result.items;
        if (this.state.listFeeSelected.length === listitem.length) {
            await this.setState({ listFeeSelected: [] });
            this._calTotalPay();
            return
        }
        await this.setState({ listFeeSelected: listitem });
        this._calTotalPay();
    }

    _openDetailOrder(id) {
        this.setState({ idReceip: id })
        if (this.state.isShowModalSuccess) {
            this.setState({ isShowModalSuccess: false });
        }
        setTimeout(() => {
            this.setState({ isShowModalDetail: true });
        }, 200);
    }

    _openModalSuccess() {
        this.setState({ isShowModalSuccess: true })
        setTimeout(() => {
            this._onRefresh();
        }, 300)
    }

    _closeModalSuccess() {
        this.setState({ isShowModalSuccess: false })
    }

    _openModalConfirm() {
        this.setState({ isShowModalConfirm: true });
    }

    _closeModalConfirm() {
        this.setState({ isShowModalConfirm: false });
    }

    _openModalHistory() {
        this.setState({ isShowModalHistory: true });
    }

    _closeModalHistory() {
        this.setState({ isShowModalHistory: false });
    }

    _closeModalSelectUnit() {
        this.setState({ isModalSelectUnit: false });
        this._getListUserFee();
    }


}

export default Connect(Fee);
