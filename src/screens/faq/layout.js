import React, { Component } from 'react';
import {
    View,
    Dimensions,
    ScrollView,
    WebView
} from 'react-native';

export default class extends Component {

    render() {
        return (
            <View style={{ flex: 1, }}>
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