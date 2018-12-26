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
import Utils from "../../utils";
import _ from "lodash";

import IC_APARTMENT from "@resources/icons/Apartment.png";

import Style from "./style";
import resolution from '../../utils/resolution';

import Language from "../../utils/language";

export default class extends Component {

    componentWillMount() {
        const { project } = this.props.navigation.state.params;

        let accessToken = this.props.account.accessToken;
        this.props.actions.account.switchToUserAccount(accessToken, project.tenantId, project.id);
    }

    // componentWillReceiveProps(nextProps) {
    //     let accessToken = this.props.account.accessToken;
    //     if (!_.isEmpty(nextProps.account.switchAccount) && nextProps.account.switchAccount.success && !nextProps.account.isGetSwichToUserAccount) {
    //         let Token = nextProps.account.switchAccount.result.switchAccountToken;
    //         this.props.actions.account.linkedAccountAuthenticate(accessToken, Token);
    //     }

    //     if (!_.isEmpty(nextProps.account.linkedAccountAuthenticate) && nextProps.account.linkedAccountAuthenticate.success && !nextProps.account.isGetAccessTokenAPI) {
    //         this.props.actions.account.setAccessApiTokenLocal(nextProps.account.linkedAccountAuthenticate.result.accessToken);
    //         this.props.actions.account.setEncTokenLocal(nextProps.account.linkedAccountAuthenticate.result.encryptedAccessToken);
    //         this.props.actions.units.getUnits(nextProps.account.linkedAccountAuthenticate.result.accessToken);
    //         this.props.actions.account.setIsAccessTokenAPI(true);
    //     }
    // }

    render() {
        let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
        return (
            <ImageBackground
                source={IMG_BG}
                resizeMode={'cover'}
                style={Style.container}
            >
                <Text style={{ color: '#505E75', fontSize: 15, marginTop: 123, fontFamily: 'OpenSans-Bold' }}>
                    {languages.APARTMENT_TXT_CONTENT}
                </Text>
                <View style={Style.viewBottom}>
                    <FlatList
                        data={this.props.units.listUnits.result && this.props.units.listUnits.result.items.length > 0 ? this.props.units.listUnits.result.items : Utils.dataPlaceholder}
                        horizontal
                        contentContainerStyle={{ paddingVertical: resolution.scaleHeight(115) }}
                        keyExtractor={(item, index) => 'itemApartment__' + index}
                        renderItem={({ item, index }) => {
                            return <ItemProjectApartment
                                title={item.fullUnitCode}
                                image={IC_APARTMENT}
                                onPressItem={() => this._gotoHome(item)}
                                loading={this.props.units.listUnits.result && this.props.units.listUnits.result.items.length > 0 ? true : false}
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