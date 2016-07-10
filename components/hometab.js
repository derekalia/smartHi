//components/loginpage.js
import React, { Component } from 'react';
import {StyleSheet,Text,View,ScrollView,Image,TextInput,TouchableOpacity,Navigator} from 'react-native';

//get internal components

import HomeScene     from './homescene.js';
import SearchScene   from './searchscene.js';
import ProductScene  from './productscene.js';
import ProductsScene from './productsscene.js';

/*
class ProductsScene extends Component {

    render() {
            return (
                <View style={Styles.container}>
                    <Text>Products Scene Placeholder</Text>
                </View>
            );
    }
}
*/
class ProducerScene extends Component {

    render() {
            return (
                <View style={Styles.container}>
                    <Text>Producer Scene Placeholder</Text>
                </View>
            );
    }
}
class ProducersScene extends Component {

    render() {
            return (
                <View style={Styles.container}>
                    <Text>Producers Scene Placeholder</Text>
                </View>
            );
    }
}
const HomeSceneIndex       = 0;
const SearchSceneIndex     = 1;
const ProductSceneIndex    = 2;
const ProducerSceneIndex   = 3;
const ProductsSceneIndex   = 4;
const ProducersSceneIndex  = 5;

var HomeTabScenes = [
    {title: "Herby",          component: HomeScene,     index: HomeSceneIndex},
    {title: "Search",         component: SearchScene,   index: SearchSceneIndex},
    {title: "Producer",       component: ProductScene,  index: ProductSceneIndex},
    {title: "Product",        component: ProducerScene, index: ProducerSceneIndex},
    {title: "Products",       component: ProductsScene, index: ProductsSceneIndex},
    {title: "Producers",      component: ProducersScene,index: ProducersSceneIndex},
];

var HomeTabRouteMapper = {
    LeftButton: function(route, navigator, index, navState) {
        // BatsFix. Do something other than "Back" text

        if (index > 0) {
            return (
            <View style={{flex:1,marginTop:0,flexDirection:"row",justifyContent: 'center',alignItems: 'center',marginLeft:13}}>
                <Image source={require("../media/BackArrow.png")} style={{width:12,height:19}} />
                <Text onPress={navigator.jumpBack} style={{fontSize:18,color:"#007AFF"}}> Back</Text>
            </View>
            );
        }
    },
    RightButton: function(route, navigator, index, navState) {
        // BatsFix. Do make sure to go to the next page if there is one
        var routelist = navigator.getCurrentRoutes();
        console.log("on route size "+routelist.length);
        console.log("on index "+index);
        if (routelist.length > index+1) {
            return (
                <Text onPress={navigator.jumpForward} style={{fontSize:18,marginTop:11,color:"#007AFF", marginRight:13}}>Forward</Text>
             );
        }
        else {
            return null;
        }

    },
    Title: function(route, navigator, index, navState) {
        return (
            <Text style={{fontSize:18,marginTop:11,fontWeight:'bold'}}>
                  {route.title}
            </Text>
        );
    }
}

class HomeTab extends Component {

    renderScene(route, navigator) {
        return (
            <route.component navigator={navigator}
                   searchScene={HomeTabScenes[SearchSceneIndex]}
                   producerScene={HomeTabScenes[ProducerSceneIndex]}
                   productScene={HomeTabScenes[ProductSceneIndex]}
                   productsScene={HomeTabScenes[ProductsSceneIndex]}/>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    render() {
        return (
            <Navigator
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                initialRoute = {HomeTabScenes[HomeSceneIndex]}
                navigationBar={

                    <Navigator.NavigationBar style={{flex:1,alignSelf:"center",justifyContent:"center",backgroundColor:"rgba(248,248,248,1)",borderWidth:1,borderColor:"#B2B2B2"}}
                        routeMapper = {HomeTabRouteMapper}
                    >

                    </Navigator.NavigationBar>

                }
            />
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    buttonLarge: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: '#8888ff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    buttonSmall: {
        flex: 1,
        marginHorizontal: 3,
        borderRadius: 20,
        backgroundColor: '#8888ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 10,
        textAlign: 'center',
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#999999',
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },
});


module.exports = HomeTab;
