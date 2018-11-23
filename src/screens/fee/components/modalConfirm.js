import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, FlatList } from 'react-native';

import Connect from '@stores';
import LinearGradient from 'react-native-linear-gradient';
import Resolution from "../../../utils/resolution";
import Button from "../../../components/button";
import IC_CLOSE from "@resources/icons/close.png";
import IC_CALENDAR from "@resources/icons/calendar.png";
import IC_CLOCK from "@resources/icons/clock.png";
// import ModalDetail from "./modalDetail";
import Modal from "react-native-modal";
import HeaderTitle from '@components/headerTitle';
import { isIphoneX } from '@utils/func';

import Header from '@components/header';

const { width, height } = Dimensions.get('window');

const DATA = ['1', '2', '1', '2', '1', '2', '1', '2', '1', '2',]

class modalConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
        }
    }

    render() {
        let data = this.props.listFeeSelected || []
        return (
            <View style={[styles.container, {}]}>
                <Header
                    LinearGradient={true}
                    leftIcon={IC_CLOSE}
                    leftAction={() => this.props.onClose()}
                    headercolor={'transparent'}
                />
                <LinearGradient
                    colors={['#4A89E8', '#8FBCFF']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={{ paddingBottom: Resolution.scale(20) }}>
                    <HeaderTitle title={'Detail order'} />
                </LinearGradient>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                >

                    <View style={{ marginHorizontal: Resolution.scale(20), paddingVertical: Resolution.scale(20), width: width - Resolution.scaleWidth(40), borderRadius: 5, backgroundColor: '#FFF', marginTop: Resolution.scale(20) }}>
                        {
                            data.map((item, index) => (
                                this.renderItem(item, index)
                            ))
                        }
                    </View>

                    <View style={{ marginHorizontal: Resolution.scale(20), width: width - Resolution.scaleWidth(40), backgroundColor: '#FFF', borderRadius: 5, marginTop: Resolution.scale(20), marginBottom: Resolution.scale(40) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Resolution.scale(20), paddingHorizontal: Resolution.scale(20) }}>
                            <View style={{}}>
                                <Text style={{ textAlign: 'left', color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>Sub Total</Text>
                                <Text style={{ textAlign: 'left', paddingVertical: Resolution.scale(20), color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>SalesTax( 10.5% )</Text>
                                <Text style={{ textAlign: 'left', color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>Rouding</Text>
                            </View>
                            <View style={{}}>
                                <Text style={{ textAlign: 'right', fontSize: Resolution.scale(13), color: '#505E75', fontFamily: 'OpenSans-Bold' }}>12.070,260 VND</Text>
                                <Text style={{ textAlign: 'right', paddingVertical: Resolution.scale(20), fontSize: Resolution.scale(13), color: '#505E75', fontFamily: 'OpenSans-Bold' }}>15.51</Text>
                                <Text style={{ textAlign: 'right', fontSize: Resolution.scale(13), color: '#505E75', fontFamily: 'OpenSans-Bold' }}>0.00 VND</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#E6EEFB', flexDirection: 'row', marginHorizontal: Resolution.scale(10), borderRadius: 5, marginBottom: Resolution.scale(20), justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ padding: Resolution.scale(10), color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>
                                Total
                        </Text>
                            <Text style={{ fontSize: Resolution.scale(16), color: '#505E75', fontFamily: 'OpenSans-Bold' }}>
                                13.070,260 VND
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: '#FFF', width: width, height: isIphoneX() ? Resolution.scaleHeight(60) : Resolution.scaleHeight(40) }} />
                <Button
                    disabled={true}
                    onPress={() => { }} style={styles.ButtonAdd}>
                    <Text style={{ color: '#F8F8F8', fontSize: Resolution.scale(14), fontFamily: 'OpenSans-SemiBold' }}>Pay</Text>
                </Button>
            </View>
        );
    }



    renderItem(item, index) {
        return (
            <View
                key={item.id + '__detailOrder'}
                style={[styles.item, { flexDirection: 'row', marginHorizontal: Resolution.scale(20), width: width - Resolution.scaleWidth(40), borderRadius: 5 }]}>
                <View style={{ width: width - Resolution.scaleWidth(80), alignSelf: 'flex-start' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: index === 0 ? 0 : Resolution.scale(20) }}>
                        <Text
                            numberOfLines={2} style={{ fontSize: Resolution.scale(14), fontFamily: 'OpenSans-Bold', width: width - Resolution.scaleWidth(160) }}>
                            {item.description}
                        </Text>
                        <Text
                            numberOfLines={2} style={{ fontSize: Resolution.scale(14), fontFamily: 'OpenSans-Bold', }}>
                            {item.totalAmount + ' VND'}
                        </Text>
                    </View>
                    <Text numberOfLines={1} style={{ color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold', }}>
                        {item.quantity + ' x ' + item.totalAmount}
                    </Text>
                </View>
            </View>
        );
    }

    renderHeader() {
        let dateSelected = this.props.dateSelected
        return <LinearGradient
            colors={['#4A89E8', '#8FBCFF']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={{ width: width, marginBottom: Resolution.scale(20) }}>
            <View>
                <View>
                    <Button
                        onPress={() => this.props.onClose()}
                        style={{ marginTop: Resolution.scale(20), marginLeft: Resolution.scale(20), width: Resolution.scaleWidth(20) }}
                    >
                        <Image source={IC_CLOSE} />
                    </Button>
                </View>

                <Text style={{ color: '#FFFFFF', fontSize: Resolution.scale(35), fontFamily: 'OpenSans-Bold', marginHorizontal: Resolution.scale(20), marginBottom: Resolution.scale(20), marginTop: Resolution.scale(10) }}>{this.formatDateHeader(dateSelected)}</Text>
            </View>
        </LinearGradient>
    }

    _openModal(item) {
        this.setState({ itemSelected: item })
        this.setState({ isShowModal: true });
    }


}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F8FD',
    },

    ButtonAdd: {
        borderRadius: 25,
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: isIphoneX() ? 30 : 20,
        left: width / 2 - 25,
        // backgroundColor: '#01C772',
        backgroundColor: '#e0e0e0',
        // shadowColor: '#4DD49A',
        // shadowOffset: { width: 3, height: 6 },
        // shadowOpacity: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default Connect(modalConfirm);