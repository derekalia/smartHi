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
import {HomeSceneId, ProductSceneId, ProfileSceneId, RetailerSceneId, HomeTabId, ProducerSceneId,ActivitySceneId,} from '../common/const.js';

// Import internal modules
import HomeScene     from './scenes/home/homeScene.js';
import ProductScene  from './scenes/product/productScene.js';
import RetailerScene from './scenes/retailer/retailerScene.js';
import ProducerScene from './scenes/producer/producerScene.js';
import ActivityScene from './scenes/activity/activityScene.js';
import ProfileScene  from './scenes/profile/profileScene.js';

const HomeIndex     = 0;
const ProductIndex  = 1;
const RetailerIndex = 2;

const TabScenes = [
    { title: "Herby",    component: HomeScene,     index: HomeSceneId },
    { title: "Product",  component: ProductScene,  index: ProductSceneId },
    { title: "Retailer", component: RetailerScene, index: RetailerSceneId },
    { title: "Producer", component: ProducerScene, index: ProducerSceneId },
    { title: "Activity", component: ActivityScene, index: ActivitySceneId },
    { title: "Profile",  component: ProfileScene, index: ProfileSceneId },
];

class HomeTab extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps,nextState) {
        if (nextProps.tabId != HomeTabId) {
            return false;
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {
        var sceneId = nextProps.sceneId;
        if (nextProps.tabId != HomeTabId) {
            return;
        }
        // Check if need to reset tab.
        if (sceneId == HomeSceneId) {
            // reset scenes because going to first scene
            this.refs.navigator.popToTop();
            return;
        }
        // Otherwise it is a scene change.

        // If not found in existing push
        for(var i=0; i < TabScenes.length; i++) {
             if (TabScenes[i].index == sceneId) {
                // BatsFix. Currently push scenes as they come along
                // Later probably need to throttle that
                var currentScene = Object.assign({}, TabScenes[i]);
                currentScene.item = nextProps.item;
                this.refs.navigator.push(currentScene);
                break;
             }
        }
    }

    renderScene(route, navigator) {
        return (
            <View style={{flex:1}}>
                <route.component tabId={HomeTabId} navigator={navigator} item={route.item}/>
            </View>
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
                initialRoute = {TabScenes[HomeIndex]}
                item={this.props.item}
                />
        );
    }
}

function mapStateToProps(state) { 
    return { 
        tabId: state.NavigationReducer.tabId,
        sceneId: state.NavigationReducer.sceneId, 
        switchScene: state.NavigationReducer.switchScene, 
        item:state.NavigationReducer.item } }
module.exports = connect(mapStateToProps)(HomeTab);
