"use strict";

import React, { Component } from "react";
import {
	View,
	Text,
	Dimensions,
	Platform,
	StyleSheet,
	Animated
} from "react-native";

import { SafeAreaView } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import ButtonCustom from "../buttonCustom";
import Connect from '@stores';

import Resolution from "../../utils/resolution";
const { width, height } = Dimensions.get("window");

class HeaderHome extends Component {

	static defaultProps = {
		headercolor: "#FFF",
		// reading: false
	};

	constructor(props) {
		super(props);
		this.state = {
			fadeAnim: new Animated.Value(1),
			fadeAnimIcon: new Animated.Value(0)
		}
	}

	componentDidMount() {
		if (this.props.customViewLeft) {
			this.show();
		} else {
			this.hide();
		}
	}


	componentDidUpdate(prevProps, prevState) {
		if (prevProps.customViewLeft !== this.props.customViewLeft) {
			if (this.props.customViewLeft) {
				this.show();
			} else {
				this.hide();
			}
		}
	}

	show() {
		const timing = Animated.timing;
		timing(this.state.fadeAnim, {
			toValue: 1,
			duration: 700
		}).start();
		timing(this.state.fadeAnimIcon, {
			toValue: 0,
			duration: 400
		}).start();
	}

	hide() {
		const timing = Animated.timing;
		timing(this.state.fadeAnim, {
			toValue: 0,
			duration: 400
		}).start();
		timing(this.state.fadeAnimIcon, {
			toValue: 1,
			duration: 700
		}).start();
	}

	renderContent() {
		let fixHeader = this.props.headercolor === 'transparent' && !this.props.LinearGradient ? true : false;
		const Opacity = { opacity: this.state.fadeAnim };
		const OpacityIcon = { opacity: this.state.fadeAnimIcon || 1 }
		return (
			<View
				style={[style.container,
				{
					backgroundColor: this.props.headercolor,
					position: fixHeader ? 'absolute' : 'relative',
					top: fixHeader && Platform.OS === "ios" ? 0 : 0,
				}]}>

				<View style={style.wrapper}>
					<Animated.View style={Opacity}>
						{this.props.renderViewLeft}
					</Animated.View>
					<Animated.View style={[OpacityIcon, { position: 'absolute', left: 0 }]}>
						{
							this.props.leftIcon &&
							<ButtonCustom
								background={this.props.headercolor}
								haveMargin={false}
								onPress={this.props.leftAction || null}
								icon={this.props.leftIcon}
							/>
						}
					</Animated.View>
					<View>
						{
							this.props.center ?
								this.props.center : <View />
						}
					</View>
					<View>
						{
							this.props.rightIcon || this.props.text ?
								<View style={{ flexDirection: 'row' }}>
									{
										this.props.rightIconL ? <ButtonCustom
											background={this.props.headercolor}
											haveMargin={false}
											onPress={this.props.rightActionL || null}
											icon={this.props.rightIconL} /> : null
									}

									<ButtonCustom
										background={this.props.headercolor}
										haveMargin={false}
										onPress={this.props.rightAction || null}
										display={this.props.display}
										icon={this.props.rightIcon}
										text={this.props.text}
									/>

								</View>
								: <View style={{ width: 60 }} />
						}
					</View>
				</View>
			</View>
		)
	}

	render() {
		if (this.props.LinearGradient) {
			return (
				<LinearGradient
					colors={['#4A89E8', '#8FBCFF']}
					start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
				>
					{this.renderContent()}
				</LinearGradient>
			);
		} else {
			return (
				this.renderContent()
			);
		}

	}

	renderTitle() {
		return (
			<View style={style.titleContainer}>
				<Text
					numberOfLines={1}
					style={style.titleText}
				>
					{this.props.center}
				</Text>
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		height: Platform.OS === "ios" ? Resolution.scaleHeight(80) : Resolution.scaleHeight(60),
		justifyContent: 'center',
	},
	wrapper: {
		// backgroundColor: 'red',
		width: width,
		flexDirection: "row",
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: Platform.OS === "ios" ? Resolution.scale(20) : 0,
		height: Resolution.scaleHeight(60),
		// paddingHorizontal: 10
	},
	titleContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	titleText: {
		color: "#000",
		backgroundColor: "transparent",
		fontWeight: "400",
	}
});


export default Connect(HeaderHome)