import React from "react";
import { View, Image } from "react-native";
import Placeholder from "rn-placeholder";

import IC_DF from "../../resources/icons/Apartment.png";

const itemHorizontal = props => {
    const style = { backgroundColor: props.bgColor };
    return (
        <View key={props.key} style={[style, { padding: 5, borderRadius: 5, alignItems: 'center', flexDirection: 'row', marginHorizontal: 20 }]}>
            <Image source={IC_DF} style={{ width: 90, height: 90 }} />
            <View style={{ marginLeft: 10 }}>
                <View style={{ width: 140, height: 10, backgroundColor: '#d9d9d9', borderRadius: 5 }} />
                <View style={{ width: 190, height: 10, backgroundColor: '#d9d9d9', borderRadius: 5, marginVertical: 15 }} />
                <View style={{ width: 120, height: 10, backgroundColor: '#d9d9d9', borderRadius: 5 }} />
            </View>
        </View>
    );
};

export default Placeholder.connect(itemHorizontal);