import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    FlatList
} from 'react-native';

import IMG_BG from "@resources/image/ChooseApartment.png";
import ItemProjectApartment from "../../components/itemProjectApartment";

import IC_APARTMENT from "@resources/icons/Apartment.png";

import Style from "./style";

let DATA = [
    { id: 1, title: 'T1-A03-01' },
    { id: 1, title: 'T1-A03-01' },
    { id: 1, title: 'T1-A03-01' },
    { id: 1, title: 'T1-A03-01' },
    { id: 1, title: 'T1-A03-01' },
    { id: 1, title: 'T1-A03-01' },
    { id: 1, title: 'T1-A03-01' }
]

export default class extends Component {

    render() {
        return (
            <ImageBackground
                source={IMG_BG}
                resizeMode={'contain'}
                style={Style.container}
            >
                <Text style={{ color: '#505E75', fontSize: 15, marginTop: 123 }}>
                    Choose Your apartment
                </Text>
                <View style={Style.viewBottom}>
                    <FlatList
                        data={DATA}
                        horizontal
                        contentContainerStyle={{ paddingVertical: 5 }}
                        keyExtractor={(item) => item.id + ''}
                        renderItem={({ item, index }) => {
                            return <ItemProjectApartment
                                item={item}
                                image={IC_APARTMENT}
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