import React, { Component } from 'react';
import Connect from '@stores';
import layout from './layout';

import Header from '@components/header'
import IC_EDIT from "@resources/icons/edit-profile.png";
import IC_NOTIFY from "@resources/icons/notify.png";

class Home extends layout {

    static navigationOptions = ({ navigation }) => ({
        header: <Header
            headercolor={'#F6F8FD'}
            leftIcon={IC_EDIT}
            leftAction={() => alert('edit profile')}
        // center={function () {
        //     return <View><Text>{this.app.test}</Text></View>
        // }}
        rightIcon={IC_NOTIFY}
        rightAction={() => alert('Notify')}
        />
    })

}

export default Connect(Home);
