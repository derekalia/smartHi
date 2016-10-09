//
// Description: searchtab.js
// This contains the declaration for the search tab  of the app
// It should only contain search tab scene navigation logic and nothing else.
//
import React, { Component } from 'react';
import {StyleSheet,Text,View,ScrollView,Image,TextInput,TouchableOpacity,Navigator} from 'react-native';
import {connect} from 'react-redux';

//get internal components
import {SearchSceneId, ProductSceneId, ProducerSceneId, RetailerSceneId, SearchTabId, }   from '../common/const.js';

import SearchScene    from './scenes/search/searchScene.js';

const SearchIndex     = 0;

var TabScenes = [
    {title: "Search",        component: SearchScene,   index: SearchSceneId},
];

class SearchTab extends Component {

    constructor(props) {
        super(props);
	}

    shouldComponentUpdate(nextProps,nextState) {
        if (nextProps.tabId != SearchTabId) {
            return false;
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {
        var sceneId = nextProps.scene.sceneId;

        if (nextProps.tabId != SearchTabId) {
            return;
        }

        if (SearchSceneId == sceneId) {
            // reset scenes.
            this.refs.navigator.popToTop();
            return;
        }
        // Otherwise it is a scene change.
        var sceneId = nextProps.sceneId;

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
                <route.component tabId={SearchTabId} navigator={navigator} item={route.item}/>
            </View>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    render() {
        return (
            <Navigator style={{}}
                ref="navigator"
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                initialRoute = {TabScenes[0]}
                item={this.props.item}
            />
        );
    }
}

//
// Connect state.NavigationReducer.sceneId to props
//
function mapStateToProps(state) { 
    return { 
        sceneId: state.NavigationReducer.searchTab, 
        item: state.NavigationReducer.searchTab.item 
    } 
}

module.exports = connect(mapStateToProps)(SearchTab);
