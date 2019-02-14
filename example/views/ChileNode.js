// DrawerExample.js

import React from 'react';
import { Image, View, Text } from 'react-native';
import { Button, Drawer, Label, ListRow, NavigationPage, Theme } from 'teaset';
import PropTypes from 'prop-types';

export default class ContextTest extends NavigationPage {

  static contextTypes = {
    propA: PropTypes.string,
  };

  renderPage() {
    const { propA } = this.context;
    return <Text>{propA}</Text>;
  }
}
