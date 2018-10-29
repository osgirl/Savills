import React, { Component } from 'react';
import Connect from '@stores';
import layout from './layout';



class SelectApartment extends layout {

    async _gotoHome(unit) {
        await this.props.actions.units.setUnitLocal(unit);
        await this.props.actions.units.getUnitLocal();
        await this.props.navigation.navigate('Home');
    }




}

export default Connect(SelectApartment);
