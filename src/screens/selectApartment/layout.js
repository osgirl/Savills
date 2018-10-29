import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    FlatList
} from 'react-native';

import IMG_BG from "@resources/image/ChooseApartment.png";
import ItemProjectApartment from "../../components/itemProjectApartment";
import Header from '@components/header'
import IC_BACK from "@resources/icons/back-dark.png";
import Button from "../../components/button";

import _ from "lodash";

import IC_APARTMENT from "@resources/icons/Apartment.png";

import Style from "./style";

let DATA = [
    { id: 1, title: 'T1-A03-01' },
    { id: 2, title: 'T1-A03-01' },
    { id: 3, title: 'T1-A03-01' },
    { id: 4, title: 'T1-A03-01' },
]

export default class extends Component {

    componentWillMount() {
        const { project } = this.props.navigation.state.params;

        let accessToken = this.props.account.accessToken;
        this.props.actions.account.switchToUserAccount(accessToken, project.tenantId, project.id);
    }

    componentWillReceiveProps(nextProps) {
        let accessToken = this.props.account.accessToken;
        if (_.isEmpty(this.props.account.linkedAccountAuthenticate) && !nextProps.account.isGetSwichToUserAccount) {
            let Token = nextProps.account.switchAccount.switchAccountToken;
            this.props.actions.account.linkedAccountAuthenticate(accessToken, Token);
        }

        if (!_.isEmpty(this.props.account.linkedAccountAuthenticate) && !nextProps.account.isGetAccessTokenAPI) {
            this.props.actions.account.setAccessApiTokenLocal(nextProps.account.linkedAccountAuthenticate.accessToken);
            this.props.actions.units.getUnits(nextProps.account.linkedAccountAuthenticate.accessToken);
            this.props.actions.account.setIsAccessTokenAPI();
        }
    }

    render() {

        return (
            <ImageBackground
                source={IMG_BG}
                resizeMode={'contain'}
                style={Style.container}
            >
                <Text style={{ color: '#505E75', fontSize: 15, marginTop: 123, fontFamily: 'Opensans-Bold' }}>
                    Choose Your apartment
                </Text>
                <View style={Style.viewBottom}>
                    <FlatList
                        data={this.props.units.listUnits.items && this.props.units.listUnits.items}
                        horizontal
                        contentContainerStyle={{ paddingVertical: 5 }}
                        keyExtractor={(item) => item.fullUnitCode}
                        renderItem={({ item, index }) => {
                            return <ItemProjectApartment
                                title={item.fullUnitCode}
                                image={IC_APARTMENT}
                                onPressItem={() => this._gotoHome(item)}
                            />
                        }}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                        ListHeaderComponent={() => <View style={{ width: 20 }} />}
                        ListFooterComponent={() => <View style={{ width: 20 }} />}
                    />
                </View>
            </ImageBackground>
        );
    }
}