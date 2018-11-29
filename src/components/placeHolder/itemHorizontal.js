import React from "react";
import { View, Image, Dimensions } from "react-native";
import Placeholder from "rn-placeholder";

import FastImage from "../../components/fastImage";
import IC_DF from "../../resources/icons/savills.png";

const { width } = Dimensions.get('window');
import Resolution from "../../utils/resolution";


const ItemHorizontal = props => {
    const style = { backgroundColor: props.bgColor };
    return (
        <View key={props.key} style={[style, { padding: 5, borderRadius: 5, alignItems: 'center', flexDirection: 'row', width: width - 40, marginHorizontal: 20 }]}>
            <View style={{ backgroundColor: '#DEDEDE', padding: 15, alignSelf: 'flex-end', alignItems: 'flex-end' }}>
                <FastImage source={IC_DF} style={{ width: 70, height: 70 }} resizeMode={'contain'}  />
            </View>
            <View style={{ marginLeft: 10 }}>
                <View style={{ width: Resolution.scaleWidth(140), height: Resolution.scaleHeight(10), backgroundColor: '#DEDEDE', borderRadius: 5 }} />
                <View style={{ width: Resolution.scaleWidth(190), height: Resolution.scaleHeight(10), backgroundColor: '#DEDEDE', borderRadius: 5, marginVertical: 15 }} />
                <View style={{ width: Resolution.scaleWidth(120), height: Resolution.scaleHeight(10), backgroundColor: '#DEDEDE', borderRadius: 5 }} />
            </View>
        </View>
    );
};

export default Placeholder.connect(ItemHorizontal);