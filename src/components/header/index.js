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
const { width, height } = Dimensions.get("window");

class Header extends Component {

	static defaultProps = {
		headercolor: "transparent",
		// reading: false
	};

	constructor(props) {
		super(props);
		// this.state = {
		// 	fadeAnim: new Animated.Value(1),
		// 	fadeAnimCenter: new Animated.Value(0)
		// };
		// this.barsShown = true;
	}

	// componentDidMount() {
	// 	setTimeout(() => {
	// 		if (this.props.shown) {
	// 			this.show();
	// 		} else {
	// 			this.hide();
	// 		}
	// 	}, 1000);
	// }

	// componentDidUpdate(prevProps, prevState) {
	// 	if (prevProps.shown !== this.props.shown) {
	// 		if (this.props.shown) {
	// 			this.show();
	// 		} else {
	// 			this.hide();
	// 		}
	// 	}
	// }

	// show() {
	// 	const timing = Animated.timing;
	// 	timing(this.state.fadeAnim, {
	// 		toValue: 1,
	// 		duration: 200
	// 	}).start();
	// 	this.barsShown = true;
	// }

	// hide() {
	// 	const timing = Animated.timing;
	// 	timing(this.state.fadeAnim, {
	// 		toValue: 0,
	// 		duration: 200
	// 	}).start();
	// 	this.barsShown = false;
	// }

	// showCenter() {
	// 	Animated.timing(
	// 		this.state.fadeAnimCenter,
	// 		{
	// 			toValue: 1,
	// 			duration: 5000,
	// 		}
	// 	).start();
	// }

	// hideCenter() {
	// 	Animated.timing(
	// 		this.state.fadeAnimCenter,
	// 		{
	// 			toValue: 0,
	// 			duration: 5000,
	// 		}
	// 	).start();
	// }

	render() {
		// const Opacity = this.props.reading === true ? { opacity: this.state.fadeAnim } : null;
		// this.props.center ? this.showCenter() : this.hideCenter()
		return (
			<LinearGradient
				colors={['#4A89E8', '#8FBCFF']}
				start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
				// style={[style.container, { backgroundColor: this.props.headercolor }]}
				>
				{/* <View style={[style.container,{backgroundColor: this.props.headercolor	}]}> */}
				<View style={style.wrapper}>
					<View>
						{
							this.props.leftIcon &&
							<ButtonCustom
								background={this.props.headercolor}
								haveMargin={false}
								onPress={this.props.leftAction || null}
								icon={this.props.leftIcon}
							/>
						}
					</View>
					<View>
						{this.props.center && typeof this.props.center !== 'string'
							? this.props.center()
							: this.renderTitle()}
					</View>
					<View>
						{
							this.props.rightIcon ?
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
										icon={this.props.rightIcon} />

								</View>
								: <View style={{ width: 60 }} />
						}
					</View>
				</View>
			</LinearGradient>
			// </View> 
		);
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
		// height: Platform.OS === "ios" ? 80 : 60,
		// height: Platform.OS === "ios" ? 80 : 60,
		justifyContent: 'center',
	},
	wrapper: {
		// backgroundColor: 'yellow',
		width: width,
		flexDirection: "row",
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: Platform.OS === "ios" ? 30 : 0,
		height: 60,
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


export default Connect(Header)