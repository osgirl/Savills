/* @flow */

import React from 'react';
import pick from 'lodash/pick';
import { ActionSheetIOS } from 'react-native';

const PICK_NAME = [
  'title',
  'message',
  'options',
  'tintColor',
  'cancelButtonIndex',
  'destructiveButtonIndex',
];

type Props = {
  title?: string,
  message?: string,
  options: Array<string>,
  tintColor?: string,
  cancelButtonIndex?: number,
  destructiveButtonIndex?: number,
  onPress: Function,
};

export default class ActionSheet extends React.Component<Props> {
  static defaultProps = {
    options: [],
    onPress: () => { },
  };

  componentDidMount() {
    if (this.props.options.length === 0) {
      throw Error('Prop `options` must be an array and it must not be empty.');
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  show() {
    const ActionSheetOptions = pick(this.props, PICK_NAME);
    ActionSheetIOS.showActionSheetWithOptions(ActionSheetOptions, this.props.onPress);
  }

  render() {
    return null;
  }
}
