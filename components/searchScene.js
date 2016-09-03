//
// Description: searchscene.js
//

import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, ListView, TouchableOpacity, Navigator } from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import SearchBar             from './searchBar.js';
import SearchCategory        from './searchCategory.js';

import ProductFrame          from './productFrame.js';
import RetailerFrame         from './retailerFrame.js';
import MapFrame              from './mapFrame.js';
import UserFrame             from './userFrame.js';

import {StartSearchAction, GetProductAction}   from '../actions';

import {ProductFrameId, MapFrameId, UserFrameId, RetailerFrameId, }   from '../common/const.js';


const ProductId = 0;
const MapId = 1;
const UserId = 2;
const RetailerId = 3;

const SearchFrames = [
    //
    // BatsFix. Not sure what to do with all results frame. Is it going to list all of the items
    // by products, retailers, producers??
    { component: ProductFrame, index: ProductFrameId },
    { component: MapFrame, index: MapFrameId },
    { component: UserFrame, index: UserFrameId },
    { component: RetailerFrame, index: RetailerFrameId },
];


class SearchScene extends Component {
    constructor(props) {
        super(props);
        this._searchTerm = "";
        this._attributes = [];
        this.state = { frameId: this.props.frameId };
        //
        // BatsFix. Fix this so any frame can be set here.
        //
        if (this.props.frameId == MapFrameId) {
            this._initialFrame = MapId;
        }
        else {
            this._initialFrame = ProductId;
        }
    }

    componentWillReceiveProps(nextProps) {
        frameId = nextProps.frameId;
        if (frameId != this.state.frameId) {
            this._setFrame(frameId);
        }
    }

    renderScene(route, navigator) {
        // BatsFix.
        // to pass a prop to the component, that prop
        // first needs to be passed to the navigator object.
        return (
            <ScrollView style={{marginTop:110,}}>
                <View>
                    <route.component addRemoveFilter={navigator.props.addRemoveFilter}/>

                    <View style={{ marginHorizontal: 10 }}>

                        <View style={[{ flex: 1, alignItems: 'flex-start',marginBottom:10,marginTop:10}]}>
                                <Text style={{fontWeight:'bold',fontSize:16}}>Price</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 0 }}>

