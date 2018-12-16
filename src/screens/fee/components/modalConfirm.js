import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, Animated, Platform } from 'react-native';

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
import Utils from "../../../utils";

import Header from '@components/header';
import AnimatedTitle from "@components/animatedTitle";

const HEADER_MAX_HEIGHT = 50;

const { width, height } = Dimensions.get('window');

class modalConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
            scrollY: new Animated.Value(
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            isShowTitleHeader: false
        }
    }

    handleScroll = event => {
        Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
        }, { useNativeDriver: true })(event);
    };

    render() {
        let data = this.props.listFeeSelected || []

        let serviceFee = 0;
        let summary = 0;
        let total = 0;
        data.map(item => {
            serviceFee += item.serviceAmount;
            summary += item.debitAmount;
        })
        total = summary + serviceFee;

        return (
            <View style={[styles.container, {}]}>
                {this.renderHeader()}
                <ScrollView
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    contentContainerStyle={{
                        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
                    }}
                    contentInset={{
                        top: HEADER_MAX_HEIGHT,
                    }}
                    contentOffset={{
                        y: -HEADER_MAX_HEIGHT,
                    }}
                >

                    <View style={{ marginHorizontal: Resolution.scale(20), paddingVertical: Resolution.scale(20), width: width - Resolution.scaleWidth(40), borderRadius: 5, backgroundColor: '#FFF', marginTop: Resolution.scale(20) }}>
                        {
                            data.map((item, index) => (
                                this.renderItem(item, index)
                            ))
                        }
                    </View>

                    <View style={{ marginHorizontal: Resolution.scale(20), backgroundColor: '#FFF', borderRadius: 5, marginTop: Resolution.scale(20), marginBottom: Resolution.scale(40) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Resolution.scale(20), paddingHorizontal: Resolution.scale(20) }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: 'left', color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>Item Summary</Text>
                                <Text style={{ textAlign: 'left', paddingVertical: Resolution.scale(20), color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>Service Fee</Text>
                                {/* <Text style={{ textAlign: 'left', color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>Rouding</Text> */}
                            </View>
                            <View style={{ flex: 0.8 }}>
                                <Text numberOfLines={1} style={{ textAlign: 'right', fontSize: Resolution.scale(13), color: '#505E75', fontFamily: 'OpenSans-Bold' }}>{Utils.convertNumber(summary) + ' VND'}</Text>
                                <Text numberOfLines={1} style={{ textAlign: 'right', paddingVertical: Resolution.scale(20), fontSize: Resolution.scale(13), color: '#505E75', fontFamily: 'OpenSans-Bold' }}>{Utils.convertNumber(serviceFee) + ' VND'}</Text>
                                {/* <Text style={{ textAlign: 'right', fontSize: Resolution.scale(13), color: '#505E75', fontFamily: 'OpenSans-Bold' }}>0.00 VND</Text> */}
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#E6EEFB', flexDirection: 'row', marginHorizontal: Resolution.scale(10), borderRadius: 5, marginBottom: Resolution.scale(20), justifyContent: 'space-between', alignItems: 'center', }}>
                            <Text style={{ padding: Resolution.scale(10), color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>
                                Total
                            </Text>
                            <Text style={{ flex: 1, fontSize: Resolution.scale(16), color: '#505E75', fontFamily: 'OpenSans-Bold', textAlign: "right" }}>
                                {Utils.convertNumber(total) + ' VND'}
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
                style={[styles.item, { flexDirection: 'row', marginHorizontal: Resolution.scale(20), flex: 1, borderRadius: 5 }]}>
                <View style={{ alignSelf: 'flex-start', flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: index === 0 ? 0 : Resolution.scale(20), flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <Text
                                numberOfLines={2} style={{ fontSize: Resolution.scale(14), fontFamily: 'OpenSans-Bold', width: width - Resolution.scaleWidth(160) }}>
                                {item.description}
                            </Text>
                        </View>
                        <View style={{ flex: 0.8 }}>
                            <Text
                                numberOfLines={2}
                                style={{
                                    fontSize: Resolution.scale(14),
                                    fontFamily: 'OpenSans-Bold',
                                    textAlign: 'right'
                                }}
                            >
                                {Utils.convertNumber(item.totalAmount) + ' VND'}
                            </Text>
                        </View>
                    </View>
                    <Text
                        numberOfLines={1}
                        style={{ color: '#BABFC8', fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold', }}>
                        {item.quantity + ' x ' + Utils.convertNumber(item.unitPrice)}
                    </Text>
                </View>
            </View>
        );
    }

    renderHeader() {
        let dateSelected = this.props.dateSelected;
        return <View>
            <Header
                LinearGradient={true}
                leftIcon={IC_CLOSE}
                leftAction={() => this.props.onClose()}
                headercolor={'transparent'}
                showTitleHeader={this.state.isShowTitleHeader}
                center={
                    <View>
                        <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{'Detail order'}</Text>
                    </View>
                }
            />
            <AnimatedTitle
                scrollY={this.state.scrollY}
                label={"Detail Order"}
            />
        </View>
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