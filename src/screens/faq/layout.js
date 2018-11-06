import React, { Component } from 'react';
import {
    View,
    Dimensions,
    ScrollView,
    WebView
} from 'react-native';
import Header from '@components/header';
import IC_BACK from "../../resources/icons/close.png";

export default class extends Component {

    render() {
        return (
            <View style={{ flex: 1, }}>
                <Header
                    LinearGradient={true}
                    leftIcon={IC_BACK}
                    leftAction={() => this.props.onClose()}
                    headercolor={'transparent'}
                />
                {
                    this.props.utilities && this.props.utilities.FAQ.success ?
                        <WebView
                            originWhitelist={['*']}
                            source={{ html: this.props.utilities.FAQ.result.faqHtmlContent }}
                        /> : <View />
                }
            </View>
        );
    }

}