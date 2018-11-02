import React, { Component } from 'react';
import { Text, View, Image, Animated } from "react-native";
import Connect from '@stores';
import layout from './layout';
import _ from "lodash";

import Header from '@components/header'
import Button from "@components/button";
import IC_EDIT from "@resources/icons/edit-profile.png";
import IC_NOTIFY from "@resources/icons/notify.png";

let DATA = [
    { id: 1, key: 'Pages.Resident', title: 'Events', screen: 'Events' },
    { id: 2, key: 'Pages.Resident.Booking', title: 'Booking', screen: '' },
    { id: 3, key: 'Pages.Resident.WorkOrder', title: 'Work Order', screen: '' },
    { id: 4, key: 'invoice', title: 'Invoice', screen: '' },
    { id: 5, key: 'Pages.Resident.Inbox', title: 'Inbox', screen: '' },
    { id: 6, key: 'Pages.Resident.Feedback', title: 'Feed back', screen: '' },
    { id: 7, key: 'e-libary', title: 'E-labary', screen: '' },
    { id: 8, key: 'Pages.Resident.Contacts', title: 'Contacts', screen: 'Contacts' },
    { id: 9, key: 'Pages.Resident.FrontDesk', title: 'Frontdesk', screen: '' },
    { id: 10, key: 'Pages.Resident.Fee', title: 'Free', screen: '' },
    { id: 10, key: 'Pages.FAQ', title: 'FAQ', screen: 'FAQ' },
]


class Home extends layout {

    static navigationOptions = ({ navigation }) => ({
        header: <Header
            animatedLeft
            headercolor={'#F6F8FD'}
            leftIcon={IC_EDIT}
            leftAction={navigation.getParam('openProfileHome')}
            customViewLeft={navigation.getParam('isHidenHeaderHome')}
            renderViewLeft={
                <Button
                    onPress={navigation.getParam('openProfileHome')}
                    style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                    <Image source={{ uri: navigation.getParam('userAvatar') }}
                        style={{ width: 30, height: 30, borderRadius: 30 / 2 }}
                    />
                    <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                        <Text style={{ fontSize: 15, fontFamily: 'OpenSans-Bold' }}>
                            {navigation.getParam('userDisplayname')}</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Regular', color: '#BABFC8' }}>
                            {navigation.getParam('userFullUnitCode')}</Text>
                    </View>
                </Button>
            }
            rightIcon={IC_NOTIFY}
            rightAction={() => alert('Notify')}
        />
    })

    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0), // Animated event scroll,
            isShowProfile: false,
            loading: false,
            dataModule: [],
            profile: null,
            numcolumn: 2
        }
        this.showCenter = false;
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.account.userSettings !== nextProps.account.userSettings && nextProps.account.userSettings.success) {
            let dataGrantedPermissions = nextProps.account.userSettings.result.auth.grantedPermissions;
            let accessTokenApi = this.props.account.accessTokenAPI;
            let arrTemp = [];
            DATA.map(item => {
                if (item.key in dataGrantedPermissions && dataGrantedPermissions[item.key]) {
                    arrTemp.push(item);
                }
            })
            await this.setState({ dataModule: arrTemp })
        }
    }


    async componentWillMount() {
        let accessTokenApi = this.props.account.accessTokenAPI;
        await this.props.navigation.setParams({ openProfileHome: this._openProfile.bind(this) });
        await this.props.actions.userProfile.getCurrentLoginInformations(accessTokenApi);
        await this.props.actions.userProfile.getImageUserProfile(accessTokenApi);
        await this.props.actions.account.getUserSettings(accessTokenApi);

        // if (_.isEmpty(this.props.account.tenantLocal) || this.props.account.tenant.length > 0) {
        //     await this.props.actions.account.setTenantLocal(this.props.account.tenant);
        //     await this.props.actions.account.getTenantLocal();
        // }
    }

    _gotoChangePassword() {
        if (this.state.isShowProfile)
            this.setState({ isShowProfile: false })
        this.props.navigation.navigate('ChangePassword', { status: 'change' })
    }

    _openProfile() {
        this.setState({ isShowProfile: true })
    }

    _closeProfile() {
        this.setState({ isShowProfile: false })
    }

    _gotoModule(screen) {
        this.props.navigation.navigate(screen);
    }

    async _logOut() {
        await this.setState({ loading: true });
        await this.props.actions.account.logOut('');
        await this.props.actions.units.setUnitLocal({});
        await this.props.actions.account.setTenantLocal({});
        await this.props.actions.account.setAccessTokenLocal('');
        await this.props.actions.account.setAccessApiTokenLocal('');
        await this.props.actions.account.setEncTokenLocal('');

        await this.setState({ loading: false });
        if (this.state.isShowProfile)
            await this.setState({ isShowProfile: false })
        await this.props.navigation.navigate('Login');
    }



}

export default Connect(Home);
