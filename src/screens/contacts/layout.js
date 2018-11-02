import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
    Image,
    FlatList,
    Dimensions
} from 'react-native';

import Button from "@components/button";
import InputText from "@components/inputText";
import LinearGradient from 'react-native-linear-gradient';
import Loading from "@components/loading";
import HeaderTitle from '@components/headerTitle';
import call from 'react-native-phone-call'
import IC_CALL from "@resources/icons/Call-button.png";

const { width, height } = Dimensions.get('window');

import Style from "./style";
import resolution from '../../utils/resolution';

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this._getEmployeesByOu();
    }

    _getEmployeesByOu() {
        let accessTokenAPI = this.props.account.accessTokenAPI;
        this.props.actions.units.getEmployeesByOu(accessTokenAPI);
    }

    _call(number) {
        const args = {
            number: number,
            prompt: false,
        };
        call(args).catch(console.error);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.units.employeesByOu !== nextProps.units.employeesByOu && nextProps.units.employeesByOu.success) {
            this.setState({ data: nextProps.units.employeesByOu.result.items })
        }
    }

    renderHeader() {
        return (
            <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={{ marginBottom: 20 }}>
                <HeaderTitle title='Contacts' />
            </LinearGradient>
        )
    }

    renderItem(item) {
        // let startTime = this.converDateToTime(item.startTime)
        console.log(item)
        let encToken = this.props.account.encToken;
        let image = `${item.user.fileUrl}&encToken=${encodeURIComponent(encToken)}`;
        return (
            <Button
                activeOpacity={1}
                onPress={() => { }}
                style={[{ marginHorizontal: 20, width: width - 40, backgroundColor: '#FFF', borderRadius: 5 }]}>
                <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Image
                        source={{ uri: image }}
                        style={{ width: 50, height: 50, borderRadius: 50 / 2, }} />
                    <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                        <Text
                            numberOfLines={2} style={{ color: '#505E75', fontSize: 14, fontFamily: 'OpenSans-Bold', width: resolution.scaleWidth(175) }}>
                            {`${item.user.fullName} - ${item.user.customFields.JobTitle}`}
                        </Text>
                        <View style={{ flexDirection: 'column', }}>
                            <Text
                                numberOfLines={1} style={{ color: '#BABFC8', fontSize: 10, fontFamily: 'OpenSans-Bold' }}>
                                {item.user.emailAddress}
                            </Text>
                            <Text
                                numberOfLines={1} style={{ color: '#BABFC8', fontSize: 10, fontFamily: 'OpenSans-Bold' }}>
                                {item.user.phoneNumber}
                            </Text>
                        </View>
                    </View>
                    <Button onPress={() => this._call(item.user.phoneNumber)}>
                        <Image source={IC_CALL} />
                    </Button>
                </View>
            </Button >
        );
    }

    render() {
        return (
            <View style={Style.container}>
                <FlatList
                    alwaysBounceVertical={false}
                    data={this.state.data || []}
                    keyExtractor={(item) => item.user.id + ''}
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
            </View>
        );
    }
}