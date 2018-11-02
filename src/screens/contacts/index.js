import React, { Component } from 'react';
import Connect from '@stores';
import Layout from './layout';

import Header from '@components/header'
import IC_BACK from "@resources/icons/back-light.png";

class Contacts extends Layout {

    static navigationOptions = ({ navigation }) => ({
        header: <Header
            LinearGradient={true}
            headercolor={'transparent'}
            leftIcon={IC_BACK}
            leftAction={() => navigation.goBack()}
        // center={function () {
        //     return <View><Text>{this.app.test}</Text></View>
        // }}
        // rightIcon={IC_MENU}
        // rightAction={() => alert('Notify')}
        />
    })

}

export default Connect(Contacts);

