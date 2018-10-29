import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    FlatList
} from 'react-native';

import IMG_BG from "../../resources/image/ChooseProject.png";
import ItemProjectApartment from "../../components/itemProjectApartment";

import IC_PROJECT from "@resources/icons/Project.png";

import Style from "./style";

let DATA = [
    { id: 1, title: 'TheSun Avinue' },
    { id: 2, title: 'TheSun Avinue' },
    { id: 3, title: 'TheSun Avinue' },
    { id: 4, title: 'TheSun Avinue' }
]

export default class extends Component {

    render() {
        return (
            <ImageBackground
                source={IMG_BG}
                resizeMode={'contain'}
                style={Style.container}
            >
                <Text style={{ color: '#505E75', fontSize: 15, marginTop: 123, fontFamily: 'OpenSans-Bold' }}>
                    Choose Your Project
                </Text>
                <View style={Style.viewBottom}>
                    <FlatList
                        data={this.props.account.tenantLocal && this.props.account.tenantLocal}
                        horizontal
                        contentContainerStyle={{ paddingVertical: 5 }}
                        keyExtractor={(item) => item.tenantId + ''}
                        renderItem={({ item, index }) => {
                            return <ItemProjectApartment
                                onPressItem={() => this._gotoChooseApartment(item)}
                                title={item.tenancyName}
                                image={IC_PROJECT}
                            />
                        }}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                        ListHeaderComponent={() => <View style={{ width: 20 }} />}
                        ListFooterComponent={() => <View style={{ width: 20 }} />}
                    />
                </View>
            </ImageBackground>
        );
    }
}