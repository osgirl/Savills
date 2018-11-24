import React, { Component } from 'react';
import {
    View,
    Text,
    Animated, Image,
    StatusBar, Dimensions
} from 'react-native';
import Header from '@components/header';
import IC_BACK from "@resources/icons/close.png";
import IC_DROPDOWN from "@resources/icons/dropDown.png";
import IC_ARROWRIGHT from "../../resources/icons/arrow_seemore.png";
import Button from "@components/button";
import ModalSelectUnit from "@components/modalSelectUnit";
import Modal from "react-native-modal";
import ButtonSwitch from "../../components/buttonSwitch";
import HeaderTitle from '@components/headerTitle';
import Picker from 'react-native-wheel-picker';
import LinearGradient from 'react-native-linear-gradient';

import Resolution from "../../utils/resolution";

import Styles from "./styles";

import Language from "@utils/language";

const { width, height } = Dimensions.get('window');

var PickerItem = Picker.Item;

export default class extends Component {

    renderHeader() {
        let unitActive = this.props.units.unitActive;
        return <View>
            <Header
                LinearGradient={true}
                leftIcon={IC_BACK}
                leftAction={() => this.props.navigation.goBack()}
                headercolor={'transparent'}
                // showTitleHeader={true}
                // center={
                //     <View>
                //         <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>FAQ</Text>
                //     </View>
                // }
                renderViewRight={
                    <Button
                        onPress={() => this.setState({ isModalSelectUnit: true })}
                        style={{ flexDirection: 'row', alignItems: 'center', marginRight: Resolution.scale(20) }}>
                        <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: Resolution.scale(14) }}>{unitActive.fullUnitCode}</Text>
                        <Image source={IC_DROPDOWN} style={{ marginLeft: Resolution.scale(10) }} />
                    </Button>
                }
            />
            <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Animated.View style={{ height: 60 }}>
                    <HeaderTitle title={'Settings'} />
                </Animated.View>
            </LinearGradient>
        </View>
    }

    onPickerSelect(index) {
        try {
            this.props.actions.app.setLanguageLocal(index.toString());
            this.setState({
                selectedItem: index,
            })
        } catch (error) {
            console.log(error)
        }

    }

    renderModalLanguage() {
        return (
            <View>
                <View style={Styles.modalContent}>
                    <Text style={{ fontSize: Resolution.scale(13), fontFamily: 'OpenSans-Bold', marginTop: Resolution.scale(20) }}>Select Language</Text>
                    <Picker
                        style={{ width: width - Resolution.scaleWidth(20), flex: 1, justifyContent: 'center', }}
                        selectedValue={parseInt(this.state.selectedItem)}
                        itemStyle={{ color: "#333333", fontSize: Resolution.scale(20), fontWeight: 'bold' }}
                        onValueChange={(index) => this.onPickerSelect(index)}>
                        {
                            Language.listLanguage.map((item, index) => (
                                <PickerItem
                                    label={item.icon + ' ' + item.title}
                                    value={index}
                                    key={"id_" + index}
                                />
                            ))
                        }
                    </Picker>
                </View>
            </View>
        )
    };

    render() {
        let unitActive = this.props.units.unitActive;
        return (
            <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
                <StatusBar
                    barStyle="light-content"
                />
                {this.renderHeader()}

                <View style={{ padding: Resolution.scale(20) }}>
                    <Text style={Styles.titleHeader}>Thông báo chung</Text>
                    <View style={{ backgroundColor: '#FFF', borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: Resolution.scale(20), paddingHorizontal: Resolution.scale(20) }}>
                            <Text>
                                Thông báo tất cả
                        </Text>
                            <View>
                                <ButtonSwitch
                                    size={'small'}
                                    isOn={this.state.isOnDefaultToggleSwitch}
                                    onToggle={isOnDefaultToggleSwitch => {
                                        this.setState({ isOnDefaultToggleSwitch });
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: Resolution.scale(20) }}>
                            <Text>
                                Nhận email khi có thông báo
                        </Text>
                            <View>
                                <ButtonSwitch
                                    size={'small'}
                                    isOn={this.state.isOnDefaultToggleSwitch}
                                    onToggle={isOnDefaultToggleSwitch => {
                                        this.setState({ isOnDefaultToggleSwitch });
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ padding: Resolution.scale(20) }}>
                    <Text style={Styles.titleHeader}>Ngôn ngữ</Text>
                    <Button
                        onPress={() => this._toggleModalLanguage()}
                        style={{ backgroundColor: '#FFF', borderRadius: 5 }}>
                        <View style={{ padding: Resolution.scale(20), justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <Text>{Language.listLanguage[this.state.selectedItem].title}</Text>
                            <Image source={IC_ARROWRIGHT} />
                        </View>
                    </Button>
                </View>


                <Modal
                    style={{ flex: 1, margin: 0 }}
                    isVisible={this.state.isModalSelectUnit}>
                    <ModalSelectUnit
                        onClose={() => this.setState({ isModalSelectUnit: false })}
                    />
                </Modal>
                <Modal
                    onBackdropPress={() => this._toggleModalLanguage()}
                    isVisible={this.state.isModalLanguage}
                    style={{
                        justifyContent: "flex-end",
                        margin: Resolution.scale(20),
                    }}
                >
                    {this.renderModalLanguage()}
                </Modal>
            </View>
        );
    }
}