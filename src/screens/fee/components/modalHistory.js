import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Image, FlatList, Platform, ScrollView } from 'react-native';

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

import IC_EVENTEMTY from '@resources/icons/Events_emty.png';

import Header from '@components/header';

import { ItemPlaceHolderH } from "@components/placeHolderItem";

const { width, height } = Dimensions.get('window');
import AnimatedTitle from "@components/animatedTitle";

const HEADER_MAX_HEIGHT = 50;

class modalConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            scrollYDetail: new Animated.Value(
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            isShowTitleHeader: false,
            isShowModal: false,
            isShowModalDetail: false,
            data: [],
            itemSelected: null
        }
    }

    componentDidMount() {
        let unitActive = this.props.units.unitActive;
        let accessTokenApi = this.props.account.accessTokenAPI;
        setTimeout(() => {
            this.props.actions.fee.getListHistory(accessTokenApi, unitActive.fullUnitCode);
        }, 300)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.fee.history !== nextProps.fee.history && nextProps.fee.history.success) {
            this.setState({ data: nextProps.fee.history.result.items })
        }
    }


    handleScroll = event => {
        Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
        }, { useNativeDriver: true })(event);
    };
    handleScrollDetail = event => {
        Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollYDetail } } }], {
        }, { useNativeDriver: true })(event);
    };

    _openModalDetail(item) {
        let accessTokenApi = this.props.account.accessTokenAPI;
        this.props.actions.fee.getDetailHistory(accessTokenApi, item.id);
        this.setState({ itemSelected: item })
        setTimeout(() => {
            this.setState({ isShowModalDetail: true });
        }, 200);
    }


    renderEmty() {
        return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: Resolution.scale(60) }}>
            <Image source={IC_EVENTEMTY} />
            <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#343D4D' }}>{'Không lịch sử đơn hàng nào'}</Text>
        </View>
    }



    render() {
        return (
            <View style={[styles.container, {}]}>
                {this.renderHeader()}
                {
                    this.props.fee.history.result && this.props.fee.history.result.totalCount === 0 ?
                        this.renderEmty() :
                        this.state.data.length > 0 ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.data}
                                renderItem={({ item, index }) => this.renderItem(item)}
                                keyExtractor={(item, index) => item.id.toString()}
                                onScroll={this.handleScroll}
                                onEndReachedThreshold={0.01}
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
                                ListFooterComponent={() => <View style={{ height: 20 }} />}
                            /> : <ItemPlaceHolderH />
                }
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
                    style={{ flexDirection: 'row', borderRadius: 5, }}>
                    <View style={{ flexDirection: 'column', backgroundColor: '#FFFFFF', borderRadius: 5, padding: 20, flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Text
                                numberOfLines={2} style={{ fontSize: 13, flex: 0.4, fontFamily: 'OpenSans-SemiBold', color: '#BABFC8' }}>
                                {'Invoice #'}
                            </Text>
                            <Text
                                numberOfLines={2} style={{ flex: 1, fontSize: 14, fontFamily: 'OpenSans-SemiBold', color: '#343D4D', textAlign: 'right' }}>
                                {item.receiptNumber}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, flex: 1 }}>
                            <Text
                                numberOfLines={2} style={{ fontSize: 13, fontFamily: 'OpenSans-SemiBold', color: '#DEDEDE', flex: 0.4 }}>
                                {item.fullUnitCode}
                            </Text>
                            <Text
                                numberOfLines={2} style={{ fontSize: 14, fontFamily: 'OpenSans-Bold', color: '#BABFC8', flex: 1, textAlign: 'right' }}>
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
                {this.renderHeaderDetail()}
                <ScrollView
                    alwaysBounceVertical={false}
                    scrollEventThrottle={16}
                    onScroll={this.handleScrollDetail}
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


                    <View style={{ padding: 20, flex: 1 }}>
                        <View style={{ backgroundColor: '#FFF', borderRadius: 5, padding: Resolution.scale(20) }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                <Text style={{ flex: 0.4, fontFamily: 'OpenSans-SemiBold', fontSize: 13, color: '#BABFC8', }}>Receipt No:</Text>
                                <Text style={{ flex: 1, fontFamily: 'OpenSans-Bold', fontSize: 14, textAlign: 'right', color: '#505E75' }}>{detailHistory && detailHistory.receiptNumber}</Text>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: Resolution.scale(20) }}>
                                <Text style={{ flex: 0.4, fontFamily: 'OpenSans-SemiBold', fontSize: 13, color: '#BABFC8' }}>Receipt:</Text>
                                <View style={{ flex: 1, }}>
                                    <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 14, textAlign: 'right', color: '#505E75' }}>{detailHistory.feePayer && detailHistory.feePayer.email}</Text>
                                    <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 14, textAlign: 'right', color: '#505E75' }}>{detailHistory.feePayer && detailHistory.feePayer.phoneNumber}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={{ flex: 0.4, fontFamily: 'OpenSans-SemiBold', fontSize: 13, color: '#BABFC8' }}>Method:</Text>
                                <Text style={{ flex: 1, fontFamily: 'OpenSans-Bold', fontSize: 14, textAlign: 'right', color: '#505E75' }}>{detailHistory.paymentChanel && detailHistory.paymentChanel.name}</Text>
                            </View>

                            <View style={{ width: width - 80, height: 1, backgroundColor: '#DEDEDE', opacity: 0.5, marginHorizontal: Resolution.scale(20), marginVertical: Resolution.scale(20) }} />

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ flex: 0.4, fontFamily: 'OpenSans-SemiBold', fontSize: 13, color: '#BABFC8' }}>In Total:</Text>
                                <Text style={{ flex: 1, fontFamily: 'OpenSans-Bold', fontSize: 20, textAlign: 'right', color: '#505E75' }}>{detailHistory.incommingDetails && Utils.convertNumber(detailHistory.paidAmount) + ' VND'}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 15, color: '#BABFC8', marginHorizontal: 20, marginBottom: 20 }}>Details</Text>

                    <View style={{ paddingHorizontal: 20 }}>
                        {
                            detailHistory.incommingDetails && detailHistory.incommingDetails.map(data => {
                                console.log(data)
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
                                            <Text style={{ color: '#BABFC8', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>{'VND ' + Utils.convertNumber(data.paidAmount)}</Text>
                                        </View>
                                    </View>
                                </View>
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        </Modal>
    }

    renderHeader() {
        const opacityTextHeader = this.state.scrollY.interpolate({
            inputRange: [0, 10],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        return <View>
            <Header
                LinearGradient={true}
                leftIcon={IC_CLOSE}
                leftAction={() => this.props.onClose()}
                headercolor={'transparent'}
                showTitleHeader={true}
                center={
                    <Animated.View style={{ opacity: opacityTextHeader }}>
                        <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{'History'}</Text>
                    </Animated.View>
                }
            />

            <AnimatedTitle
                scrollY={this.state.scrollY}
                label={'History'}
            />
        </View>
    }

    renderHeaderDetail() {
        const opacityTextHeader = this.state.scrollYDetail.interpolate({
            inputRange: [0, 10],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        return <View>
            <Header
                LinearGradient={true}
                leftIcon={IC_CLOSE}
                leftAction={() => this.setState({ isShowModalDetail: false })}
                headercolor={'transparent'}
                showTitleHeader={true}
                center={
                    <Animated.View style={{ opacity: opacityTextHeader }}>
                        <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{'Detail'}</Text>
                    </Animated.View>
                }
            />

            <AnimatedTitle
                scrollY={this.state.scrollYDetail}
                label={'Detail'}
            />
        </View>
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F8FD',
    },

});


export default Connect(modalConfirm);