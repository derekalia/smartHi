/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Boiler plate imports from redux and redux-native
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import Herby          from './components/herby.js';
import UserReducer    from './reducers/user.js';
import SearchReducer  from './reducers/search.js';
import ProductReducer from './reducers/product.js';

// Combine reducers
let store = createStore(combineReducers({UserReducer,SearchReducer,ProductReducer,}),applyMiddleware(thunk));

class herby extends Component {
  render() {
    return (
        <Provider store={store}>
        <Herby/>
        </Provider>
    );
  }
}

AppRegistry.registerComponent('herby', () => herby);
