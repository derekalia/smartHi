//
// Description: hometab.js
// This contains the declaration for the home tab  of the app
// It should only contain home tab scene navigation logic and nothing else.
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, ScrollView, Image, TouchableHighlight, Navigator } from 'react-native';
import {connect} from 'react-redux';

// Import const ids.
import {HomeSceneId, ProductSceneId, RetailerSceneId, HomeTabId, ProducerSceneId,} from '../common/const.js';

// Import internal modules
import HomeScene     from './homeScene.js';
import ProductScene  from './productScene.js';
import RetailerScene from './retailerScene.js';
import ProducerScene from './producerScene.js';
import RouteMapper   from './routeMapper.js';

const HomeIndex     = 0;
const ProductIndex  = 1;
const RetailerIndex = 2;

const HomeTabScenes = [
    { title: "Herby",    component: HomeScene,     index: HomeSceneId },
    { title: "Product",  component: ProductScene,  index: ProductSceneId },
    { title: "Retailer", component: RetailerScene, index: RetailerSceneId },
    { title: "Producer", component: ProducerScene, index: ProducerSceneId },
];

class HomeTab extends Component {

    constructor(props) {
        super(props);
        this.state = { selectedTab:HomeTabId }; 
    } 
    test () {
      console.log("test was called");
    }

    componentWillReceiveProps(nextProps) {
        console.log("prop was received");
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
            for(var i=0; i < HomeTabScenes.length; i++) {
                 if (HomeTabScenes[i].index == sceneId) {
                    this.refs.navigator.push(HomeTabScenes[i]);
                 }
            }
        }
    }

    renderScene(route, navigator) {
        return (
            <route.component tabId={HomeTabId} navigator={navigator}/>
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
                initialRoute = {HomeTabScenes[HomeIndex]}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper = {RouteMapper}
                        style={{backgroundColor:'#F9F9F9',borderBottomWidth:1,borderColor:'#B2B2B2'}} >
                    </Navigator.NavigationBar>
                }
                />
        );
    }
}

function mapStateToProps(state) { return { sceneId: state.NavigationReducer.sceneId, switchScene: state.NavigationReducer.switchScene } }
module.exports = connect(mapStateToProps)(HomeTab);
