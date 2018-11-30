import React, { Component } from 'react';
import {
    View,
    Text,
    WebView, Image, Dimensions,
    StatusBar, Animated, FlatList
} from 'react-native';
import Header from '@components/header';
import IC_BACK from "@resources/icons/back-light.png";
import IC_DROPDOWN from "@resources/icons/dropDown.png";
import Button from "@components/button";
import ModalSelectUnit from "@components/modalSelectUnit";
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import HeaderTitle from '@components/headerTitle';
import ModalConfirm from "./components/modalConfirm";
import ModalHistory from "./components/modalHistory";

import IC_CHECK_BLUE from "../../resources/icons/check_blue_fee.png";
import IC_CHECKED from "../../resources/icons/checked_fee.png";
import IC_HISTORY from "../../resources/icons/history_fee.png";

import IC_CHECK_WHITE from "../../resources/icons/check_fee.png";
import IC_CHECKED_WHITE from "../../resources/icons/checked_white_fee.png";
import Resolution from "../../utils/resolution";

import { isIphoneX } from '@utils/func';

import Utils from "../../utils";

import Styles from "./styles";

const { width } = Dimensions.get('window');

export default class extends Component {

    handleScroll = event => {
        Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
            listener: event => {
                if (event.nativeEvent.contentOffset.y > 50) {
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
        }, { useNativeDriver: true })(event);
    };