                        <View style={{flex:1}}>
                            <TouchableOpacity style={[{borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                <Text style={{margin: 6}}>Any</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1,left:-1}}>
                            <TouchableOpacity style={[{ borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                  <Text style={{margin: 6}}>$</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1,left:-3}}>
                            <TouchableOpacity style={[{ borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                <Text style={{ margin: 6}}>$$</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1,left:-4}}>
                            <TouchableOpacity style={[{ borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                <Text style={{ margin: 6}}>$$$</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1,left:-5}}>
                            <TouchableOpacity style={[{ borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                <Text style={{ margin: 6}}>$$$$</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1}}>
                        </View>
                            </View>

                      <View style={{backgroundColor:'#ECECEC',height:1,marginTop:25,marginBottom:0}}/>


                        <View style={[{ flex: 1, alignItems: 'flex-start',marginBottom:10,marginTop:20}]}>
                                <Text style={{fontWeight:'bold',fontSize:16}}>Distance</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginHorizontal: 0 }}>

                        <View style={{flex:1}}>
                            <TouchableOpacity style={[{borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                <Text style={{margin: 6}}>Any</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1,left:-1}}>
                            <TouchableOpacity style={[{ borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                  <Text style={{margin: 6}}>0.5 mi</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1,left:-3}}>
                            <TouchableOpacity style={[{ borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                <Text style={{ margin: 6}}>1 mi</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1,left:-4}}>
                            <TouchableOpacity style={[{ borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                <Text style={{ margin: 6}}>5 mi</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1,left:-5}}>
                            <TouchableOpacity style={[{ borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                <Text style={{ margin: 6}}>10 mi</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1}}>
                        </View>
                      </View>

                      <View style={{backgroundColor:'#ECECEC',height:1,marginTop:25,marginBottom:0}}/>


                                              <View style={[{ flex: 1, alignItems: 'flex-start',marginBottom:10,marginTop:20}]}>
                                                      <Text style={{fontWeight:'bold',fontSize:16}}>Rating at least</Text>
                                              </View>

                                              <View style={{ flexDirection: 'row', marginHorizontal: 0 }}>

                                              <View style={{flex:1}}>
                                                  <TouchableOpacity style={[{borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                                      <Text style={{margin: 6}}>Any</Text>
                                                  </TouchableOpacity>
                                              </View>

                                              <View style={{flex:1,left:-1}}>
                                                  <TouchableOpacity style={[{ borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                                          <Text style={{margin: 6}}>1 star</Text>
                                                  </TouchableOpacity>
                                              </View>

                                              <View style={{flex:1,left:-3}}>
                                                  <TouchableOpacity style={[{ borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                                      <Text style={{ margin: 6}}>2 star</Text>
                                                  </TouchableOpacity>
                                              </View>

                                              <View style={{flex:1,left:-4}}>
                                                  <TouchableOpacity style={[{ borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                                      <Text style={{ margin: 6}}>3 star</Text>
                                                  </TouchableOpacity>
                                              </View>

                                              <View style={{flex:1,left:-5}}>
                                                  <TouchableOpacity style={[{ borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                                      <Text style={{ margin: 6}}>4 star</Text>
                                                  </TouchableOpacity>
                                              </View>

                                              <View style={{flex:1}}>
                                              </View>
                                            </View>

                                            <View style={{backgroundColor:'#ECECEC',height:1,marginTop:25,marginBottom:0}}/>


                                                                    <View style={[{ flex: 1, alignItems: 'flex-start',marginBottom:10,marginTop:20}]}>
                                                                            <Text style={{fontWeight:'bold',fontSize:16}}>Hours</Text>
                                                                    </View>

                                                                    <View style={{ flexDirection: 'row', marginHorizontal: 0 }}>

                                                                    <View style={{flex:1}}>
                                                                        <TouchableOpacity style={[{borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                                                            <Text style={{margin: 6}}>Any</Text>
                                                                        </TouchableOpacity>
                                                                    </View>

                                                                    <View style={{flex:1,left:-1}}>
                                                                        <TouchableOpacity style={[{ borderWidth:1,borderColor:'black', flexDirection: "row", alignItems: 'center',justifyContent:'center',}]}>
                                                                              <Text style={{margin: 6}}>Open Now</Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View style={{flex:2 }}>
                                                                    </View>
                                                                  </View>

  </View>
  </View>
            </ScrollView>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    _setFrame(frameId) {
        this.setState({ frameId: frameId });
        if (frameId == ProductFrameId) {
            this.refs.navigator.jumpTo(SearchFrames[ProductId]);
        }
        else
            if (frameId == MapFrameId) {
                this.refs.navigator.jumpTo(SearchFrames[MapId]);
            }
            else
                if (frameId == UserFrameId) {
                    this.refs.navigator.jumpTo(SearchFrames[UserId]);
                }
                else
                    if (frameId == RetailerFrameId) {
                        this.refs.navigator.jumpTo(SearchFrames[RetailerId]);
                    }
    }

    _startSearch() {
        this.props.StartSearchAction(this._searchTerm, this._attributes, this.state.frameId);
    }

    _setSearchTerm(term) {
        this._searchTerm = term;
    }
    //
    // BatsFix. This is very hacky!!! it is only needed for products yet we
    // pass this prop to everyone.
    //
    _addRemoveFilter(filter) {
        console.log("filter added removed" + filter);
    }

    render() {
        return (
            <View style={[{height:1000,justifyContent:'flex-start'}]}>
                <Navigator
                    ref="navigator"
                    navigationBar={
                        <SearchBar frameId={this.state.frameId}
                            setSearchTerm={(t) => this._setSearchTerm(t) }
                            startSearch={() => this._startSearch() } />
                    }
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                    initialRoute = {SearchFrames[this._initialFrame]}
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
function mapStateToProps(state) { return { frameId: state.NavigationReducer.frameId } }

//
// Connect StartSearchAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ StartSearchAction }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(SearchScene);
