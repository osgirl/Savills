import React from "react";
import { View, Image } from "react-native";
import Placeholder from "rn-placeholder";

import FastImage from "../../components/fastImage";
import IC_DF from "../../resources/icons/savills.png";


const itemHorizontal = props => {
    const style = { backgroundColor: props.bgColor };
    return (
        <View key={props.key} style={[style, { padding: 5, borderRadius: 5, alignItems: 'center', flexDirection: 'row', marginHorizontal: 20 }]}>
            <View style={{backgroundColor: '#DEDEDE', padding: 15, alignSelf : 'flex-end',alignItems: 'flex-end' }}>
                <FastImage source={IC_DF} style={{ width: 70, height: 70 }} resizeMode={'contain'} />
            </View>
            <View style={{ marginLeft: 10 }}>
                <View style={{ width: 140, height: 10, backgroundColor: '#DEDEDE', borderRadius: 5 }} />
                <View style={{ width: 190, height: 10, backgroundColor: '#DEDEDE', borderRadius: 5, marginVertical: 15 }} />
                <View style={{ width: 120, height: 10, backgroundColor: '#DEDEDE', borderRadius: 5 }} />
            </View>
        </View>
    );
};

export default Placeholder.connect(itemHorizontal);