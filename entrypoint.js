/**
 * Herby's x-platform entrypoint.
 */

import React, { Component } from 'react';

//
// Import  and setup apollo client and providers.
//
import  ApolloClient,{createNetworkInterface} from 'apollo-client';
import  {ApolloProvider} from 'react-apollo';

// Create apollo network interface pointing to the server
const  apolloNetworkInterface =  createNetworkInterface({uri:'https://api.graph.cool/simple/v1/ciuettdq20nfv0174kpc512my'});

// Set apollo network to use a bearer token if possible
apolloNetworkInterface.use([{
    applyMiddleware(request,next) {
        const currentUserToken = null;//GetUserToken();

        if (currentUserToken == null) {
            next();
            return;
        }
        if (!request.options.headers) {
            request.options.headers = new Headers();
        }
        request.options.headers.authorization = `Bearer ${currentUserToken}`;
        next();
    }
}]);

// Create apollo client
const apolloClient = new ApolloClient({
  networkInterface: apolloNetworkInterface,
});

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
import ActivityReducer   from './reducers/activity.js';
import MapReducer        from './reducers/map.js';
import ReviewReducer     from './reducers/review.js';

// Combine reducers
let store = createStore(combineReducers(
    {UserReducer,
     SearchReducer,
     ProductReducer,
     ProducerReducer,
     RetailerReducer,
     NavigationReducer,
     NewsReducer,
     MapReducer,
     ReviewReducer,
     ActivityReducer,
     apollo: apolloClient.reducer(),
     }),applyMiddleware(thunk));

// This object is the Entrypoint for the app on both android and ios
export class entrypoint extends Component {
  render() {
    return (
        <ApolloProvider store={store} client={apolloClient}>
            <Herby/>
        </ApolloProvider>
    );
  }
}
