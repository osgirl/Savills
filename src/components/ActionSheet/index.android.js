/* @flow */
/* eslint no-underscore-dangle: 0 */

import React from 'react';
import {
  View, Text, Modal, Animated, StyleSheet, TouchableOpacity,
} from 'react-native';

const TITLE_HEIGHT = 50;
const MESSAGE_HEIGHT = 40;
const CANCEL_MARGIN = 6;
const BUTTON_HEIGHT = 60;
const BORDER_WIDTH = StyleSheet.hairlineWidth;

const COLOR = {
  OPACITY: 'rgba(0, 0, 0, 0.4)',
  WHITE: '#fff',
  BORDER: '#D7D7D7',
  TITLE: '#616161',
  WARNING: '#ff3b30',
};


type Props = {
  title?: string,
  message?: string,
  options: Array<string>,
  tintColor?: string,
  cancelButtonIndex?: number,
  destructiveButtonIndex?: number,
  onPress: Function,
};

type State = {
  visible: boolean,
  sheetAnim: any,
};

export default class ActionSheet extends React.Component<Props, State> {
  translateY: number;

  static defaultProps = {
    options: [],
    cancelButtonIndex: -1,
    destructiveButtonIndex: -1,
    tintColor: '#2091e4',
    onPress: () => { },
  };

  constructor(props: Object) {
    super(props);
    this.translateY = this._calculateHeight(props);
    this.state = {
      visible: false,
      sheetAnim: new Animated.Value(this.translateY),
    };
    this.dismiss = this.dismiss.bind(this);
  }

  componentDidMount() {
    if (this.props.options.length === 0) {
      throw Error('Prop `options` must be an array and it must not be empty.');
    }
  }

  show() {
    this.setState({ visible: true });
    this._showSheet();
  }

  dismiss() {
    this.onPress(this.props.cancelButtonIndex);
  }

  onPress = (index: number) => {
    this._hideSheet();
    this.props.onPress(index);
  };

  _calculateHeight = (props: Object) => {
    const {
      options, cancelButtonIndex, title, message,
    } = props;
    let height = BUTTON_HEIGHT * options.length + CANCEL_MARGIN;
    if (cancelButtonIndex > -1 && cancelButtonIndex < options.length) height += CANCEL_MARGIN;
    if (title) height += TITLE_HEIGHT;
    if (message) height += MESSAGE_HEIGHT;
    return height;
  };

  _showSheet() {
    Animated.timing(this.state.sheetAnim, {
      toValue: 0,
      duration: 350,
    }).start();
  }

  _hideSheet() {
    Animated.timing(this.state.sheetAnim, {
      toValue: this.translateY,
      duration: 150,
    }).start(() => this.setState({ visible: false }));
  }

  _renderTitle = () => {
    if (this.props.title) {
      return (
        <View style={[styles.title, styles.center]}>
          <Text style={styles.titleText}>
            {this.props.title}
          </Text>
        </View>
      );
    }
    return null;
  };

  _renderMessage = () => {
    if (this.props.message) {
      return (
        <View style={[styles.message]}>
          <Text style={styles.messageText}>
            {this.props.message}
          </Text>
        </View>
      );
    }
    return null;
  };

  _renderOptions = () => {
    const {
      options, cancelButtonIndex, tintColor, destructiveButtonIndex,
    } = this.props;
    return options.map((item, index) => (index === cancelButtonIndex ? null : (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.button, styles.center]}
        key={`${index}`} //eslint-disable-line
        onPress={() => this.onPress(index)}
      >
        <Text
          style={[
            styles.itemText,
            index === destructiveButtonIndex ? { color: COLOR.WARNING } : { color: tintColor },
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    )));
  };

  _renderCancelButton = () => {
    const { cancelButtonIndex, options } = this.props;
    if (cancelButtonIndex > -1 && cancelButtonIndex < options.length) {
      return (
        <View style={[styles.radiusBox, styles.cancelMargin]}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.button, styles.center]}
            onPress={() => this.onPress(cancelButtonIndex)}
          >
            <Text style={[styles.itemText, { color: this.props.tintColor }]}>
              {options[cancelButtonIndex]}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  render() {
    const { visible, sheetAnim } = this.state;
    return (
      <Modal visible={visible} transparent animationType="none" onRequestClose={this.dismiss}>
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={this.dismiss}>
          <View style={[styles.sheetContainer, { height: this.translateY }]}>
            <Animated.View
              style={[
                styles.animation,
                {
                  transform: [{ translateY: sheetAnim }],
                },
              ]}
            >
              <TouchableOpacity style={styles.radiusBox} activeOpacity={1}>
                {this._renderTitle()}
                {this._renderMessage()}
                {this._renderOptions()}
              </TouchableOpacity>
              {this._renderCancelButton()}
            </Animated.View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.OPACITY,
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    marginHorizontal: 10,
  },
  animation: {
    flex: 1,
  },
  radiusBox: {
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: COLOR.BORDER,
    marginBottom: CANCEL_MARGIN,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    backgroundColor: COLOR.WHITE,
    height: TITLE_HEIGHT,
  },
  message: {
    alignItems: 'center',
    backgroundColor: COLOR.WHITE,
    height: MESSAGE_HEIGHT,
  },
  button: {
    backgroundColor: COLOR.WHITE,
    height: BUTTON_HEIGHT,
    borderTopWidth: BORDER_WIDTH,
    borderColor: COLOR.BORDER,
  },
  itemText: {
    fontSize: 20,
    fontWeight: '400',
  },
  titleText: {
    fontSize: 16,
    color: COLOR.TITLE,
  },
  messageText: {
    fontSize: 14,
    color: COLOR.TITLE,
  },
});
