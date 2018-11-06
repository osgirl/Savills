"use strict";

import React, { Component } from "react";
import {
    StyleSheet,
} from "react-native";

import FastImage from 'react-native-fast-image';

export default class Image extends Component {

    render() {
        return (
            <FastImage
                {...this.props}
                source={
                    typeof this.props.source === 'number' ? this.props.source :
                        {
                            uri: this.props.source,
                            priority: FastImage.priority.normal,
                        }}
                resizeMode={
                    this.props.resizeMode === 'contain' ?
                        FastImage.resizeMode.contain :
                        this.props.resizeMode === 'center' ?
                            FastImage.resizeMode.center :
                            this.props.resizeMode === 'cover' ?
                                FastImage.resizeMode.cover :
                                this.props.resizeMode === 'stretch' ?
                                    FastImage.resizeMode.stretch : FastImage.resizeMode.contain
                }
            />
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})