import React, { Component } from 'react';
import {
    View,
    Text,
    WebView, Image,
    StatusBar
} from 'react-native';
import Header from '@components/header';
import IC_BACK from "@resources/icons/close.png";
import IC_DROPDOWN from "@resources/icons/dropDown.png";
import Button from "@components/button";
import ModalSelectUnit from "@components/modalSelectUnit";
import Modal from "react-native-modal";

export default class extends Component {

    render() {
        let unitActive = this.props.units.unitActive;
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <StatusBar
                    barStyle="light-content"
                />
                <Header
                    LinearGradient={true}
                    leftIcon={IC_BACK}
                    leftAction={() => this.props.onClose()}
                    headercolor={'transparent'}
                    showTitleHeader={true}
                    center={
                        <View>
                            <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>FAQ</Text>
                        </View>
                    }
                    renderViewRight={
                        <Button
                            onPress={() => this.setState({ isModalSelectUnit: true })}
                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                            <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: 14 }}>{unitActive.fullUnitCode}</Text>
                            <Image source={IC_DROPDOWN} style={{ marginLeft: 10 }} />
                        </Button>
                    }
                />
                {
                    this.props.utilities && this.props.utilities.FAQ.success ?
                        <WebView
                            originWhitelist={['*']}
                            source={{ html: this.props.utilities.FAQ.result.faqHtmlContent }}
                        // scrollEnabled={false}
                        /> : <View />
                }
                <Modal
                    style={{ flex: 1, margin: 0 }}
                    isVisible={this.state.isModalSelectUnit}>
                    <ModalSelectUnit
                        onClose={() => this.setState({ isModalSelectUnit: false })}
                    />
                </Modal>
            </View>
        );
    }

}