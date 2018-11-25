import React, { Component } from 'react';

import {
    View,
    Text,
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    PixelRatio,
    // Modal,
    Animated,
    Platform,
    WebView,
    KeyboardAvoidingView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Header from '@components/header';
import moment from 'moment';
import ItemComment from '@components/itemComment';
import HeaderTitle from '@components/headerTitle';
import Resolution from '../../../utils/resolution';
import Button from '@components/button';
import Connect from '@stores';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import _ from "lodash";

const { width, height } = Dimensions.get('window');

const HEADER_MAX_HEIGHT = Resolution.scale(140);
const HEADER_MIN_HEIGHT = Resolution.scale(Platform.OS === 'android' ? 50 : 70);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ModalDetailFeedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            scrollY: new Animated.Value(0),
            isShowTitleHeader: false,
            listTypeFeedback: this.props.feedback.typeFeedback.result,
            projectTypes: [
                { name: 'HO', value: 'HO' },
                { name: 'Project', value: 'PROJECT' }
            ],
            listCategory: this.props.feedback.listCategory.result || [],
            isShowCategory: false,
            type: '',
            typeProject: '',
            categorySelectedId: null,
            isShowModalConfirm: false,
            isShowChat: false,
            listComment: []
        };
    }

    handleScroll = event => {
        Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
            listener: event => {
                if (event.nativeEvent.contentOffset.y > 60) {
                    if (!this.showCenter) {
                        this.showCenter = true;
                        this.setState({ isShowTitleHeader: true });
                    }
                } else {
                    if (this.showCenter) {
                        this.showCenter = false;
                        this.setState({ isShowTitleHeader: false });
                    }
                }
            }
        })(event);
    };


    render() {
        // const { itemSelected } = this.props;
        // let date = moment(itemSelected && itemSelected.createdAt).format('l');
        // let time = moment(itemSelected && itemSelected.createdAt).format('LT');

        let items = this.props.item;
        console.log(items)

        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        });

        return (
            <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
                <ScrollView
                    alwaysBounceVertical={false}
                    scrollEventThrottle={16}
                    onScroll={this.handleScroll}
                    contentContainerStyle={{ marginTop: HEADER_MAX_HEIGHT }}
                    style={{ flex: 1, backgroundColor: '#F6F8FD' }}
                >
                    {
                        items && items.content && <ItemScorll
                            title={'Nội dung'}
                            view={
                                <View
                                    style={{
                                        height: Resolution.scaleHeight(280),
                                        width: null,
                                        flex: 1,
                                        borderRadius: 10,
                                        backgroundColor: '#FFF',
                                        padding: Resolution.scale(20),
                                        justifyContent: 'space-around'
                                    }}
                                >
                                    <WebView
                                        originWhitelist={['*']}
                                        source={{ html: items.content }}
                                    />
                                </View>
                            }
                        />
                    }
                    {
                        items && items.fileUrl && <ItemScorll
                            title={'Hình Ảnh'}
                            view={
                                <ScrollView
                                    style={{
                                        borderRadius: 10,
                                        paddingTop: 20,
                                        width: width - 40,
                                        height: Resolution.scaleHeight(130),
                                        backgroundColor: '#FFF'
                                    }}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                >
                                    {this.renderItemImage(items.fileUrl)}
                                </ScrollView>
                            }
                        />
                    }



                </ScrollView>

                <Animated.View style={{ height: headerHeight, position: 'absolute', top: 0, left: 0, right: 0, overflow: 'hidden' }}>
                    <Header
                        LinearGradient={true}
                        leftIcon={require('../../../resources/icons/close.png')}
                        leftAction={() => this.props.onClose()}
                        headercolor={'transparent'}
                        showTitleHeader={this.state.isShowTitleHeader}
                        center={
                            <View>
                                <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{'Detail'}</Text>
                            </View>
                        }
                    />
                    <LinearGradient
                        colors={['#4A89E8', '#8FBCFF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ width: width, paddingBottom: 20 }}
                    >
                        <HeaderTitle title={'Detail'} />
                    </LinearGradient>
                </Animated.View>
            </View>
        );
    }

    renderItemImage = (item) => {
        console.log('item___', item)
        if (item.fileUrl) {
            let encToken = this.props.account.encToken;
            let image = `${item.fileUrl}&encToken=${encodeURIComponent(encToken)}`;
            return (
                <TouchableOpacity onPress={() => this.setState({ showImage: true, imageIndex: index })}>
                    <Image
                        style={{ width: 90, height: 90, marginLeft: 20, borderRadius: 10 }}
                        resizeMode={'cover'}
                        source={{
                            uri: image
                        }}
                    />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => this.setState({ showImage: true, imageIndex: index })}>
                    <Image style={{ width: 90, height: 90, marginLeft: 20, borderRadius: 10 }} resizeMode={'cover'} source={item} />
                </TouchableOpacity>
            );
        }
    };

}

class ItemScorll extends Component {
    render() {
        const { title, view } = this.props;
        return (
            <View style={{ marginHorizontal: Resolution.scale(20) }}>
                <Text style={{ marginTop: Resolution.scale(20), marginBottom: Resolution.scale(10), color: '#505E75', fontSize: Resolution.scale(14), fontFamily: 'OpenSans-Bold' }}>{title}</Text>
                {this.props.view}
            </View>
        );
    }
}

export default Connect(ModalDetailFeedback);
