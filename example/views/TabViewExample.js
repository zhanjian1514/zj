// TabViewExample.js


import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, Switch, Platform } from 'react-native';

import { Theme, TeaNavigator, NavigationPage, BasePage, ListRow, TabView, Label, PullPicker } from 'teaset';

export default class TabViewExample extends BasePage {

  static defaultProps = {
    ...BasePage.defaultProps,
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, {
      type: 'projector',
      custom: false,
    });
  }

  renderCustomButton = () => {
    const bigIcon = (
      <View style={{
        width: 54,
        height: 54,
        borderRadius: 27,
        shadowColor: '#ccc',
        shadowOffset: { height: -1 },
        shadowOpacity: 0.5,
        shadowRadius: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <Image
          style={{ width: 44, height: 44, borderRadius: 22 }}
          source={require('../images/faircup.jpg')}
        />
      </View>
    );
    return (
      <TabView.Sheet
        type='button'
        title='Custom'
        icon={bigIcon}
        iconContainerStyle={{ justifyContent: 'flex-end' }}
        onPress={() => alert('Custom button press')}
      />
    );
  }

  renderPage() {
    const { type, custom } = this.state;
    const customBarStyle = Platform.OS == 'android' ? null : {
      borderTopWidth: 0,
      shadowColor: '#ccc',
      shadowOffset: { height: -1 },
      shadowOpacity: 0.4,
      shadowRadius: 0.5,
    };
    return (
      <TabView style={{ flex: 1 }} barStyle={custom ? customBarStyle : null} type={type}>
        <TabView.Sheet
          title='Home'
          icon={require('../icons/home.png')}
          activeIcon={require('../icons/home_active.png')}
        >
          <HomePage
            type={type}
            custom={custom}
            onChangeType={type => this.setState({ type })}
            onChangeCustom={custom => this.setState({ custom })}
          />
        </TabView.Sheet>
        {custom ? this.renderCustomButton() : null}
        <TabView.Sheet
          title='Me'
          icon={require('../icons/me.png')}
          activeIcon={require('../icons/me_active.png')}
          badge={1}
        >
          <MePage />
        </TabView.Sheet>
      </TabView>
    );
  }

}

class HomePage extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Home',
    showBackButton: true,
  };

  selectType() {
    const { type, onChangeType } = this.props;
    const items = ['projector', 'carousel'];
    PullPicker.show(
      'Type',
      items,
      items.indexOf(this.props.type),
      (item, index) => onChangeType && onChangeType(item),
    );
  }

  renderPage() {
    const { type, custom, onChangeCustom } = this.props;
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 20 }} />
        <ListRow title='Type' detail={type} onPress={() => this.selectType()} topSeparator='full' bottomSeparator='full' />
        <View style={{ height: 20 }} />
        <ListRow title='Custom' detail={<Switch value={custom} onValueChange={value => onChangeCustom(value)} />} topSeparator='full' bottomSeparator='full' />
      </ScrollView>
    );
  }

}

class MePage extends NavigationPage {

  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Me',
    showBackButton: false,
  };

  renderPage() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Label type='detail' size='xl' text={this.props.title} />
      </View>
    );
  }

}
