import React, { Component } from 'react';
import {
    View,
    Dimensions,
    ScrollView
} from 'react-native';

import HTML from 'react-native-render-html';

export default class extends Component {

    render() {
        return (
            <ScrollView
                style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
                {
                    this.props.utilities && this.props.utilities.FAQ.success ?
                        <View style={{marginHorizontal: 20}}>
                            <HTML
                                html={this.props.utilities.FAQ.result.faqHtmlContent}
                                imagesMaxWidth={Dimensions.get('window').width}
                            />
                        </View>
                        : null
                }

            </ScrollView>
        );
    }

}