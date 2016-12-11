//
// Description: profiletab.js
// This contains the declaration for the profile tab  of the app.
// It should only contain profile scenes navigation.
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, Navigator, Image,TouchableHighlight } from 'react-native';
import {connect} from 'react-redux';

/// Import const ids.
import {
    UpdateRetailerSceneId,
    UpdateProductSceneId,
    UpdateProducerSceneId,
    ProducerProfileSceneId,
    LicenseeLoginSceneId,
    ProfileTabId,
    ProfileSceneId,
    SettingsSceneId,
    RetailerProfileSceneId,
    ProductReviewSceneId,
    // Following are common scenes for all tabs. 
    ProductSceneId, 
    RetailerSceneId, 
    ProducerSceneId,
    MapSceneId,
} 
from '../common/const.js';

// Import internal modules
import ProfileScene         from './scenes/profile/profileScene.js';
import SettingsScene        from './scenes/settings/settingsScene.js';
import LicenseeLoginScene   from './scenes/licenseeLogin/licenseeLoginScene.js';
import RetailerProfileScene from './scenes/retailerProfile/retailerProfileScene.js';
import ProducerProfileScene from './scenes/producerProfile/producerProfileScene.js';
import UpdateProducerScene  from './scenes/updateProducer/updateProducerScene.js';
import UpdateProductScene   from './scenes/updateProduct/updateProductScene.js';
import UpdateRetailerScene  from './scenes/updateRetailer/updateRetailerScene.js';

// Common scenes
import ProductScene  from './scenes/product/productScene.js';
import RetailerScene from './scenes/retailer/retailerScene.js';
import ProducerScene from './scenes/producer/producerScene.js';
import MapScene      from './scenes/map/mapScene.js';
import ProductReviewScene from './scenes/productReview/productReviewScene.js';


import {HerbyBar}           from '../common/controls.js';

const TabScenes = [
    { title: "Profile",          component: ProfileScene,         index: ProfileSceneId },
    { title: "Settings",         component: SettingsScene,        index: SettingsSceneId },
    { title: "LicenseeLogin",    component: LicenseeLoginScene,   index: LicenseeLoginSceneId },
    { title: "Retailer Profile", component: RetailerProfileScene, index: RetailerProfileSceneId },
    { title: "Producer Profile", component: ProducerProfileScene, index: ProducerProfileSceneId },
    { title: "Update Product",   component: UpdateProductScene,   index: UpdateProductSceneId },
    { title: "Update Producer",  component: UpdateProducerScene,  index: UpdateProducerSceneId },
    { title: "Update Retailer",  component: UpdateRetailerScene,  index: UpdateRetailerSceneId },
    { title: "Product",          component: ProductScene,         index: ProductSceneId },
    { title: "Retailer",         component: RetailerScene,        index: RetailerSceneId },
    { title: "Producer",         component: ProducerScene,        index: ProducerSceneId },
    { title: "Map",              component: MapScene,             index: MapSceneId },
    { title: "Review",           component: ProductReviewScene,   index: ProductReviewSceneId },
];

class ProfileTab extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps,nextState) {
        if (nextProps.tabId != ProfileTabId) {
            return false;
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {
        var sceneId = nextProps.scene.sceneId;
        if (nextProps.tabId != ProfileTabId) {
            return;
        }
      
        // Check if need to reset tab.
        if (sceneId == ProfileSceneId && nextProps.itemId == null ) {
            // reset scenes.
            this.refs.navigator.popToTop();
            return;
        }
              
        for(var i=0; i < TabScenes.length; i++) {
             if (TabScenes[i].index == sceneId) {
                var currentScene = Object.assign({}, TabScenes[i]);
                currentScene.item = nextProps.item;
                currentScene.itemId = nextProps.itemId;
                if (sceneId == ProducerProfileSceneId || sceneId == RetailerProfileSceneId) {
                    this.refs.navigator.resetTo(currentScene);
                }
                else {
                    this.refs.navigator.push(currentScene);
                }
                break;
             }
        }
    }

    renderScene(route, navigator) {
        return (
            <route.component tabId={ProfileTabId} navigator={navigator} itemId={route.itemId} currentUser={navigator.props.currentUser}/>
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
                initialRoute = {TabScenes[0]}
                currentUser={this.props.user}
                />
        );
    }
}

function mapStateToProps(state) { 
    return { 
        tabId: state.NavigationReducer.tabId, 
        scene: state.NavigationReducer.profileTab, 
        item: state.NavigationReducer.profileTab.item, 
        itemId: state.NavigationReducer.profileTab.itemId, 
        user: state.UserReducer.profile 
    }
} 

module.exports = connect(mapStateToProps)(ProfileTab);
