import React, { Component } from 'react';
import {
    View,
    Text,
    Platform,
    TextInput,
    Image,
    Dimensions,
    ScrollView,StatusBar
} from 'react-native';

import Modal from "react-native-modal";
import ButtonCustom from "@components/buttonCustom";
import Button from "@components/button";
import InputText from "@components/inputText";
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import Loading from "@components/loading";
import IC_EMAIL from "@resources/icons/ID.png";
import Resolution from "../../utils/resolution";
import FastImage from "../../components/fastImage";
import IC_CLOSE from "@resources/icons/close.png";
import IC_SETTING from "@resources/icons/setting.png";
import IMG_AVATAR_DEFAULT from "../../resources/icons/avatar-default.png";
import ModalSelectUnit from "@components/modalSelectUnit";
import Style from "./style";

import Language from "../../utils/language";

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
                        Language.listLanguage[this.props.app.languegeLocal].data.PROFILE_TXT_PHONE :
                        this.state.keyUpdate === 'name' ?
                            Language.listLanguage[this.props.app.languegeLocal].data.PROFILE_TXT_FIRST :
                            this.state.keyUpdate === 'surname' ?
                                Language.listLanguage[this.props.app.languegeLocal].data.PROFILE_TXT_LAST : ''

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

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 1080,
            maxHeight: 1080,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                // this.setState({
                //     avatarSource: source
                // });
                console.log('Source______________', response)
                this._uploadAvatar(response.uri);

            }
        });
    }

    render() {
        let avatar = this.props.imageProfile;
        let Unit = this.props.units.unitActive;
        let LG = Language.listLanguage[this.props.app.languegeLocal].data
        return (
            <ScrollView
                alwaysBounceVertical={false}
                style={{ flex: 1 }}>
                <StatusBar
                    barStyle="light-content"
                />
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
                        <FastImage
                            style={Style.imgAvatar}
                            source={avatar}
                            resizeMode={'cover'}
                        />
                    </View>
                    <View style={Style.content}>
                        <View style={{ marginVertical: 10, alignItems: 'flex-end' }}>
                            <Button onPress={() => this.selectPhotoTapped()}>
                                <Text style={{ color: '#FFF', fontFamily: 'OpenSans-Semibold', fontSize: 12 }}>{LG.PROFILE_TXT_CHANGEAVATAR}</Text>
                            </Button>
                        </View>
                        <View style={Style.block1}>
                            <View>
                                <Text style={styleTextTitle}>{LG.PROFILE_TXT_UNIT}</Text>
                                <Text style={[styleTextTitle, { marginVertical: 20 }]}>Mail</Text>
                                <Text style={styleTextTitle}>{LG.PROFILE_TXT_PHONE}</Text>
                            </View>
                            <View>
                                <Button
                                    onPress={() => this._openModalSelectUnit()}
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
                                <Text style={styleTextTitle}>{LG.PROFILE_TXT_FIRST}</Text>
                                <Text style={[styleTextTitle, { marginVertical: 20 }]}>{LG.PROFILE_TXT_LAST}</Text>
                                <Text style={styleTextTitle}>{LG.PROFILE_TXT_DISPLAY}</Text>
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
                            <Text style={[Style.txtBlock, { color: '#4A89E8' }]}>{LG.PROFILE_BTN_SETTING}</Text>
                        </Button>

                        <Button
                            onPress={() => this.props.onChangePassword()}
                            style={[Style.btnBlock, { marginVertical: 10 }]}>
                            <Text style={[Style.txtBlock, { color: '#4A89E8' }]}>{LG.PROFILE_BTN_CHANGEPASS}</Text>
                        </Button>

                        <Button
                            onPress={() => this.props.onLogOut()}
                            style={[Style.btnBlock, { marginVertical: 10, alignItems: 'center', marginBottom: 20 }]}>
                            <Text style={[Style.txtBlock, { color: '#FF361A' }]}>{LG.PROFILE_BTN_LOGOUT}</Text>
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
                <Modal
                    style={{ flex: 1, margin: 0 }}
                    isVisible={this.state.isModalSelectUnit}>
                    <ModalSelectUnit
                        onClose={() => this.setState({ isModalSelectUnit: false })}
                    />
                </Modal>
            </ScrollView>
        );
    }
}