//
// Description: searchtab.js
// This contains the declaration for the search tab  of the app
// It should only contain search tab scene navigation logic and nothing else.
// 
import React, { Component } from 'react';
import {StyleSheet,Text,View,ScrollView,Image,TextInput,TouchableOpacity,Navigator} from 'react-native';
import {connect} from 'react-redux';

//get internal components
import Styles         from './styles.js';
import {SearchSceneId, ProductSceneId, RetailerSceneId}   from '../common/const.js';

import SearchScene    from './searchScene.js';
import ProductScene   from './productScene.js';
import RetailerScene  from './retailerScene.js';

// import navigation route mapper
import RouteMapper   from './routeMapper.js';

const SearchIndex     = 0;
const ProductIndex    = 1;
const RetailerIndex   = 2;

var SearchTabScenes = [
    {title: "Search",        component: SearchScene,   index: SearchSceneId},
    {title: "Product",       component: ProductScene,  index: ProductSceneId},
    {title: "Retail",        component: RetailerScene, index: RetailerSceneId},
];

class SearchTab extends Component {

    componentWillReceiveProps(nextProps) {
        sceneId = nextProps.sceneId;
        var foundExisting = false;
        var routelist = this.refs.navigator.getCurrentRoutes();
        for (var i=0; i < routelist.length; i++) {
            if (routelist[i].index == sceneId) {
                this.refs.navigator.jumpTo(routelist[i]);
                foundExisting = true;
                break;
            }
        }
        if (foundExisting == false) {
            for (var i=0; i < SearchTabScenes.length; i++) {
                 if (SearchTabScenes[i].index == sceneId) {
                    this.refs.navigator.push(SearchTabScenes[i]);
                 }
            }
        }
    }

    renderScene(route, navigator) {
        return (
            <route.component navigator={navigator} 
                   searchScene={SearchTabScenes[SearchIndex]} 
                   retailerScene={SearchTabScenes[RetailerIndex]} 
                   productScene={SearchTabScenes[ProductIndex]}/>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    render() {
        return (
            <Navigator
                ref="navigator"
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                initialRoute = {SearchTabScenes[0]}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper = {RouteMapper}
                    />
                }
            />
        );
    }
}

//
// Connect state.NavigationReducer.sceneId and state.NavigationReducer.switchScene to props
//
function mapStateToProps(state) { return { sceneId: state.NavigationReducer.sceneId, switchScene: state.NavigationReducer.switchScene } }
module.exports = connect(mapStateToProps)(SearchTab);
