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
import {SearchSceneId, ProductSceneId, ProducerSceneId, RetailerSceneId, SearchTabId, }   from '../common/const.js';

import SearchScene    from './searchScene.js';
import ProductScene   from './productScene.js';
import RetailerScene  from './retailerScene.js';
import ProducerScene  from './producerScene.js';

// import navigation route mapper
import HerbyBar   from './herbyBar.js';

const SearchIndex     = 0;
const ProductIndex    = 1;
const RetailerIndex   = 2;
const ProducerIndex   = 3;

var SearchTabScenes = [
    {title: "Search",        component: SearchScene,   index: SearchSceneId},
    {title: "Product",       component: ProductScene,  index: ProductSceneId},
    {title: "Retailer",      component: RetailerScene, index: RetailerSceneId},
    {title: "Producer",      component: ProducerScene, index: ProducerSceneId},
];

class SearchTab extends Component {

    constructor(props) {
        super(props);
    } 

    componentWillReceiveProps(nextProps) {
        var sceneId = nextProps.sceneId;
        var foundExisting = false;
        // Check existing routes first
        var routelist = this.refs.navigator.getCurrentRoutes();
        for (var i=0; i < routelist.length; i++) {
            if (routelist[i].index == sceneId) {
                this.refs.navigator.jumpTo(routelist[i]);
                foundExisting = true;
                break;
            }
        }
        // If not found in existing push
        if (foundExisting == false) {
            for(var i=0; i < SearchTabScenes.length; i++) {
                 if (SearchTabScenes[i].index == sceneId) {
                    this.refs.navigator.push(SearchTabScenes[i]);
                    break;
                 }
            }
        }
    }

    renderScene(route, navigator) {
        if (route.index == SearchSceneId) {
            return (
                <route.component tabId={SearchTabId}/>
            );
        }
        else {
            return (
                <View style={{flex:1}}>
                    <HerbyBar navigator={navigator}/>
                    <route.component tabId={SearchTabId}/>
                </View>
            );
        }
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
            />
        );
    }
}

//
// Connect state.NavigationReducer.sceneId to props
//
function mapStateToProps(state) { return { sceneId: state.NavigationReducer.sceneId } }
module.exports = connect(mapStateToProps)(SearchTab);
