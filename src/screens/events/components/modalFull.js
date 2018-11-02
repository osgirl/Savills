import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, FlatList } from 'react-native';

import Connect from '@stores';
import LinearGradient from 'react-native-linear-gradient';
import Resolution from "../../../utils/resolution";
import Button from "../../../components/button";
import IC_CLOSE from "@resources/icons/close.png";
import IC_CALENDAR from "@resources/icons/calendar.png";
import IC_CLOCK from "@resources/icons/clock.png";
import ModalDetail from "./modalDetail";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get('window');

class modalFull extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
            itemSelected: null,
            eventOfDate: []
        }
    }

    componentWillMount() {
        let dateSelected = this.props.dateSelected;
        const accessTokenApi = this.props.account.accessTokenAPI;
        const buildingID = this.props.units.unitActive.buildingId;
        this.props.actions.events.getMyEventsOfDate(accessTokenApi, buildingID, dateSelected);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.events.eventsOfDate !== nextProps.events.eventsOfDate && nextProps.events.eventsOfDate.success) {
            this.setState({ eventOfDate: nextProps.events.eventsOfDate.result.items })
        }
    }



    render() {
        return (
            <View style={[styles.container, {}]}>
                <FlatList
                    alwaysBounceVertical={false}
                    data={this.state.eventOfDate.length > 0 ? this.state.eventOfDate : []}
                    keyExtractor={(item) => item.eventId + ''}
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
                    style={{ flex: 1, marginTop: 50, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    isVisible={this.state.isShowModal}>
                    <ModalDetail
                        onClose={() => this.setState({ isShowModal: false })}
                        itemEventSelected={this.state.itemSelected}
                        dateSelected={this.state.dateSelected}
                    />
                </Modal>
            </View>
        );
    }



    renderItem(item) {
        let startTime = this.converDateToTime(item.startTime)
        let encToken = this.props.account.encToken;
        let image = `${item.fileUrl}&encToken=${encodeURIComponent(encToken)}`;
        return (
            <Button
                onPress={() => this._openModal(item)}
                style={[styles.item, { flexDirection: 'row', marginHorizontal: 20, width: width - 40, backgroundColor: '#FFF', borderRadius: 5 }]}>
                <Image
                    source={{ uri: image }}
                    style={{ width: 103, height: 103, borderRadius: 5, }} />
                <View style={{ width: width - 143, flexDirection: 'column' }}>
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

    formatDateHeader(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('/');
    }

    renderHeader() {
        let dateSelected = this.props.dateSelected
        return <LinearGradient
            colors={['#4A89E8', '#8FBCFF']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={{ width: width, height: Resolution.scaleHeight(123), marginBottom: 20 }}>
            <Button
                onPress={() => this.props.onClose()}
                style={{ margin: 20 }}
            >
                <Image source={IC_CLOSE} />
            </Button>
            <Text style={{ color: '#FFFFFF', fontSize: 35, fontFamily: 'OpenSans-Bold', marginHorizontal: 20 }}>{this.formatDateHeader(dateSelected)}</Text>
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    }
});


export default Connect(modalFull);