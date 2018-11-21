import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Image, FlatList } from 'react-native';

import Connect from '@stores';
import LinearGradient from 'react-native-linear-gradient';
import Resolution from "@utils/resolution";
import Button from "@components/button";
import IC_CLOSE from "@resources/icons/close.png";
import IC_CALENDAR from "@resources/icons/calendar.png";
import IC_CLOCK from "@resources/icons/clock.png";
import moment from 'moment';
import Modal from "react-native-modal";
import HeaderTitle from '@components/headerTitle';
import { isIphoneX } from '@utils/func';
import Utils from "@utils";

import Header from '@components/header';

const { width, height } = Dimensions.get('window');

class modalConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            isShowTitleHeader: false,
            isShowModal: false,
            isShowModalDetail: false,
            data: this.props.fee.history.result.items || [],
            itemSelected: null
        }
    }


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

    _openModalDetail(item) {
        let accessTokenApi = this.props.account.accessTokenAPI;
        this.props.actions.fee.getDetailHistory(accessTokenApi, item.id);
        this.setState({ itemSelected: item })
        setTimeout(() => {
            this.setState({ isShowModalDetail: true });
        }, 200)


    }

    render() {

        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, 40, 60],
            outputRange: [60, 40, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        });

        return (
            <View style={[styles.container, {}]}>
                {this.renderHeader()}
                <LinearGradient
                    colors={['#4A89E8', '#8FBCFF']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <Animated.View style={{ height: headerHeight }}>
                        <HeaderTitle title={'History'} />
                    </Animated.View>
                </LinearGradient>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    renderItem={({ item, index }) => this.renderItem(item)}
                    keyExtractor={(item, index) => item.id.toString()}
                    onScroll={this.handleScroll}
                    onEndReachedThreshold={0.01}
                    scrollEventThrottle={16}
                    ListFooterComponent={() => <View style={{ height: 20 }} />}
                />

                {this.renderModalDetail()}

            </View>
        );
    }


    renderItem(item, index) {
        let date = moment(item.creationTime).format('l');
        return (
            <View style={{ width: width - 40, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 14, color: '#505E75', fontFamily: 'OpenSans-Bold', marginVertical: 10 }}>{date}</Text>
                <Button
                    onPress={() => this._openModalDetail(item)}
                    style={[styles.item, { flexDirection: 'row', borderRadius: 5, }]}>
                    <View style={{ width: width - 40, flexDirection: 'column', backgroundColor: '#FFFFFF', borderRadius: 5, padding: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text
                                numberOfLines={2} style={{ fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#BABFC8' }}>
                                {'Invoice #'}
                            </Text>
                            <Text
                                numberOfLines={2} style={{ fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#343D4D' }}>
                                {item.id}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text
                                numberOfLines={2} style={{ fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#DEDEDE' }}>
                                {item.fullUnitCode}
                            </Text>
                            <Text
                                numberOfLines={2} style={{ fontSize: 14, fontFamily: 'OpenSans-Bold', color: '#BABFC8' }}>
                                {Utils.convertNumber(item.paidAmount) + ' VND'}
                            </Text>
                        </View>
                    </View>
                </Button >
            </View>
        );
    }

    renderModalDetail() {
        const { detailHistory } = this.props.fee;
        return <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isShowModalDetail}>
            <View style={{ backgroundColor: '#F6F8FD', flex: 1, borderRadius: 5 }}>
                <LinearGradient
                    colors={['#4A89E8', '#8FBCFF']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <Button
                        onPress={() => this.setState({ isShowModalDetail: false })}
                        style={{ paddingTop: 40, paddingHorizontal: 20 }}>
                        <Image source={IC_CLOSE} style={{ marginBottom: 20 }} />
                        <HeaderTitle title={'Detail'} marginHorizontal={0} marginVertical={20} />
                    </Button>
                </LinearGradient>

                <View style={{ padding: 20 }}>
                    <View style={{ backgroundColor: '#FFF', borderRadius: 5 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20 }}>
                            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 13, color: '#BABFC8' }}>Receipt No:</Text>
                            <Text style={{ marginLeft: 40, fontFamily: 'OpenSans-Bold', fontSize: 14, textAlign: 'right', color: '#505E75' }}>{detailHistory && detailHistory.receiptNumber}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 13, color: '#BABFC8' }}>Receipt:</Text>
                            <View>
                                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 14, textAlign: 'right', color: '#505E75' }}>{detailHistory.feePayer && detailHistory.feePayer.email}</Text>
                                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 14, marginTop: 20, textAlign: 'right', color: '#505E75' }}>{detailHistory.feePayer && detailHistory.feePayer.phoneNumber}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20 }}>
                            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 13, color: '#BABFC8' }}>Method:</Text>
                            <Text style={{ marginLeft: 40, fontFamily: 'OpenSans-Bold', fontSize: 14, textAlign: 'right', color: '#505E75' }}>{detailHistory.paymentChanel && detailHistory.paymentChanel.name}</Text>
                        </View>

                        <View style={{ width: width - 80, height: 1, backgroundColor: '#DEDEDE', opacity: 0.5, marginHorizontal: 20 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                            <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 13, color: '#BABFC8' }}>In Total:</Text>
                            <Text style={{ marginLeft: 40, fontFamily: 'OpenSans-Bold', fontSize: 20, textAlign: 'right', color: '#505E75' }}>{detailHistory.incommingDetails && Utils.convertNumber(detailHistory.paidAmount) + ' VND'}</Text>
                        </View>
                    </View>
                </View>

                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 15, color: '#BABFC8', marginHorizontal: 20, marginBottom: 20 }}>Details</Text>

                <View style={{ paddingHorizontal: 20 }}>
                    {
                        detailHistory.incommingDetails && detailHistory.incommingDetails.map(data => {
                            return <View key={data.incomingId + '__'}
                                style={{ padding: 20, backgroundColor: '#FFFFFF', borderRadius: 5, marginBottom: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: width - 165 }}>
                                            <Text numberOfLines={1} style={{ fontSize: 12, color: '#343D4D', fontFamily: 'OpenSans-SemiBold' }}>{data.feeDetail.description}</Text>
                                            <Text numberOfLines={1} style={{ fontSize: 13, color: '#DEDEDE', fontFamily: 'OpenSans-SemiBold' }}>{data.feeDetail.fullUnitCode}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ color: '#BABFC8', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>{'$' + data.feeDetail.totalAmount}</Text>
                                    </View>
                                </View>
                            </View>
                        })
                    }
                </View>

            </View>
        </Modal>
    }

    renderHeader() {
        return <Header
            LinearGradient={true}
            leftIcon={IC_CLOSE}
            leftAction={() => this.props.onClose()}
            headercolor={'transparent'}
            showTitleHeader={this.state.isShowTitleHeader}
            center={
                <View>
                    <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{'History'}</Text>
                </View>
            }
        />
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F8FD',
    },

});


export default Connect(modalConfirm);