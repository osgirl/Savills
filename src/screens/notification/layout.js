import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    Text
} from 'react-native';
import Header from '@components/header';
import LinearGradient from 'react-native-linear-gradient';
import HeaderTitle from '@components/headerTitle';

import IC_BACK from "../../resources/icons/close.png";
import IC_CALENDAR from "../../resources/icons/calendar.png";
import IC_CLOCK from "../../resources/icons/clock.png";
import { } from "../";

import Configs from "../../utils/configs";
import Button from "../../components/button";

import IC_DEFAULT from "@resources/icons/default.png";

const { width } = Dimensions.get('window');

export default class extends Component {

    renderItem() {
        return <View style={[Styles.item, { ...Configs.Shadow }]}>
            <Button
                onPress={() => { }}
                style={{ alignItems: 'flex-start' }}>
                <View style={{ marginHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 10, justifyContent: 'space-between' }}>
                        <View style={{ backgroundColor: '#505E75', borderRadius: 5, }}>
                            <Text style={{ color: '#F8F8F8', paddingVertical: 2, paddingHorizontal: 20 }}>#696</Text>
                        </View>
                        <View style={{ backgroundColor: '#FF361A', width: 8, height: 8, borderRadius: 33 }} />
                    </View>
                    <View>
                        <Text style={{ color: '#343D4D', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>
                            Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang phục vụ cho in ấn. Lorem Ipsum đã... được sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những năm 150
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={IC_CLOCK} />
                            <Text style={{ marginLeft: 10, fontSize: 12, color: '#C9CDD4', fontFamily: 'OpenSans-Regular' }}>
                                {'10-10'}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                            <Image source={IC_CALENDAR} style={{}} />
                            <Text style={{ marginLeft: 10, fontSize: 12, color: '#C9CDD4', fontFamily: 'OpenSans-Regular' }}>
                                {/* {'(' + this.converDate(item.startTime) + ' - ' + this.converDate(item.endTime) + ')'} */}
                                {'(30/9 - 12/9)'}
                            </Text>
                        </View>
                    </View>
                </View>
            </Button>
        </View>
    }

    HeaderFlatlist() {
        return (
            <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={{ width: width, marginBottom: 20 }}>
                <HeaderTitle title='Notification' />
            </LinearGradient>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
                <Header
                    LinearGradient={true}
                    leftIcon={IC_BACK}
                    leftAction={() => this.props.onclose()}
                    headercolor={'transparent'}
                />
                <FlatList
                    data={[{}, {}, {}, {}]}
                    horizontal={false}
                    contentContainerStyle={{ alignItems: 'center', }}
                    keyExtractor={(item) => item.id + ''}
                    renderItem={({ item, index }) => (
                        this.renderItem(item)
                    )}
                    // onScroll={this.handleScroll}
                    legacyImplementation={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                    ListHeaderComponent={() => this.HeaderFlatlist()}
                    ListFooterComponent={() => <View style={{ height: 20 }} />}
                />
            </View>
        );
    }

}


const Styles = StyleSheet.create({
    item: {
        width: width - 40,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginVertical: 5
    }
})