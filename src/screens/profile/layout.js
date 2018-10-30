import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
    TextInput,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';

import Modal from "react-native-modal";
import ButtonCustom from "@components/buttonCustom";
import Button from "@components/button";
import InputText from "@components/inputText";
import LinearGradient from 'react-native-linear-gradient';
import Loading from "@components/loading";
import IC_EMAIL from "@resources/icons/ID.png";
import Resolution from "../../utils/resolution";
import IC_CLOSE from "@resources/icons/close.png";
import IC_SETTING from "@resources/icons/setting.png";
import Style from "./style";

const { width } = Dimensions.get('window');

let styleTextTitle = {
    fontSize: 13,
    fontFamily: 'OpenSans-SemiBold',
    color: '#505E75'
}

let styleTextRight = {
    fontSize: 13,
    fontFamily: 'OpenSans-SemiBold',
    color: '#4A89E8',
    textAlign: 'right'
}

export default class extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={Style.btnLeft}>
                    <ButtonCustom
                        background={'transparent'}
                        haveMargin={false}
                        onPress={this.props.onClose}
                        icon={IC_CLOSE}
                    />
                </View>
                <View style={Style.btnRight}>
                    <ButtonCustom
                        background={'transparent'}
                        haveMargin={false}
                        onPress={this.props.onSetting}
                        icon={IC_SETTING}
                    />
                </View>
                {/* <ScrollView style={Style.container}> */}
                <View style={Style.container}>
                    <View style={{ position: 'absolute', top: 0 }}>
                        <Image source={{ uri: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }}
                            resizeMode={'cover'}
                            style={Style.imgAvatar}
                        />
                    </View>
                    <View style={Style.content}>
                        <View style={Style.block1}>
                            <View>
                                <Text style={styleTextTitle}>Unit</Text>
                                <Text style={[styleTextTitle, { marginVertical: 20 }]}>Mail</Text>
                                <Text style={styleTextTitle}>SDT</Text>
                            </View>
                            <View>
                                <Text style={styleTextRight}>T1-A03-01</Text>
                                <Text style={[styleTextRight, { marginVertical: 20 }]}>toantam1708@gmail.com</Text>
                                <Text style={styleTextRight}>0907690504</Text>
                            </View>
                        </View>
                        <View style={Style.block2}>
                            <View>
                                <Text style={styleTextTitle}>First name</Text>
                                <Text style={[styleTextTitle, { marginVertical: 20 }]}>Last name</Text>
                                <Text style={styleTextTitle}>Display name</Text>
                            </View>
                            <View>
                                <Text style={styleTextRight}>Nguyen Toan</Text>
                                <Text style={[styleTextRight, { marginVertical: 20 }]}>Tam</Text>
                                <Text style={styleTextRight}>Nguyen Toan Tam</Text>
                            </View>
                        </View>

                        <Button style={Style.btnBlock}>
                            <Text style={[Style.txtBlock, { color: '#4A89E8' }]}>Setting</Text>
                        </Button>

                        <Button style={[Style.btnBlock, { marginVertical: 10 }]}>
                            <Text style={[Style.txtBlock, { color: '#4A89E8' }]}>Change Password</Text>
                        </Button>

                        <Button
                            onPress={() => this.props.onLogOut()}
                            style={[Style.btnBlock, { marginVertical: 10, alignItems: 'center', marginBottom: 20 }]}>
                            <Text style={[Style.txtBlock, { color: '#FF361A' }]}>LOGOUT</Text>
                        </Button>

                    </View>
                </View>
                {/* </ScrollView> */}
            </View>
        );
    }
}