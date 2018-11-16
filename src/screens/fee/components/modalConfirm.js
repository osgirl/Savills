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
                    style={{ paddingBottom: 20 }}>
                    <HeaderTitle title={'Detail order'} />
                </LinearGradient>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                >

                    <View style={{ marginHorizontal: 20, paddingVertical: 20, width: width - 40, borderRadius: 5, backgroundColor: '#FFF', marginTop: 20 }}>
                        {
                            DATA.map((item, index) => (
                                this.renderItem(item, index)
                            ))
                        }
                    </View>

                    <View style={{ marginHorizontal: 20, width: width - 40, backgroundColor: '#FFF', borderRadius: 5, marginTop: 20, marginBottom: 40 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 20 }}>
                            <View style={{}}>
                                <Text style={{ textAlign: 'left', color: '#BABFC8', fontSize: 13, fontFamily: 'OpenSans-SemiBold' }}>Sub Total</Text>
                                <Text style={{ textAlign: 'left', paddingVertical: 20, color: '#BABFC8', fontSize: 13, fontFamily: 'OpenSans-SemiBold' }}>SalesTax( 10.5% )</Text>
                                <Text style={{ textAlign: 'left', color: '#BABFC8', fontSize: 13, fontFamily: 'OpenSans-SemiBold' }}>Rouding</Text>
                            </View>
                            <View style={{}}>
                                <Text style={{ textAlign: 'right', fontSize: 13, color: '#505E75', fontFamily: 'OpenSans-Bold' }}>12.070,260 VND</Text>
                                <Text style={{ textAlign: 'right', paddingVertical: 20, fontSize: 13, color: '#505E75', fontFamily: 'OpenSans-Bold' }}>15.51</Text>
                                <Text style={{ textAlign: 'right', fontSize: 13, color: '#505E75', fontFamily: 'OpenSans-Bold' }}>0.00 VND</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#E6EEFB', flexDirection: 'row', marginHorizontal: 10, borderRadius: 5, marginBottom: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ padding: 10, color: '#BABFC8', fontSize: 13, fontFamily: 'OpenSans-SemiBold' }}>
                                Total
                        </Text>
                            <Text style={{ fontSize: 16, color: '#505E75', fontFamily: 'OpenSans-Bold' }}>
                                13.070,260 VND
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: '#FFF', width: width, height: isIphoneX() ? 60 : 40 }} />
                <Button onPress={() => this._openModalConfirm()} style={styles.ButtonAdd}>
                    <Text style={{ color: '#F8F8F8', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Pay</Text>
                </Button>

            </View>
        );
    }



    renderItem(item, index) {
        return (
            <Button
                onPress={() => { }}
                style={[styles.item, { flexDirection: 'row', marginHorizontal: 20, width: width - 40, borderRadius: 5 }]}>
                <View style={{ width: width - 80, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: index === 0 ? 0 : 20 }}>
                        <Text
                            numberOfLines={2} style={{ fontSize: 14, fontFamily: 'OpenSans-Bold' }}>
                            {'Tenist 2'}
                        </Text>
                        <Text
                            numberOfLines={2} style={{ fontSize: 14, fontFamily: 'OpenSans-Bold', }}>
                            {'370,260 VND'}
                        </Text>
                    </View>
                    <Text style={{ color: '#BABFC8', fontSize: 13, fontFamily: 'OpenSans-SemiBold' }}>
                        1 X 370,260 VND
                    </Text>
                </View>
            </Button >
        );
    }

    renderHeader() {
        let dateSelected = this.props.dateSelected
        return <LinearGradient
            colors={['#4A89E8', '#8FBCFF']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={{ width: width, marginBottom: 20 }}>
            <View>
                <View>
                    <Button
                        onPress={() => this.props.onClose()}
                        style={{ marginTop: 20, marginLeft: 20, width: 20 }}
                    >
                        <Image source={IC_CLOSE} />
                    </Button>
                </View>

                <Text style={{ color: '#FFFFFF', fontSize: 35, fontFamily: 'OpenSans-Bold', marginHorizontal: 20, marginBottom: 20, marginTop: 10 }}>{this.formatDateHeader(dateSelected)}</Text>
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
        backgroundColor: '#01C772',
        shadowColor: '#4DD49A',
        shadowOffset: { width: 3, height: 6 },
        shadowOpacity: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default Connect(modalConfirm);