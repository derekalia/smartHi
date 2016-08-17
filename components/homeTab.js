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
import {HomeSceneId, ProductSceneId, RetailerSceneId, HomeTabId, ProducerSceneId,ActivitySceneId,} from '../common/const.js';

// Import internal modules
import HomeScene     from './homeScene.js';
import ProductScene  from './productScene.js';
import RetailerScene from './retailerScene.js';
import ProducerScene from './producerScene.js';
import ActivityScene from './activityScene.js';
import HerbyBar      from './herbyBar.js';

const HomeIndex     = 0;
const ProductIndex  = 1;
const RetailerIndex = 2;

const HomeTabScenes = [
    { title: "Herby",    component: HomeScene,     index: HomeSceneId },
    { title: "Product",  component: ProductScene,  index: ProductSceneId },
    { title: "Retailer", component: RetailerScene, index: RetailerSceneId },
    { title: "Producer", component: ProducerScene, index: ProducerSceneId },
    { title: "Activity", component: ActivityScene, index: ActivitySceneId },
];

class HomeTab extends Component {

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
            for(var i=0; i < HomeTabScenes.length; i++) {
                 if (HomeTabScenes[i].index == sceneId) {
                    this.refs.navigator.push(HomeTabScenes[i]);
                    break;
                 }
            }
        }
    }

    renderScene(route, navigator) {
        if (route.index == HomeSceneId) {
            return (
                <route.component tabId={HomeTabId}/>
            );
        }
        else {
            return (
                <View style={{flex:1}}>
                    <HerbyBar navigator={navigator}/>
                    <route.component tabId={HomeTabId}/>
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
                initialRoute = {HomeTabScenes[HomeIndex]}
                />
        );
    }
}

function mapStateToProps(state) { return { sceneId: state.NavigationReducer.sceneId } }
module.exports = connect(mapStateToProps)(HomeTab);
