import React from "react";
import { View, Image } from "react-native";
import Placeholder from "rn-placeholder";

import FastImage from "../../components/fastImage";
import IC_DF from "@resources/icons/Apartment.png";

const itemHome = props => {
    const style = { backgroundColor: props.bgColor };
    return (
        <View style={[style, { padding: 5, borderRadius: 5, alignItems: 'center' }]}>
            <FastImage source={IC_DF} style={{ width: 30, height: 30 }} />
            <View style={{ width: props.txtWidth || 40, height: 10, backgroundColor: '#d9d9d9', marginTop: 10, borderRadius: 5 }} />
        </View>
    );
};

export default Placeholder.connect(itemHome);