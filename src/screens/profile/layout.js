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

    renderLoading() {
        if (this.props.loading) {
            return <Loading
                style={{ zIndex: 30 }}
                visible={this.props.loading}
                onRequestClose={() => { }}
            />
        }
        return null;
    }

    renderModalContent = () => (
        <View style={[Style.modalContent, {}]}>
            <Text style={{ marginTop: 40, fontSize: 15, color: '#505E75', fontFamily: 'OpenSans-Bold' }}>
                {
                    this.state.keyUpdate === 'sdt' ?
                        'Phone number' :
                        this.state.keyUpdate === 'name' ?
                            'First name' :
                            this.state.keyUpdate === 'surname' ?
                                'Last name' : ''

                }
            </Text>
            <View>
                <TextInput
                    placeholder={'YOURCODE'}
                    value={this.state.txtUpdate}
                    style={{ fontSize: 22, fontFamily: 'OpenSans-Regular', color: '#505E75', width: width, textAlign: 'center' }}
                    onChangeText={(text) => this.setState({ txtUpdate: text })}
                />
            </View>
            <Button
                style={{ width: Resolution.scaleWidth(255), marginBottom: 40 }}
                onPress={() => this._updateProfile()}
            >
                <LinearGradient
                    colors={['#4A89E8', '#8FBCFF']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={{ alignItems: 'center', borderRadius: 33, }}
                >
                    <Text style={{ fontSize: 15, color: '#FFFFFF', marginVertical: 13, fontFamily: 'Opensans-SemiBold' }}>
                        OK
                     </Text>
                </LinearGradient>
            </Button>
        </View>
    );

    render() {
        // let Profile = this.props.profile;
        let Unit = this.props.units.unitActive;
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
                        <Image source={{ uri: this.props.imageProfile }}
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
                                <Button
                                    onPress={() => { }}
                                >
                                    <Text style={styleTextRight}>{Unit.fullUnitCode}</Text>
                                </Button>
                                <Text style={[styleTextRight, { marginVertical: 20, color: '#BABFC8' }]}>{this.state.profile.emailAddress}</Text>
                                <Button
                                    onPress={() => { this._openModalUpdate('sdt') }}
                                >
                                    <Text style={styleTextRight}>{this.state.profile.phoneNumber}</Text>
                                </Button>
                            </View>
                        </View>
                        <View style={Style.block2}>
                            <View>
                                <Text style={styleTextTitle}>First name</Text>
                                <Text style={[styleTextTitle, { marginVertical: 20 }]}>Last name</Text>
                                <Text style={styleTextTitle}>Display name</Text>
                            </View>
                            <View>
                                <Button
                                    onPress={() => { this._openModalUpdate('name') }}
                                >
                                    <Text style={styleTextRight}>{this.state.profile.name}</Text>
                                </Button>
                                <Button
                                    onPress={() => { this._openModalUpdate('surname') }}
                                >
                                    <Text style={[styleTextRight, { marginVertical: 20 }]}>{this.state.profile.surname}</Text>
                                </Button>
                                <Text style={[styleTextRight, { color: '#BABFC8' }]}>{this.state.profile.displayName}</Text>
                            </View>
                        </View>

                        <Button
                            onPress={() => alert('SETTING')}
                            style={Style.btnBlock}>
                            <Text style={[Style.txtBlock, { color: '#4A89E8' }]}>Setting</Text>
                        </Button>

                        <Button
                            onPress={() => this.props.onChangePassword()}
                            style={[Style.btnBlock, { marginVertical: 10 }]}>
                            <Text style={[Style.txtBlock, { color: '#4A89E8' }]}>Change Password</Text>
                        </Button>

                        <Button
                            onPress={() => this.props.onLogOut()}
                            style={[Style.btnBlock, { marginVertical: 10, alignItems: 'center', marginBottom: 20 }]}>
                            <Text style={[Style.txtBlock, { color: '#FF361A' }]}>LOGOUT</Text>
                        </Button>

                    </View>
                </View>
                <Modal
                    onBackdropPress={() => this.setState({ isShowModalUpdate: false })}
                    isVisible={this.state.isShowModalUpdate}>
                    {this.renderModalContent()}
                </Modal>
                {this.renderLoading()}
                {/* </ScrollView> */}
            </View>
        );
    }
}