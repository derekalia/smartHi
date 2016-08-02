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

import Herby             from './components/herby.js';
import UserReducer       from './reducers/user.js';
import SearchReducer     from './reducers/search.js';
import ProductReducer    from './reducers/product.js';
import RetailerReducer   from './reducers/retailer.js';
import ProducerReducer   from './reducers/producer.js';
import NavigationReducer from './reducers/navigation.js';
import NewsReducer       from './reducers/news.js';

// Combine reducers
let store = createStore(combineReducers({UserReducer,SearchReducer,ProductReducer,ProducerReducer,RetailerReducer,NavigationReducer,NewsReducer,}),applyMiddleware(thunk));

// This object is the Entrypoint for the app on both android and ios
export class entrypoint extends Component {
  render() {
    return (
        <Provider store={store}>
            <Herby/>
        </Provider>
    );
  }
}
