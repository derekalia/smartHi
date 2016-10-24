//
// Description: searchscene.js
//

import React, { Component } from 'react';
import {Modal,TextInput,Image,StyleSheet, Text,Dimensions, View, ScrollView, ListView, TouchableOpacity, Navigator } from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import {ProductFrameId,RetailerFrameId,MapFrameId,UserFrameId} from '../../../common/const.js';
import {HerbyBar,HerbyFrameBar,HerbyButton2,} from '../../../common/controls.js';
import FilterList from '../../util/filterList.js';

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
    { component: ProductFrame,  type: ProductFrameId,  },
    { component: RetailerFrame, type: RetailerFrameId, },
    { component: MapFrame,      type: MapFrameId,      },
    { component: UserFrame,     type: UserFrameId,     },
];


class SearchScene extends Component {
    constructor(props) {
        super(props);
        this._searchTerm = "";
        this._attributes = [];
        this.state = { frameId: ProductId,showFiltersModal:false, showFilters:true };
    }

    renderScene(route, navigator) {
        return (
            <ScrollView style={{flex:1,}}>
                <route.component addRemoveFilter={navigator.props.addRemoveFilter} showFilters={navigator.showFilters}/>
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
        this.setState({showFilters:false});
        this.props.StartSearchAction(this._searchTerm, this._attributes, SearchFrames[this.state.frameId].type );
    }

    _setSearchTerm(term) {
        this._searchTerm = term;
    }

    _addRemoveFilter(filter) {
        console.log("filter added removed" + filter);
    }

    _showFiltersModal(value) {
        this.setState({showFiltersModal:value});
    }

    render() {
      var {width,height} = Dimensions.get('window');
      this.maxWidth = width;
      this.maxHeight = height;

      var modalHeight = this.maxHeight*0.8;
      var modalWidth  = this.maxWidth*0.95;

        return (
            <View style={[{flex:1,marginTop:20,justifyContent:'flex-start',backgroundColor: '#ECECEC'}]}>
                 <View style={{flexDirection: 'row',backgroundColor: 'white',paddingTop:6}}>
                    <View style={[{ flex: 4,marginHorizontal:10,}]}>
                      <View style={{height: 34,borderWidth:3,borderColor:'#ECECEC',borderRadius:8,backgroundColor: '#ECECEC',}}>
                        <TextInput style={{marginHorizontal:10,height:28, fontSize:16, backgroundColor: '#ECECEC',}}
                                   onEndEditing={()=>this._startSearch()}
                                   autoCorrect={false} placeholder='Search' returnKeyType='search' onChangeText={(t)=> this._setSearchTerm(t)} clearButtonMode='always'/>
                      </View>
                    </View>
                    <TouchableOpacity style={{flex: .6,}} onPress={()=>this._showFiltersModal(true)}>
                         <Image style={{ height: 32, width: 32,alignSelf:'flex-start', }} source={require("../../../media/plusButton11.png") }/>
                    </TouchableOpacity>
                </View>
                <HerbyFrameBar entries={['Products','Stores','Maps','Users']} setFrame={(t)=>this._setFrame(t)}/>
                <Navigator
                    ref="navigator"
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                    initialRoute = {SearchFrames[ProductId]}
                    initialRouteStack = {SearchFrames}
                    showFilters = {this.state.showFilters}
                    addRemoveFilter={(t) => this._addRemoveFilter(t) }
                    />

                {/* <Modal animationType={'slide'} transparent={true} visible={this.state.showFiltersModal}>
                    <View style={{flex:1,backgroundColor:'#FEFEFE',marginTop:20}}>
                        <HerbyButton2 name="Done" onPress={()=>this._showFiltersModal(false)}/>
                        <FilterList addRemoveFilter={(t)=>this._addRemoveFilter(t)}/>
                    </View>
                </Modal> */}

                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={this.state.showFiltersModal}
                    onRequestClose={() => {this._showFilters(false)}}>
                    <View style={{flex:1,backgroundColor:'lightgray',opacity:1}}>
                      <View style={{marginTop:66,
                                  alignSelf:'center',
                                  width:modalWidth,
                                  height: modalHeight,
                                  borderRadius:6,
                                  backgroundColor:'white',
                                  justifyContent:'center',
                                  alignItems:'center'
                                }}>
                        <View style={{width:300,alignItems:'center',height:50,borderBottomWidth:1, borderColor:'#DEDEDE',justifyContent:'center'}}>
                           <Text style={{fontSize:18,color:'black'}}>Select Tags</Text>
                        </View>

                        {/* <View style={{width:300,alignItems:'center',borderBottomWidth:1, borderColor:'#DEDEDE',height:1}}/> */}

                        <View style={{marginTop:0,padding:0,marginBottom:0,flex:1,}}>
                            <FilterList style={{flex:1}} productCount={1} addRemoveFilter={(t)=>this._addRemoveFilter(t)} noButton={true}/>
                        </View>
                        <View style={{marginTop:0,height:60,
                                      width:300,

                                      alignItems:'center',flexDirection:'row',justifyContent:'space-around',borderTopWidth:1, borderColor:'#DEDEDE'}}>

                            <TouchableOpacity onPress={()=>this._showFiltersModal(false)} style={{width:90,height:40,borderRadius:6,backgroundColor:'#DEDEDE',justifyContent:'center'}}>
                              <Text style={{alignSelf:'center',color:'white'}}>Done</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this._showFiltersModal(false)} style={{width:90,height:40,borderRadius:6,backgroundColor:'white',borderColor:'#DEDEDE',borderWidth:1,justifyContent:'center'}}>
                              <Text style={{alignSelf:'center',color:'#DEDEDE'}}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    </View>
                 </Modal>

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
