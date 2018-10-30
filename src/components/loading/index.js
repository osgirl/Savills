import React, { Component } from 'react';
import {
    View,
    Modal,
    PanResponder,
    ActivityIndicator
} from 'react-native'

import Config from '../../utils/configs'

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }

    // componentWillMount() {
    //     this._panResponder = PanResponder.create({
    //         onStartShouldSetPanResponder: (evt, gestureState) => true,
    //         onPanResponderGrant: (evt, gestureState) => {
    //             if (evt.nativeEvent.locationX === evt.nativeEvent.pageX) {
    //                 this.props.onRequestClose();
    //             }
    //         },
    //     });
    // }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => this.props.onRequestClose()}
            >
                <View style={{
                    ...this.props.style,
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(0,0,0,0.6)"
                }} >
                    <ActivityIndicator
                        animating={this.props.visible}
                        color={Config.colorMain}
                        size="large"
                    />
                </View>
            </Modal>
        );
    }
}