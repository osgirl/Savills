import React, { Component } from 'react';
import Connect from '@stores';
import layout from './layout';
import Header from '@components/header';
import IC_BACK from "@resources/icons/back-light.png";
import _ from "lodash";

class FAQ extends layout {

    static navigationOptions = ({ navigation }) => ({
        header: <Header
            LinearGradient={true}
            leftIcon={IC_BACK}
            leftAction={() => navigation.goBack()}
            headercolor={'transparent'}
        // center={function () {
        //     return <View><Text>{this.app.test}</Text></View>
        // }}
        // rightIcon={IC_MENU}
        // rightAction={() => alert('Notify')}
        />
    })

    constructor(props) {
        super(props);
        this.state = {

        };

    }



    async componentWillMount() {
        console.log(this.props)
        let accessTokenAPI = this.props.account.accessTokenAPI;
        this.props.actions.utilities.getFAQ(accessTokenAPI);
    }

    // componentWillReceiveProps(){

    // }

}

export default Connect(FAQ);
