import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, FlatList } from 'react-native';

import IMG_BG from '@resources/image/ChooseProject.png';
import ItemProjectApartment from '@components/itemProjectApartment';
import Utils from '@utils';
import { Loading } from '@components';

import Style from './style';
import resolution from '@utils/resolution';

export default class extends Component {
  renderLoading() {
    if (this.state.loading) {
      return <Loading style={{ zIndex: 30 }} visible={this.state.loading} onRequestClose={() => {}} />;
    }
    return null;
  }

  render() {
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    return (
      <ImageBackground source={IMG_BG} resizeMode={'cover'} style={Style.container}>
        <Text style={{ color: '#505E75', fontSize: 15, marginTop: 123, fontFamily: 'OpenSans-Bold' }}>
          {languages.PROJECT_TXT_CONTENT}
        </Text>
        <View style={Style.viewBottom}>
          <FlatList
            data={
              this.props.account.tenant && this.props.account.tenant.length > 0
                ? this.props.account.tenant
                : Utils.dataPlaceholder
            }
            horizontal
            contentContainerStyle={{ paddingVertical: resolution.scaleHeight(115) }}
            keyExtractor={(item, index) => 'itenmProject__' + index}
            renderItem={({ item, index }) => {
              return (
                <ItemProjectApartment
                  onPressItem={() => this._gotoChooseApartment(item)}
                  title={item.tenancyName}
                  image={`https://uat.spms.asia/core/TenantCustomization/GetTenantLogo?tenantId=${item.tenantId}`}
                  loading={this.props.account.tenant && this.props.account.tenant.length > 0 ? true : false}
                />
              );
            }}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            ListHeaderComponent={() => <View style={{ width: 20 }} />}
            ListFooterComponent={() => <View style={{ width: 20 }} />}
          />
        </View>
        {this.renderLoading()}
      </ImageBackground>
    );
  }
}
