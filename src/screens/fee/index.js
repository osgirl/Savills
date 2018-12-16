import React, { Component } from 'react';
import { Animated } from 'react-native';
import Connect from '@stores';
import layout from './layout';

import _ from "lodash";

class Fee extends layout {

    constructor(props) {
        super(props);
        this.state = {
            isModalSelectUnit: false,
            isShowModalConfirm: false,
            isShowModalHistory: false,
            isShowTitleHeader: false,
            data: [],
            listFeeSelected: [],
            totalPay: 0,
            scrollY: new Animated.Value(0),
        }
    }

    // componentWillMount() {
    // this._getListUserFee();
    // }

    componentDidMount() {
        this._getListUserFee();
        // let unitActive = this.props.units.unitActive;
        // let accessTokenApi = this.props.account.accessTokenAPI;
        // this.props.actions.fee.getListHistory(accessTokenApi, unitActive.fullUnitCode);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.fee.listUserFee !== nextProps.fee.listUserFee && nextProps.fee.listUserFee.success) {
            let items = nextProps.fee.listUserFee.result.items || [];
            const dataMap = _.groupBy(items, 'packageId');
            this.setState({ data: _.toArray(dataMap) });
        }
    }

    _getListUserFee() {
        let unitActive = this.props.units.unitActive;
        let accessTokenApi = this.props.account.accessTokenAPI;
        this.props.actions.fee.getListUserFees(accessTokenApi, unitActive.fullUnitCode);
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
