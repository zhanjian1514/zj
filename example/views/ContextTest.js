// DrawerExample.js


import React from 'react';
import { Image, View, Text } from 'react-native';
import { Button, Drawer, Label, ListRow, NavigationPage, Theme } from 'teaset';
import PropTypes from 'prop-types';
import ChildNode from './ChileNode';

export default class ContextTest extends NavigationPage {

  static childContextTypes = {
    propA: PropTypes.string,
    methodA: PropTypes.func,
  };

  // 返回Context对象，方法名是约定好的
  getChildContext() {
    return {
      propA: 'propA',
      methodA: () => 'methodA',
    };
  }

  renderPage = () => {
    return (<View style={{ flex: 1 }}>
      <ChildNode />
    </View>);
  }
}
