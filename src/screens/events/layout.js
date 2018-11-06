import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Image, FlatList, StatusBar } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import HeaderTitle from '@components/headerTitle';

import Button from "@components/button";
import FastImage from "../../components/fastImage";
import { Calendar } from "../../components/calendars";

const { width, height } = Dimensions.get('window');

import IC_CALENDAR from "../../resources/icons/calendar.png";
import IC_CLOCK from "../../resources/icons/clock.png";
import IMG_CALENDAR_PH from "../../resources/icons/calendar-placehoder.png";
import Placeholder from 'rn-placeholder';

import Header from '@components/header'
import IC_BACK from "@resources/icons/back-light.png";



import Modal from "react-native-modal";
import Resolution from "../../utils/resolution";

import ModalDetail from "./components/modalDetail";
import ModalFull from "./components/modalFull";
import ModalSelectUnit from "../../components/modalSelectUnit";

export default class Layout extends Component {

    async _onPressDay(data) {
        await this.setState({ dateSelected: data });
        this._openModalFull();
    }

    renderHeader() {
        StatusBar.setBarStyle('light-content')
        return <View>
            <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={{ paddingBottom: 10 }}>
                <HeaderTitle title='Events' />

                <Calendar
                    style={styles.calendar}
                    firstDay={1}
                    markedDates={this.state.overViewDate || {}}
                    onDayPress={(data) => this._onPressDay(data.dateString)}
                    theme={{
                        todayTextColor: '#343D4D',
                        arrowColor: '#FFF',
                        selectedDayBackgroundColor: '#FFF',
                        monthTextColor: '#FFF',
                        textSectionTitleColor: '#FFF',
                        textDayHeaderFontSize: 15,
                        textDayFontFamily: 'OpenSans-Regular',
                        textDayFontSize: 14,

                    }}
                />
            </LinearGradient>
            <View style={{ marginTop: 20, marginBottom: 10, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 15, fontFamily: 'OpenSans-Bold', color: '#505E75' }}>
                    {'Tất cả sự kiện'}
                </Text>
            </View>
        </View>
    }

    handleScroll = (event) => {
        Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
                listener: event => {
                    if (event.nativeEvent.contentOffset.y > 70) {
                        if (!this.showCenter) {
                            this.showCenter = true
                            this.props.navigation.setParams({ eventTitle: 'Events' });
                        }
                    } else {
                        if (this.showCenter) {
                            this.showCenter = false
                            this.props.navigation.setParams({ eventTitle: null });
                        }
                    }
                }
            }
        )(event)
    }

    render() {
        StatusBar.setHidden(this.state.isShowModalFull);
        return (
            <View style={styles.container}>
                <Header
                    LinearGradient={true}
                    leftIcon={IC_BACK}
                    leftAction={() => this.props.navigation.goBack()}
                    headercolor={'transparent'}
                    center={
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 100 }}>
                            <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-SemiBold' }}>{this.props.navigation.getParam('eventTitle')}</Text>
                        </View>
                    }
                    text='T1-A03-02'
                    display={'text'}
                    rightAction={() => this._onpenModalSelectUnit()}
                />
                <FlatList
                    data={this.state.myEvent}
                    keyExtractor={(item) => item.eventId + ''}
                    renderItem={({ item, index }) => (
                        this.renderItem(item)
                    )}
                    onScroll={this.handleScroll}
                    legacyImplementation={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    ListHeaderComponent={() => this.renderHeader()}
                    ListFooterComponent={() => <View style={{ height: 20 }} />}
                />
                <Modal
                    style={{ flex: 1, marginTop: 50, marginLeft: 0, marginRight: 0, marginBottom: 0, zIndex: 100 }}
                    isVisible={this.state.isShowModalDetail}>
                    <ModalDetail
                        onClose={() => this._closeModalDetail()}
                        itemEventSelected={this.state.itemEventSelect}
                    />
                </Modal>
                <Modal
                    style={{ flex: 1, margin: 0 }}
                    isVisible={this.state.isShowModalFull}>
                    <ModalFull
                        onClose={() => this._closeModalFull()}
                        eventIndate={this.state.myEvent}
                        dateSelected={this.state.dateSelected}
                    />
                </Modal>
                <Modal
                    style={{ flex: 1, margin: 0 }}
                    isVisible={this.state.isModalSelectUnit}>
                    <ModalSelectUnit
                        onClose={() => this._onCloseModalSelectUnit()}
                    />
                </Modal>
            </View>
        );
    }

    renderItem(item) {
        let encToken = this.props.account.encToken;
        let startTime = this.converDateToTime(item.startTime);
        let image = `${item.fileUrl}&encToken=${encodeURIComponent(encToken)}`;
        return (
            <Button
                onPress={() => this._openModalDetail(item)}
                style={[styles.item, { flexDirection: 'row' }]}>

                <FastImage
                    style={{ width: 103, height: 103, borderRadius: 5, borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
                    source={image}
                    resizeMode={'cover'}
                />

                <View style={{ width: width - 143, flexDirection: 'column', }}>
                    <Text
                        numberOfLines={2} style={{ fontSize: 13, fontWeight: '600', marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                        {item.subject}
                    </Text>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={IC_CLOCK} />
                            <Text style={{ marginLeft: 10, fontSize: 12, color: '#C9CDD4', fontFamily: 'OpenSans-Regular' }}>
                                {startTime}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                            <Image source={IC_CALENDAR} style={{}} />
                            <Text style={{ marginLeft: 10, fontSize: 12, color: '#C9CDD4', fontFamily: 'OpenSans-Regular' }}>
                                {'(' + this.converDate(item.startTime) + ' - ' + this.converDate(item.endTime) + ')'}
                            </Text>
                        </View>
                    </View>
                </View>
            </Button >
        );
    }

    converDateToTime(data) {
        let d = new Date(data)
        let minutes = d.getMinutes() < 10 ? d.getMinutes() + "0" : d.getMinutes();
        let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
        return `${hours + ':' + minutes}`
    }

    converDate(data) {
        let d = new Date(data)
        let date = d.getDate();
        let month = d.getMonth();
        return `${date + '/' + month}`
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F8FD',
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        width: width - 40,
        marginHorizontal: 20
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});
