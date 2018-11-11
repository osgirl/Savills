import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
    Image,
    FlatList,
    Dimensions,StatusBar
} from 'react-native';

import Button from "@components/button";
import InputText from "@components/inputText";
import LinearGradient from 'react-native-linear-gradient';
import Loading from "@components/loading";
import HeaderTitle from '@components/headerTitle';
import FastImage from "../../components/fastImage";
import call from 'react-native-phone-call'

import ModalSelectUnit from "@components/modalSelectUnit";
import Modal from "react-native-modal";

import IC_CALL from "@resources/icons/Call-button.png";
import Header from '@components/header'
import IC_BACK from "@resources/icons/back-light.png";
import IC_DROPDOWN from "@resources/icons/dropDown.png";

const { width, height } = Dimensions.get('window');

import Style from "./style";
import resolution from '../../utils/resolution';

import Language from "../../utils/language";

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this._getEmployeesByOu();
    }

    _getEmployeesByOu() {
        let accessTokenAPI = this.props.account.accessTokenAPI;
        this.props.actions.units.getEmployeesByOu(accessTokenAPI);
    }

    _call(number) {
        const args = {
            number: number,
            prompt: false,
        };
        call(args).catch(console.error);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.units.employeesByOu !== nextProps.units.employeesByOu && nextProps.units.employeesByOu.success) {
            this.setState({ data: nextProps.units.employeesByOu.result.items })
        }
    }

    renderHeader() {
        let LG = Language.listLanguage[this.props.app.languegeLocal].data
        return (
            <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={{ marginBottom: 20 }}>
                <HeaderTitle title={LG.CONTACTS_TXT_TITLE} />
            </LinearGradient>
        )
    }

    renderItem(item) {
        let encToken = this.props.account.encToken;
        let image = `${item.user.fileUrl}&encToken=${encodeURIComponent(encToken)}`;
        return (
            <Button
                activeOpacity={1}
                onPress={() => { }}
                style={[{ marginHorizontal: 20, width: width - 40, backgroundColor: '#FFF', borderRadius: 5 }]}>
                <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                    <FastImage
                        style={{ width: 50, height: 50, borderRadius: 50 / 2, }}
                        source={image}
                        resizeMode={'cover'}
                    />
                    <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                        <Text
                            numberOfLines={2} style={{ color: '#505E75', fontSize: 14, fontFamily: 'OpenSans-Bold', width: resolution.scaleWidth(175) }}>
                            {`${item.user.fullName} - ${item.user.customFields.JobTitle}`}
                        </Text>
                        <View style={{ flexDirection: 'column', }}>
                            <Text
                                numberOfLines={1} style={{ color: '#BABFC8', fontSize: 10, fontFamily: 'OpenSans-Bold' }}>
                                {item.user.emailAddress}
                            </Text>
                            <Text
                                numberOfLines={1} style={{ color: '#BABFC8', fontSize: 10, fontFamily: 'OpenSans-Bold' }}>
                                {item.user.phoneNumber}
                            </Text>
                        </View>
                    </View>
                    <Button onPress={() => this._call(item.user.phoneNumber)}>
                        <Image source={IC_CALL} />
                    </Button>
                </View>
            </Button >
        );
    }

    render() {
        let unitActive = this.props.units.unitActive;
        return (
            <View style={Style.container}>
                <StatusBar
                    barStyle="light-content"
                />
                <Header
                    LinearGradient={true}
                    leftIcon={IC_BACK}
                    leftAction={() => this.props.navigation.goBack()}
                    headercolor={'transparent'}
                    renderViewRight={
                        <Button
                            onPress={() => this.setState({ isModalSelectUnit: true })}
                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                            <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: 14 }}>{unitActive.fullUnitCode}</Text>
                            <Image source={IC_DROPDOWN} style={{ marginLeft: 10 }} />
                        </Button>
                    }
                />
                <FlatList
                    alwaysBounceVertical={false}
                    data={this.state.data || []}
                    keyExtractor={(item) => item.user.id + ''}
                    renderItem={({ item, index }) => (
                        this.renderItem(item)
                    )}
                    legacyImplementation={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    ListHeaderComponent={() => this.renderHeader()}
                    ListFooterComponent={() => <View style={{ height: 20 }} />}
                />
                <Modal
                    style={{ flex: 1, margin: 0 }}
                    isVisible={this.state.isModalSelectUnit}>
                    <ModalSelectUnit
                        onClose={() => this.setState({ isModalSelectUnit: false })}
                    />
                </Modal>
            </View>
        );
    }
}