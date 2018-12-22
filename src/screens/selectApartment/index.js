import React, { Component } from 'react';
import Connect from '@stores';
import layout from './layout';



class SelectApartment extends layout {

    async _gotoHome(unit) {
        const accessTokenAPI = this.props.account.accessTokenAPI;
        await this.props.actions.units.setUnitLocal(unit);
        await this.props.actions.units.getUnitLocal();
        await this.props.actions.notification.getListCountModule(accessTokenAPI, unit.unitId);
        await this.props.navigation.navigate('Home');
    }




}

export default Connect(SelectApartment);