    render() {
        let unitActive = this.props.units.unitActive;

        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, 30, 60],
            outputRange: [60, 30, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

        const opacityTextTitle = this.state.scrollY.interpolate({
            inputRange: [0, 60, 100],
            outputRange: [1, 0.5, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

        const opacityViewPrice = this.state.scrollY.interpolate({
            inputRange: [120, 140, 170],
            outputRange: [0, 0.5, 1],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

        const headerHeightViewPrice = this.state.scrollY.interpolate({
            inputRange: [120, 140, 170],
            outputRange: [0, 25, 50],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

        const opacityTextPrice = this.state.scrollY.interpolate({
            inputRange: [0, 60, 100],
            outputRange: [1, 0.5, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

        const headerHeightContentTop = this.state.scrollY.interpolate({
            inputRange: [0, 60, 90, 120],
            outputRange: [120, 90, 60, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

        let checkAll = this.props.fee.listUserFee.result && this.state.listFeeSelected.length === this.props.fee.listUserFee.result.items.length ? true : false;


        return (
            <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
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
                            <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>Fee</Text>
                        </View>
                    }
                    renderViewRight={
                        <Button
                            onPress={() => this.setState({ isModalSelectUnit: true })}
                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: Resolution.scale(20) }}>
                            <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: Resolution.scale(14) }}>{unitActive.fullUnitCode}</Text>
                            <Image source={IC_DROPDOWN} style={{ marginLeft: Resolution.scale(10) }} />
                        </Button>
                    }
                />
                <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{}}>
                    <Animated.View style={{ height: headerHeight }}>
                        <Animated.View style={{ opacity: opacityTextTitle }}>
                            <HeaderTitle title={'Fee'} />
                        </Animated.View>
                    </Animated.View>
                    <Animated.View style={{ height: headerHeightContentTop }}>
                        <Animated.View style={{ marginTop: Resolution.scale(20), alignItems: 'center', opacity: opacityTextPrice }}>
                            <Text style={{ color: '#FFFFFF', fontSize: Resolution.scale(14), fontFamily: 'OpenSans-Semibold' }}>October / 2018</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: Resolution.scale(35), fontFamily: 'OpenSans-Semibold', color: '#FFF' }}>{Utils.convertNumber(this.state.totalPay)}</Text>
                                <Text style={{ fontSize: Resolution.scale(20), fontFamily: 'OpenSans-Semibold', color: '#FFF', textAlign: 'right', marginLeft: Resolution.scale(10), paddingBottom: Resolution.scale(5) }}>VND</Text>
                            </View>
                            <Text style={{ fontSize: Resolution.scale(14), fontFamily: 'OpenSans-Semibold', color: '#FFF', opacity: 0.5 }}>{unitActive.fullUnitCode}</Text>
                        </Animated.View>
                    </Animated.View>

                    <Animated.View style={{ height: headerHeightViewPrice, opacity: opacityViewPrice, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Resolution.scale(20) }}>
                            <View style={{}}>
                                <Text style={{ color: '#FFFFFF', fontSize: Resolution.scale(10), fontFamily: 'OpenSans-Semibold', textAlign: 'left' }}>October / 2018</Text>
                                <Text style={{ fontSize: Resolution.scale(10), fontFamily: 'OpenSans-Semibold', color: '#FFF', opacity: 0.5, textAlign: 'left' }}>{unitActive.fullUnitCode}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: Resolution.scale(10), fontFamily: 'OpenSans-Semibold', color: '#FFF', textAlign: 'right', marginRight: Resolution.scale(10), paddingBottom: Resolution.scale(5) }}>VND</Text>
                                <Text style={{ fontSize: Resolution.scale(22), fontFamily: 'OpenSans-Semibold', color: '#FFF' }}>{Utils.convertNumber(this.state.totalPay)}</Text>
                            </View>
                        </View>
                    </Animated.View>


                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Resolution.scale(20), paddingVertical: Resolution.scale(10) }}>
                        <Button
                            onPress={() => this._addAllitem()}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={checkAll ? IC_CHECKED_WHITE : IC_CHECK_WHITE} style={{ marginRight: Resolution.scale(20) }} />
                            <Text style={{ fontSize: Resolution.scale(12), fontFamily: 'OpenSans-Semibold', color: '#FFF' }}>
                                Tất cả
                            </Text>
                        </Button>
                        <Button
                            onPress={() => this._openModalHistory()}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: Resolution.scale(12), fontFamily: 'OpenSans-Semibold', color: '#FFF', marginRight: Resolution.scale(20) }}>
                                Lịch sử
                            </Text>
                            <Image source={IC_HISTORY} />
                        </Button>
                    </View>

                </LinearGradient>

                <FlatList
                    data={this.state.data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item[0].id + '__' + index}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    renderItem={({ item, index }) => this.renderItem(item)}
                    extraData={this.state}
                />

                <View style={{ backgroundColor: '#FFF', width: width, height: isIphoneX() ? Resolution.scaleHeight(60) : Resolution.scaleHeight(40) }} />
                <Button onPress={() => this._openModalConfirm()} style={[Styles.ButtonAdd, { backgroundColor: this.state.listFeeSelected.length > 0 ? '#01C772' : '#e0e0e0', }]}>
                    <Text style={{ color: '#F8F8F8', fontSize: Resolution.scale(14), fontFamily: 'OpenSans-SemiBold' }}>Pay</Text>
                </Button>

                <Modal
                    style={{ flex: 1, margin: 0 }}
                    isVisible={this.state.isModalSelectUnit}>
                    <ModalSelectUnit
                        onClose={() => this.setState({ isModalSelectUnit: false })}
                    />
                </Modal>

                <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isShowModalConfirm}>
                    <ModalConfirm
                        onClose={() => this._closeModalConfirm()}
                        listFeeSelected={this.state.listFeeSelected}
                    />
                </Modal>
                <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isShowModalHistory}>
                    <ModalHistory
                        onClose={() => this._closeModalHistory()}
                    />
                </Modal>
            </View>
        );
    }

    renderItem(item, index) {
        return (
            <View>
                <View style={{ marginHorizontal: Resolution.scale(20), marginVertical: Resolution.scale(20) }}>
                    <Text style={{ color: '#505E75', fontSize: Resolution.scale(14), fontFamily: 'OpenSans-Bold' }}>
                        {item[0].package.period + '-' + item[0].package.year}
                    </Text>
                </View>
                {
                    item.map((data, index) => {
                        let check = this.state.listFeeSelected.some(e => e.id === data.id);
                        return <Button key={data.id + 'itemFee____' + index}
                            onPress={() => this._addItemListFeeSelected(data)}
                            style={{ padding: Resolution.scale(20), backgroundColor: '#FFFFFF', borderRadius: 5, marginBottom: Resolution.scale(10), marginHorizontal: Resolution.scale(20) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={check ? IC_CHECKED : IC_CHECK_BLUE} style={{ marginRight: Resolution.scale(20) }} />
                                    <View style={{ width: width - Resolution.scaleWidth(165) }}>
                                        <Text numberOfLines={1} style={{ fontSize: Resolution.scale(12), color: '#343D4D', fontFamily: 'OpenSans-SemiBold' }}>{data.description}</Text>
                                        <Text numberOfLines={1} style={{ fontSize: Resolution.scale(13), color: '#DEDEDE', fontFamily: 'OpenSans-SemiBold' }}>{data.fullUnitCode}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ color: '#BABFC8', fontSize: Resolution.scale(14), fontFamily: 'OpenSans-SemiBold' }}>{'$' + data.totalAmount}</Text>
                                </View>
                            </View>
                        </Button>
                    })
                }
            </View>
        )
    }

}