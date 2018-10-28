import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList
} from 'react-native';

import ItemHome from "@components/itemHome";

import Style from "./style";

const imgSize = 64;

let DATA = [
    { id: 1, key: 'events', title: 'Events' },
    { id: 2, key: 'booking', title: 'Booking' },
    { id: 3, key: 'workorder', title: 'Work Order' },
    { id: 4, key: 'invoice', title: 'Invoice' },
    { id: 5, key: 'inbox', title: 'Inbox' },
    { id: 6, key: 'feedback', title: 'Feed back' },
    { id: 7, key: 'e-libary', title: 'E-labary' },
    { id: 8, key: 'deliveries', title: 'Deliverries' },
    { id: 9, key: 'frontdesk', title: 'Frontdesk' }
]

export default class extends Component {

    render() {
        return (
            <View style={Style.container}>
                <View style={{}}>
                    <FlatList
                        data={DATA}
                        contentContainerStyle={{ paddingVertical: 5 }}
                        keyExtractor={(item) => item.id + ''}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            return <ItemHome
                                item={item}
                            />
                        }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                        ListHeaderComponent={() =>
                            <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 40 }}>
                                <Image source={{ uri: 'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/26168307_1832573663480180_5899833810848274293_n.jpg?_nc_cat=109&_nc_ht=scontent.fsgn5-6.fna&oh=fa469d9c20f13899bd5f8757b5b675e1&oe=5C84EE81' }}
                                    style={{ width: imgSize, height: imgSize, borderRadius: imgSize / 2 }}
                                />
                                <Text style={{ fontSize: 25, color: '#505E75', textAlign: 'center', marginTop: 20, marginBottom: 6 }}>{'Hey!! Toan Tam'}</Text>
                                <Text style={{ fontSize: 18, color: '#BABFC8', textAlign: 'center' }}>{'T1-A03-01'}</Text>
                            </View>
                        }
                        ListFooterComponent={() => <View style={{ width: 20 }} />}
                    />
                </View>
            </View>
        );
    }
}