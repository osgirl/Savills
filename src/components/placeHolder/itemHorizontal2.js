import React from "react";
import { View, Image, Dimensions } from "react-native";
import Placeholder from "rn-placeholder";

import FastImage from "../../components/fastImage";
import IC_DF from "../../resources/icons/savills.png";

const { width } = Dimensions.get('window')

const ItemHorizontal2 = props => {
    const style = { backgroundColor: props.bgColor };
    return (
        <View key={props.key} style={[style, { padding: 5, borderRadius: 5, alignItems: 'center', flexDirection: 'row', width: width - 40, marginHorizontal: 20, marginVertical: 10 }]}>
            <View style={{ backgroundColor: '#DEDEDE', padding: 15, alignSelf: 'flex-end', alignItems: 'flex-end' }}>
                <FastImage source={IC_DF} style={{ width: 80, height: 80 }} resizeMode={'contain'} />
            </View>
            <View style={{ marginLeft: 10, justifyContent: 'space-between', flexDirection: 'column', height: 80 }}>
                <View style={{ width: 30, height: 10, backgroundColor: '#DEDEDE', borderRadius: 5 }} />
                <View style={{ width: width - 300, height: 10, backgroundColor: '#DEDEDE', borderRadius: 5 }} />
                <View style={{ width: width - 180, height: 10, backgroundColor: '#DEDEDE', borderRadius: 5 }} />
                <View style={{ width: width - 250, height: 10, backgroundColor: '#DEDEDE', borderRadius: 5 }} />
            </View>
        </View>
    );
};

export default Placeholder.connect(ItemHorizontal2);