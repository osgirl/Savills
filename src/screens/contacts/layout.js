import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
    Image,
    FlatList,
    Dimensions, StatusBar, Animated
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
import IC_AVATARDF from "../../resources/icons/avatar-default.png";

const { width, height } = Dimensions.get('window');

import Style from "./style";
import Resolution from '../../utils/resolution';

import Language from "../../utils/language";

import { ItemPlaceHolderH } from "../../components/placeHolderItem";

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

    handleScroll = event => {
        Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
                listener: event => {
                    if (event.nativeEvent.contentOffset.y > 30) {
                        if (!this.showCenter) {
                            this.showCenter = true;
                            this.setState({ isShowTitleHeader: true });
                        }
                    } else {
                        if (this.showCenter) {
                            this.showCenter = false;
                            this.setState({ isShowTitleHeader: false });
                        }
                    }
                }
            },
            { useNativeDriver: true }
        )(event);
    };

    renderHeader() {
        let LG = Language.listLanguage[this.props.app.languegeLocal].data;

        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, 30],
            outputRange: [60, 0],
            extrapolate: 'clamp'
        });

        const opacity = this.state.scrollY.interpolate({
            inputRange: [0, 25, 50],
            outputRange: [1, 0.5, 0],
            extrapolate: 'clamp'
        });
        return (
            <Animated.View style={{ height: headerHeight }}>
                <LinearGradient
                    colors={['#4A89E8', '#8FBCFF']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={{ flex: 1 }}>
                    <Animated.View style={{ opacity: opacity }}>
                        <HeaderTitle title={LG.CONTACTS_TXT_TITLE} />
                    </Animated.View>
                </LinearGradient>
            </Animated.View>
        )
    }

    renderItem(item) {
        let encToken = this.props.account.encToken;
        let image = item.user.fileUrl ? `${item.user.fileUrl}&encToken=${encodeURIComponent(encToken)}` : IC_AVATARDF;
        return (
            <Button
                activeOpacity={1}
                onPress={() => { }}
                style={[{ marginHorizontal: Resolution.scale(20), width: width - Resolution.scale(40), backgroundColor: '#FFF', borderRadius: 5 }]}>
                <View style={{ flexDirection: 'row', padding: Resolution.scale(20), justifyContent: 'space-between', alignItems: 'center' }}>
                    <FastImage
                        style={{ width: Resolution.scale(50), height: Resolution.scale(50), borderRadius: Resolution.scale(50) / 2, }}
                        source={image}
                        resizeMode={'cover'}
                    />
                    <View style={{ flexDirection: 'column', marginHorizontal: Resolution.scale(20), flex: 3 }}>
                        <Text
                            numberOfLines={2} style={{ color: '#505E75', fontSize: Resolution.scale(14), fontFamily: 'OpenSans-Bold', width: Resolution.scaleWidth(175) }}>
                            {`${item.user.fullName} - ${item.user.customFields.JobTitle}`}
                        </Text>
                        <View style={{ flexDirection: 'column', }}>
                            <Text
                                numberOfLines={1} style={{ color: '#BABFC8', fontSize: Resolution.scale(10), fontFamily: 'OpenSans-Bold' }}>
                                {item.user.emailAddress}
                            </Text>
                            <Text
                                numberOfLines={1} style={{ color: '#BABFC8', fontSize: Resolution.scale(10), fontFamily: 'OpenSans-Bold' }}>
                                {item.user.phoneNumber}
                            </Text>
                        </View>
                    </View>
                    <Button
                        style={{ alignItems: 'flex-end' }}
                        onPress={() => this._call(item.user.phoneNumber)}>
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
                    showTitleHeader={this.state.isShowTitleHeader}
                    center={
                        <View>
                            <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{'Feedback'}</Text>
                        </View>
                    }
                    renderViewRight={
                        <Button
                            onPress={() => this._openModalSelectUnit()}
                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: Resolution.scale(20) }}
                        >
                            <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: Resolution.scale(14) }}>
                                {unitActive.fullUnitCode}
                            </Text>
                            <Image source={IC_DROPDOWN} style={{ marginLeft: Resolution.scale(10) }} />
                        </Button>
                    }
                />
                {this.renderHeader()}
                {
                    this.props.units.employeesByOu && this.props.units.employeesByOu.success ?
                        <FlatList
                            alwaysBounceVertical={false}
                            data={this.state.data || []}
                            keyExtractor={(item) => item.user.id + ''}
                            renderItem={({ item, index }) => (
                                this.renderItem(item)
                            )}
                            onScroll={this.handleScroll}
                            legacyImplementation={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View style={{ height: Resolution.scale(10) }} />}
                            ListHeaderComponent={() => <View style={{ height: Resolution.scale(20) }} />}
                            ListFooterComponent={() => <View style={{ height: Resolution.scale(20) }} />}
                        /> : <ItemPlaceHolderH />
                }

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