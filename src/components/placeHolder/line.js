import React from "react";
import { View, Image } from "react-native";
import Placeholder from "rn-placeholder";

import FastImage from "../../components/fastImage";
import IC_DF from "../../resources/icons/savills_gray.png";

const Line = props => {
    const style = { backgroundColor: props.bgColor };
    return (
        <View style={[style, { padding: 10, borderRadius: 5, alignItems: 'center' }]}>
            <View style={{ width: props.txtWidth || 40, height: props.height ||  10, backgroundColor: '#DEDEDE', borderRadius: props.txtWidth / 2 }} />
        </View>
    );
};

export default Placeholder.connect(Line);