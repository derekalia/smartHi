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
    UpdateProcessorSceneId,
    ProcessorSceneId,
    ProfileTabId,
    ProfileSceneId,
    SettingsSceneId,
    LicenseeSceneId,
    LicenseeStoreSceneId,
    LicenseeProductSceneId,
    ProductReviewSceneId,} 
    from '../common/const.js';

// Import internal modules
import ProfileScene         from './profileScene.js';
import SettingsScene        from './settingsScene.js';
import LicenseeScene        from './licenseeScene.js';
import LicenseeStoreScene   from './licenseeStoreScene.js';
import LicenseeProductScene from './licenseeProductScene.js';
import ProductReviewScene   from './productReviewScene.js';
import ProcessorScene       from './processorScene.js';
import UpdateProcessorScene from './updateProcessorScene.js';
import UpdateProductScene   from './updateProductScene.js';
import UpdateLicenseeScene  from './updateLicenseeScene.js';

import {HerbyBar}           from '../common/controls.js';

// Import const ids.

const TabScenes = [
    { title: "Profile",          item:null, component: ProfileScene,         index: ProfileSceneId },
    { title: "Settings",         item:null, component: SettingsScene,        index: SettingsSceneId },
    { title: "Licensee",         item:null, component: LicenseeScene,        index: LicenseeSceneId },
    { title: "Store Info",       item:null, component: LicenseeStoreScene,   index: LicenseeStoreSceneId },
    { title: "Product Info",     item:null, component: LicenseeProductScene, index: LicenseeProductSceneId },
    { title: "Product Review",   item:null, component: ProductReviewScene,   index: ProductReviewSceneId },
    { title: "Processor",        item:null, component: ProcessorScene,       index: ProcessorSceneId },
    { title: "Update Product",   item:null, component: UpdateProductScene,   index: UpdateProductSceneId },
    { title: "Update Processor", item:null, component: UpdateProcessorScene, index: UpdateProcessorSceneId },
    { title: "Update Retailer",  item:null, component: UpdateLicenseeScene,  index: UpdateRetailerSceneId },
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
        var sceneId = nextProps.sceneId;

        if (nextProps.tabId != ProfileTabId) {
            return;
        }
      
        // Check if need to reset tab.
        if (sceneId == ProfileSceneId) {
            // reset scenes.
            this.refs.navigator.popToTop();
            return;
        }

        // Otherwise it is a scene change 
        // Check existing routes first
        var foundExisting = false;

        var routelist = this.refs.navigator.getCurrentRoutes();
        for (var i=0; i < routelist.length; i++) {
            if (routelist[i].index == sceneId) {
                routelist[i].item = nextProps.item;
                this.refs.navigator.jumpTo(routelist[i]);
                foundExisting = true;
                break;
            }
        }
        
        // If not found in existing push
        if (foundExisting == false) {
            for(var i=0; i < TabScenes.length; i++) {
                 if (TabScenes[i].index == sceneId) {
                    TabScenes[i].item = nextProps.item;
                    this.refs.navigator.push(TabScenes[i]);
                    break;
                 }
            }
        }
    }

    renderScene(route, navigator) {
        if (route.index == ProfileSceneId) {
            return (
                <route.component tabId={ProfileTabId} item={navigator.props.user}/>
            );
        }
        else {
            return (
                <View style={{flex:1}}>
                    <HerbyBar navigator={navigator}/>
                    <route.component tabId={ProfileTabId} item={route.item}/>
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
                initialRoute = {TabScenes[0]}
                user={this.props.user}
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
        item: state.NavigationReducer.item, 
        user: state.UserReducer.profile 
    }
} 

module.exports = connect(mapStateToProps)(ProfileTab);
