'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends Component {
    static defaultProps = {
        background: "#000000",
        color: "#FFFFFF",
        text: "",
        haveMargin: true,
        icon: "",
        display: 'icon',
        fontFamily: 'OpenSans-SemiBold'
    };

    static propTypes = {
        color: PropTypes.string,
        text: PropTypes.string,
        haveMargin: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.click = true;
    }

    renderContentText() {
        return (this.props.text !== '') &&
            <Text style={[style.text, { color: this.props.color, fontSize: this.props.fontSize, fontFamily: this.props.fontFamily }]}>{this.props.text}</Text>
    }

    renderContentIcon() {
        return this.props.icon !== "" &&
            <Image source={this.props.icon} />
    }

    renderContent() {
        switch (this.props.display) {
            case 'icon-text':
                return (
                    <View style={style.contentContainer}>
                        {this.renderContentIcon()}
                        {
                            this.props.icon !== '' && this.props.text !== '' &&
                            <View style={style.separator} />
                        }
                        {this.renderContentText()}
                    </View>
                );
            case 'text-icon':
                return (
                    <View style={style.contentContainer}>
                        {this.renderContentText()}
                        {
                            this.props.icon !== '' && this.props.text !== '' &&
                            <View style={style.separator} />
                        }
                        {this.renderContentIcon()}
                    </View>
                );
            case 'icon':
                return (
                    <View style={style.contentContainer}>
                        {
                            this.props.icon !== '' && this.props.text !== '' &&
                            <View style={style.separator} />
                        }
                        {this.renderContentIcon()}
                    </View>
                );
            case 'text':
                return (
                    <View style={style.contentContainer}>
                        {
                            this.props.icon !== '' && this.props.text !== '' &&
                            <View style={style.separator} />
                        }
                        {this.renderContentText()}
                    </View>
                );
        }
    }

    onPress() {
        if (this.click) {
            this.props.onPress();
        }
        setTimeout(() => {
            this.click = true;
        }, 1000);
        this.click = false;
    }

    render() {
        return (
            <View style={[this.props.flex !== 'full' ? {} : { flex: 1 }, { flexDirection: "row" }]}>
                <TouchableOpacity
                    disabled={this.props.disabled}
                    activeOpacity={this.props.activeOpacity || 0.8}
                    onPress={() => this.onPress()}
                    style={[
                        this.props.type === 'bottom' || !this.props.haveMargin ? {} : { marginHorizontal: 20 }
                    ]}>
                    <View
                        style={{ borderRadius: 8, backgroundColor: this.props.background }}>
                        {this.renderContent()}
                    </View>
                </TouchableOpacity>
            </View>

        )
    }
}

const style = StyleSheet.create({
    fullFlex: {
        flex: 1
    },
    container: {
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    contentContainer: {
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    separator: {
        width: 10
    },
    text: {
        fontSize: 15,
    }
});