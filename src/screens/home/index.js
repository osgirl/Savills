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
    { id: 1, key: 'Pages.Resident', title: 'Events' },
    { id: 2, key: 'Pages.Resident.Booking', title: 'Booking' },
    { id: 3, key: 'Pages.Resident.WorkOrder', title: 'Work Order' },
    { id: 4, key: 'invoice', title: 'Invoice' },
    { id: 5, key: 'Pages.Resident.Inbox', title: 'Inbox' },
    { id: 6, key: 'Pages.Resident.Feedback', title: 'Feed back' },
    { id: 7, key: 'e-libary', title: 'E-labary' },
    { id: 8, key: 'Pages.Resident.Contacts', title: 'Contacts' },
    { id: 9, key: 'Pages.Resident.FrontDesk', title: 'Frontdesk' },
    { id: 10, key: 'Pages.Resident.Fee', title: 'Free' },
]


class Home extends layout {

    static navigationOptions = ({ navigation }) => ({
        header: <Header
            headercolor={'#F6F8FD'}
            leftIcon={IC_EDIT}
            leftAction={navigation.getParam('openProfileHome')}
            customViewLeft={navigation.getParam('isHidenHeaderHome')}
            renderViewLeft={
                <Button
                    onPress={navigation.getParam('openProfileHome')}
                    style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                    <Image source={{ uri: 'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/26168307_1832573663480180_5899833810848274293_n.jpg?_nc_cat=109&_nc_ht=scontent.fsgn5-6.fna&oh=fa469d9c20f13899bd5f8757b5b675e1&oe=5C84EE81' }}
                        style={{ width: 30, height: 30, borderRadius: 30 / 2 }}
                    />
                    <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                        <Text style={{ fontSize: 15, fontFamily: 'OpenSans-Bold' }}>{'Hey!! Toan Tam'}</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Regular', color: '#BABFC8' }}>{'T1-A03-01'}</Text>
                    </View>
                </Button>
            }
            // center={function () {
            //     return <View><Text>{this.app.test}</Text></View>
            // }}
            // rightIconL={navigation.getParam('isHidenHeaderHome') ? IC_EDIT : null}
            // rightActionL={() => alert('Edit L')}
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
            dataModule: []
        }
        this.showCenter = false;

    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.account.userSettings !== nextProps.account.userSettings && nextProps.account.userSettings.success) {
            let dataGrantedPermissions = nextProps.account.userSettings.result.auth.grantedPermissions;
            // console.log(dataGrantedPermissions)
            let arrTemp = [];
            DATA.map(item => {
                if (item.key in dataGrantedPermissions && dataGrantedPermissions[item.key]) {
                    arrTemp.push(item);
                }
            })

            await this.setState({ dataModule: arrTemp })
            // console.log(this.state.dataModule)
        }
    }


    async componentWillMount() {
        let accessTokenApi = this.props.account.accessTokenAPI;
        await this.props.navigation.setParams({ openProfileHome: this._openProfile.bind(this) });
        await this.props.actions.account.getUserSettings(accessTokenApi);

        if (_.isEmpty(this.props.account.tenantLocal)) {
            this.props.actions.account.setTenantLocal(this.props.account.tenant);
        }
    }

    _openProfile() {
        this.setState({ isShowProfile: true })
    }

    _closeProfile() {
        this.setState({ isShowProfile: false })
    }

    async _logOut() {
        this.setState({ loading: true });
        await this.props.actions.account.logOut('');
        await this.props.actions.units.setUnitLocal({}).then(() => {
            this.setState({ loading: false })
            this.props.navigation.navigate('Login');
        })
    }



}

export default Connect(Home);
