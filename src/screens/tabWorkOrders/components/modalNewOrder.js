import React, { Component } from 'react';
import { View, Text, Dimensions, Image, ScrollView, TouchableOpacity, TextInput, PixelRatio, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import Header from '@components/header';
import IC_MENU from '@resources/icons/icon_tabbar_active.png';
import ImageViewer from 'react-native-image-zoom-viewer';
const { width } = Dimensions.get('window');
import Connect from '@stores';
const options = {
  title: 'Chụp ảnh để tải lên',
  storageOptions: {
    skipBackup: true,
    uriImage: '',
    path: 'images'
  },
  quality: 1,
  mediaType: 'photo',
  cameraType: 'front',
  maxWidth: PixelRatio.getPixelSizeForLayoutSize(300), // photos only
  maxHeight: PixelRatio.getPixelSizeForLayoutSize(150) // photos only
};

class ModalNewOrder extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        leftIcon={IC_MENU}
        leftAction={navigation.toggleDrawer}
        // center={function () {
        //     return <View><Text>{this.app.test}</Text></View>
        // }}
        // rightIcon={IC_MENU}
        // rightAction={() => alert('Notify')}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      area: 0,
      imageList: ['1'],
      comment: '',
      showImage: false,
      imageIndex: 0
    };
  }

  componentWillMount() {
    this.props.actions.workOrder.createWorkOrder();
  }

  changeArea(index) {
    this.setState({ area: index });
  }

  getPhotos() {
    let ListImage = this.state.imageList.slice();
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        ListImage.push(source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          imageList: ListImage
        });
      }
    });
  }

  deleteImage = index => {
    let arr = this.state.imageList.slice();
    arr.splice(index, 1);
    this.setState({ imageList: arr });
  };

  showDetailImage() {
    const newData = [];
    {
      this.state.imageList && this.state.imageList.length > 0
        ? this.state.imageList.map(value => {
            if (value == null) {
              return;
            }
            if (value.uri) {
              newData.push({ url: value.uri });
            } else {
              newData.push({ url: value });
            }
          })
        : null;
    }
    return (
      <Modal
        visible={this.state.showImage}
        transparent={false}
        animationType="slide"
        onRequestClose={() => this.setState({ showImage: false })}
      >
        <ImageViewer imageUrls={newData} index={this.state.imageIndex} />
        <TouchableOpacity
          onPress={() => this.setState({ showImage: false })}
          style={{
            position: 'absolute',
            top: 35,
            left: 20,
            width: 50,
            height: 50
          }}
        >
          <Text
            style={{
              color: '#ffffff',
              fontSize: 18,
              backgroundColor: 'transparent'
            }}
          >
            Close
          </Text>
        </TouchableOpacity>
      </Modal>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.showDetailImage()}
        <ScrollView style={{ flex: 1, backgroundColor: '#F6F8FD', marginBottom: 50 }}>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.0, y: 1.0 }} colors={['#4A89E8', '#8FBCFF']} style={{ flex: 1 }}>
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 35, margin: 20 }}>New Order</Text>
          </LinearGradient>
          <ItemScorll
            title={'Thông Tin'}
            view={
              <View
                style={{
                  height: 130,
                  width: null,
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: '#FFF',
                  padding: 20,
                  justifyContent: 'space-around'
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Căn Hộ</Text>
                  <Text style={{ color: '#BABFC8', fontWeight: '500' }}>T1-A03-01-Leenguyen G (Resident)</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Mail</Text>
                  <Text style={{ color: '#4A89E8', fontWeight: '500' }}>toantam1708@gmail.com</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>SĐT</Text>
                  <Text style={{ color: '#4A89E8', fontWeight: '500' }}>0907690504</Text>
                </View>
              </View>
            }
          />
          <ItemScorll
            title={'Khu Vực'}
            view={
              <View
                style={{
                  height: 110,
                  width: null,
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: '#FFF',
                  padding: 20,
                  justifyContent: 'space-around'
                }}
              >
                <TouchableOpacity activeOpacity={1} onPress={() => this.changeArea(0)} style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Căn Hộ</Text>
                  <Image
                    source={
                      this.state.area === 0
                        ? require('../../../resources/icons/checked.png')
                        : require('../../../resources/icons/check.png')
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => this.changeArea(1)} style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Công Cộng</Text>
                  <Image
                    source={
                      this.state.area === 0
                        ? require('../../../resources/icons/check.png')
                        : require('../../../resources/icons/checked.png')
                    }
                  />
                </TouchableOpacity>
              </View>
            }
          />
          <ItemScorll
            title={'Hình Ảnh'}
            view={
              <ScrollView
                style={{
                  borderRadius: 10,
                  paddingTop: 10,
                  width: width - 40,
                  height: 130,
                  backgroundColor: '#FFF'
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
              >
                {this.state.imageList.map((item, index) => this.renderItemImage(item, index))}
              </ScrollView>
            }
          />
          <ItemScorll
            title={'Miêu Tả'}
            view={
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: '#FFF',
                  borderRadius: 5,
                  height: 100,
                  width: null,
                  padding: 10,
                  paddingTop: 20
                }}
                multiline
                placeholder={'Nhập nội dung ...'}
                onChangeText={e => this.setState({ comment: e })}
              />
            }
          />
        </ScrollView>
        <View style={{ position: 'absolute', width: width, height: 50, backgroundColor: '#FFF', bottom: 0, padding: 10 }}>
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: '#01C772', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderItemImage = (item, index) => {
    if (index === 0) {
      return (
        <TouchableOpacity
          onPress={() => this.getPhotos()}
          key={index}
          style={{
            width: 90,
            height: 90,
            marginLeft: 20,
            borderRadius: 10,
            marginTop: 10,
            backgroundColor: '#F6F8FD',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#FFF',
              borderRadius: 25,
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 2 },
              shadowOpacity: 0.16,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Image source={require('../../../resources/icons/close-image.png')} />
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity key={index} onPress={() => this.setState({ showImage: true, imageIndex: index })}>
        <Image style={{ width: 90, height: 90, borderRadius: 10, margin: 10 }} source={item} />
        <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0 }} onPress={() => this.deleteImage(index)}>
          <Image style={{ width: 20, height: 20 }} source={require('../../../resources/icons/close-image.png')} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
}

class ItemScorll extends Component {
  render() {
    const { title, view } = this.props;
    return (
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Text style={{ marginTop: 20, marginBottom: 10, color: '#505E75', fontSize: 14, fontWeight: 'bold' }}>{title}</Text>
        {this.props.view}
      </View>
    );
  }
}

export default Connect(ModalNewOrder);
