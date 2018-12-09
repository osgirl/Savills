import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, FlatList, ActivityIndicator } from 'react-native';

import Connect from '@stores';
import LinearGradient from 'react-native-linear-gradient';
import Resolution from "../../../utils/resolution";
import Button from "../../../components/button";
import IC_CLOSE from "@resources/icons/close-black.png";
import IC_CALENDAR from "@resources/icons/calendar.png";
import IC_CLOCK from "@resources/icons/clock.png";
import IC_LOCATION from "@resources/icons/location.png";
import Configs from '../../../utils/configs';


const { width, height } = Dimensions.get('window');

class modalDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentWillMount() {
        setTimeout(() => {
            const accessTokenApi = this.props.account.accessTokenAPI;
            let { id } = this.props;
            this.props.actions.events.getDetail(accessTokenApi, id);
        }, 300)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.events.eventDetail &&
            this.props.events.eventDetail.result !== nextProps.events.eventDetail.result &&
            nextProps.events.eventDetail.success) {
            this.setState({ data: nextProps.events.eventDetail.result })
        }
    }

    renderLoding() {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={Configs.colorMain} />
        </View>
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

    render() {
        const { data } = this.state;
        let encToken = this.props.account.encToken;
        let image = data && `${data.fileUrl}&encToken=${encodeURIComponent(encToken)}`;
        return (
            <View style={[styles.container, {}]}>
                <Button
                    style={{ padding: 20 }}
                    onPress={() => this.props.onClose()}
                >
                    <Image source={IC_CLOSE} />
                </Button>
                {
                    data ?
                        <View>
                            <Image source={{ uri: image }}
                                style={{ height: Resolution.scaleHeight(222), width: width }}
                                resizeMode={'center'}
                            />
                            <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                                <Text numberOfLines={2} style={{ fontSize: 16, fontFamily: 'OpenSans-Bold', color: '#505E75' }}>
                                    {data && data.subject}
                                </Text>
                                <Text numberOfLines={2} style={{ fontSize: 12, fontFamily: 'OpenSans-Regular', color: '#505E75', marginBottom: 20, marginTop: 10 }}>
                                    asd das dasdas  asdasd asd d asd asd dsa sa dads asd das dasdas  asdasd asd d asd asd dsa sa dads asd das dasdas  asdasd asd d asd asd dsa sa dads asd das dasdas  asdasd asd d asd asd dsa sa dadsasd das dasdas  asdasd asd d asd asd dsa sa dads
                                </Text>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={IC_CLOCK} />
                                            <Text style={{ marginLeft: 10, fontSize: 12, color: '#C9CDD4', fontFamily: 'OpenSans-Regular' }}>
                                                {this.converDateToTime(data && data.startTime) + ' - ' +
                                                    this.converDateToTime(data && data.endTime)}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                            <Image source={IC_CALENDAR} style={{}} />
                                            <Text style={{ marginLeft: 10, fontSize: 12, color: '#C9CDD4', fontFamily: 'OpenSans-Regular' }}>
                                                {'(' + this.converDate(data && data.startTime) + ' - ' + this.converDate(data && data.endTime) + ')'}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={IC_LOCATION} />
                                            <Text style={{ marginLeft: 10, fontSize: 12, color: '#C9CDD4', fontFamily: 'OpenSans-Regular' }}>
                                                {data && data.location}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View> : this.renderLoding()
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F6F8FD',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    }
});

export default Connect(modalDetail);