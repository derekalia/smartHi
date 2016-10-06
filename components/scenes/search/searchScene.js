//
// Description: searchscene.js
//

import React, { Component } from 'react';
import {TextInput,Image,StyleSheet, Text, View, ScrollView, ListView, TouchableOpacity, Navigator } from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import {HerbyBar,HerbyFrameBar} from '../../../common/controls.js';

import ProductFrame          from './productFrame.js';
import RetailerFrame         from './retailerFrame.js';
import MapFrame              from './mapFrame.js';
import UserFrame             from './userFrame.js';

import {StartSearchAction, GetProductAction}   from '../../../actions';

// Id for search view categories
export const MapSearch        = 'Maps';
export const ProductSearch    = 'Products';
export const RetailerSearch   = 'Retailers';
export const UserSearch       = 'Users';

const ProductId   = 0;
const MapId       = 1;
const UserId      = 2;
const RetailerId  = 3;

const SearchFrames = [
    { component: ProductFrame,  type: ProductSearch,  },
    { component: RetailerFrame, type: RetailerSearch  },
    { component: MapFrame,      type: MapSearch,      },
    { component: UserFrame,     type: UserSearch,     },
];


class SearchScene extends Component {
    constructor(props) {
        super(props);
        this._searchTerm = "";
        this._attributes = [];
        this.state = { frameId: ProductId };
    }

    renderScene(route, navigator) {
        return (
            <ScrollView style={{flex:1,}}>
                <route.component addRemoveFilter={navigator.props.addRemoveFilter}/>
            </ScrollView>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    _setFrame(frameId) {
        this.setState({ frameId: frameId });
        this.refs.navigator.jumpTo(SearchFrames[frameId]);
    }

    _startSearch() {
        this.props.StartSearchAction(this._searchTerm, this._attributes, SearchFrames[this.state.frameId].type );
    }

    _setSearchTerm(term) {
        this._searchTerm = term;
    }

    _addRemoveFilter(filter) {
        console.log("filter added removed" + filter);
    }

    render() {
        return (
            <View style={[{flex:1,marginTop:20,justifyContent:'flex-start'}]}>
                 <View style={{flexDirection: 'row',marginHorizontal:8}}>
                    <View style={[{ flex: 5,}]}>
                      <View style={{height: 34,borderWidth:3,borderColor:'#ECECEC',borderRadius:8,backgroundColor: '#ECECEC',}}>
                        <TextInput style={{marginHorizontal:10,height:28, fontSize:20, backgroundColor: '#ECECEC',}}
                                   autoCorrect={false} placeholder='Search' returnKeyType='next' onChangeText={(t)=> this._setSearchTerm(t)} clearButtonMode='always'/>
                      </View>
                    </View>
                    <TouchableOpacity style={{flex: .6,}} onPress={this.props.startSearch}>
                         <Image style={{ height: 32, width: 32,alignSelf:'center', }} source={require("../../../media/plusButton11.png") }/>
                    </TouchableOpacity>
                </View>
                <HerbyFrameBar entries={['PRODUCTS','STORES','MAPS','USERS']} setFrame={(t)=>this._setFrame(t)}/>
                <Navigator
                    ref="navigator"
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                    initialRoute = {SearchFrames[ProductId]}
                    initialRouteStack = {SearchFrames}
                    addRemoveFilter={(t) => this._addRemoveFilter(t) }
                    />
            </View>
        );
    }
}

//
// Connect state.NavigationReducer.frameId props
//
//function mapStateToProps(state) { return { productList: state.SearchReducer.product } }

//
// Connect StartSearchAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ StartSearchAction }, dispatch); }

module.exports = connect(null, mapActionToProps)(SearchScene);
