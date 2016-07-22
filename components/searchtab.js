//components/loginpage.js
import React, { Component } from 'react';
import {StyleSheet,Text,View,ScrollView,Image,TextInput,TouchableOpacity,Navigator} from 'react-native';

//get internal components
import {connect} from 'react-redux';


//get internal components
import Styles         from './styles.js';

import SearchScene    from './searchscene.js';
import ProductScene   from './productscene.js';
import ProducerScene  from './producerscene.js';

const SearchSceneIndex     = 'SearchScene';
const ProductSceneIndex    = 'ProductScene';
const ProducerSceneIndex   = 'ProducerScene';

var SearchTabScenes = [
    {title: "Search",         component: SearchScene,    index: SearchSceneIndex},
    {title: "Producer",       component: ProductScene,   index: ProductSceneIndex},
    {title: "Product",        component: ProducerScene,  index: ProducerSceneIndex},
];

var SearchTabRouteMapper = {
    LeftButton: function (route, navigator, index, navState) {
        // BatsFix. Do something other than "Back" text

        if (index > 0) {
            return (
                <View style={{ flex: 1, marginTop: 0, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginLeft: 13 }}>
                    <Image source={require("../media/BackArrow.png") } style={{ width: 12, height: 19 }} />
                    <Text onPress={navigator.jumpBack} style={{ fontSize: 18, color: "#007AFF" }}> Back</Text>
                </View>
            );
        }
    },
    RightButton: function (route, navigator, index, navState) {
        // BatsFix. Do make sure to go to the next page if there is one
        var routelist = navigator.getCurrentRoutes();
        if (routelist.length > index + 1) {
            return (
                <Text onPress={navigator.jumpForward} style={{ fontSize: 18, marginTop: 11, color: "#007AFF", marginRight: 13 }}>Forward</Text>
            );
        }
        else {
            return null;
        }

    },
    Title: function (route, navigator, index, navState) {
        return (
            <Text style={{ fontSize: 18, marginTop: 11, fontWeight: 'bold' }}>
                {route.title}
            </Text>
        );
    }
}

class SearchTab extends Component {

    componentWillReceiveProps(nextProps) {
        //
        console.log("searchtab being called here now "+nextProps.sceneName);
        sceneName = nextProps.sceneName;
        // first try to find the scene in the current route list
        var foundExisting = false;
        var routelist = this.refs.navigator.getCurrentRoutes();
        for (var i=0; i < routelist.length; i++) {
            if (routelist[i].index == sceneName) {
                this.refs.navigator.jumpTo(routelist[i]);
                foundExisting = true;
                break;
            }
        }
        if (foundExisting == false) {
            for (var i=0; i < SearchTabScenes.length; i++) {
                 if (SearchTabScenes[i].index == sceneName) {
                    this.refs.navigator.push(SearchTabScenes[i]);
                 }
            }
        }
    }
 
    renderScene(route, navigator) {
        return (
            <route.component navigator={navigator} 
                   searchScene={SearchTabScenes[0]} 
                   producerScene={SearchTabScenes[1]} 
                   productScene={SearchTabScenes[2]}/>
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
                        routeMapper = {SearchTabRouteMapper}
                    />
                }
            />
        );
    }
}

// BatsFix. This function is used to convert state to props passed to this component
// In this example, there is now prop called resetTab that contains state.NavigationReducer.resetTab section
function mapStateToProps(state) { return { sceneName: state.NavigationReducer.sceneName, switchScene: state.NavigationReducer.switchScene } }
module.exports = connect(mapStateToProps)(SearchTab);
