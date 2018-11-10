import React from "react";
import { View, Image } from "react-native";
import Placeholder from "rn-placeholder";

import FastImage from "../../components/fastImage";
import IC_DF from "../../resources/icons/savills_gray.png";

const itemHome = props => {
    const style = { backgroundColor: props.bgColor };
    return (
        <View style={[style, { padding: 5, borderRadius: 5, alignItems: 'center' }]}>
            <View style={{}}>
                <FastImage source={IC_DF} style={{ width: 70, height: 70 }} resizeMode={'contain'} />
            </View>
            <View style={{ width: props.txtWidth || 40, height: 10, backgroundColor: '#DEDEDE', borderRadius: 5 }} />
        </View>
    );
};

export default Placeholder.connect(itemHome);