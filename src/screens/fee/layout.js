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

import IC from "../../resources/icons/notify.png";
import IC_SELECTED from "../../resources/icons/list-view-active.png";

import Utils from "../../utils";

const { width } = Dimensions.get('window');

export default class extends Component {

    render() {
        let unitActive = this.props.units.unitActive;
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
                    showTitleHeader={false}
                    center={
                        <View>
                            <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>FAQ</Text>
                        </View>
                    }
                    renderViewRight={
                        <Button
                            onPress={() => this.setState({ isModalSelectUnit: true })}
                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                            <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: 14 }}>{unitActive.fullUnitCode}</Text>
                            <Image source={IC_DROPDOWN} style={{ marginLeft: 10 }} />
                        </Button>
                    }
                />
                <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{}}>
                    <Animated.View style={{ height: 60 }}>
                        <Animated.View style={{ opacity: 1 }}>
                            <HeaderTitle title={'Fee'} />
                        </Animated.View>
                    </Animated.View>
                    <View style={{ marginTop: 20, alignItems: 'center' }}>
                        <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'OpenSans-Semibold' }}>October / 2018</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 35, fontFamily: 'OpenSans-Semibold', color: '#FFF' }}>{Utils.convertNumber(this.state.totalPay)}</Text>
                            <Text style={{ fontSize: 20, fontFamily: 'OpenSans-Semibold', color: '#FFF', textAlign: 'right', marginLeft: 10, paddingBottom: 5 }}>VND</Text>
                        </View>
                        <Text style={{ fontSize: 14, fontFamily: 'OpenSans-Semibold', color: '#FFF', opacity: 0.5 }}>{unitActive.fullUnitCode}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
                        <Button style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={IC} style={{ marginRight: 20 }} />
                            <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Semibold', color: '#FFF' }}>
                                Tất cả
                            </Text>
                        </Button>
                        <Button style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, fontFamily: 'OpenSans-Semibold', color: '#FFF', marginRight: 20 }}>
                                Lịch sử
                            </Text>
                            <Image source={IC} />
                        </Button>
                    </View>
                </LinearGradient>

                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => item[0].id + '__' + index}
                    renderItem={({ item, index }) => this.renderItem(item)}
                    extraData={this.state}
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

    renderItem(item, index) {
        // console.log(item)
        return (
            <View>
                <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                    <Text style={{ color: '#505E75', fontSize: 14, fontFamily: 'OpenSans-Bold' }}>
                        {item[0].package.period + '-' + item[0].package.year}
                    </Text>
                </View>
                {

                    item.map((data, index) => {
                        let check = this.state.listFeeSelected.some(e => e.id === data.id);
                        return <Button key={data.id + 'itemFee____' + index}
                            onPress={() => this._addItemListFeeSelected(data)}
                            style={{ padding: 20, backgroundColor: '#FFFFFF', borderRadius: 5, marginBottom: 10, marginHorizontal: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={check ? IC_SELECTED : IC} style={{ marginRight: 20 }} />
                                    <View style={{ width: width - 165 }}>
                                        <Text numberOfLines={1} style={{ fontSize: 12, color: '#343D4D', fontFamily: 'OpenSans-SemiBold' }}>{data.description}</Text>
                                        <Text numberOfLines={1} style={{ fontSize: 13, color: '#DEDEDE', fontFamily: 'OpenSans-SemiBold' }}>{data.fullUnitCode}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ color: '#BABFC8', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>{'$' + data.totalAmount}</Text>
                                </View>
                            </View>
                        </Button>
                    })
                }
            </View>
        )
    }

}