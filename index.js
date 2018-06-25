import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

import configureStore from './src/store/configureStore'
import Navigator from './src/Navigator';
import {Provider} from 'react-redux'

const store = configureStore();

const ReduxApp = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
)

AppRegistry.registerComponent('forecast_app', () => ReduxApp);