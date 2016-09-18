//
// Description: productFrame.js
// Used for searching and listing products
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import RetailerList   from './retailerList.js';
import {GetRetailerAction}   from '../actions';
import {HerbyMulti} from '../common/controls.js';


class RetailerFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {showFilters:true};
    }

    _goRetailer(retailerId) {
        //
        // Go to product page
        //
       this.props.GetRetailerAction(retailerId);
    }
    _switchFiltering() {
        this.setState({showFilters:!this.state.showFilters});
    }
    _renderFilters() {
        if (this.state.showFilters) {
            return (
            <View>
            <HerbyMulti items={['Any','$','$$','$$$','$$$$']} label='Price'/>
            <View style={{flex:1,margin:5,borderBottomColor:'#DEDEDE',borderBottomWidth:1,marginHorizontal:10}}/>
            <HerbyMulti items={['Any','0.5 mi','1 mi','5 mi','10 mi']} label='Distance'/>
            <View style={{flex:1,margin:5,borderBottomColor:'#DEDEDE',borderBottomWidth:1,marginHorizontal:10}}/>
            <HerbyMulti items={['Any','1 star','2 stars','3 stars','4 stars']} label='Rating at least'/>
            <View style={{flex:1,margin:5,borderBottomColor:'#DEDEDE',borderBottomWidth:1,marginHorizontal:10}}/>
            <HerbyMulti items={['Any','Open Now']} label='Hours'/>
            </View>
            );
        }
        return null;
    }
    render() {
        return(
        <View style={{backgroundColor:'white',flex:1}}>
          <View style={{flexDirection:'row', justifyContent: 'space-between',alignItems:'center',marginTop:10}}>
            <TouchableOpacity onPress={()=> this._switchFiltering()} style={{alignSelf:'center',marginLeft:10}}>
                <View style={{height:40,margin:10,width:150,backgroundColor:'white',borderColor: '#9b9b9b',borderWidth:1, borderRadius:22,justifyContent:'center'}}>
                    <Text style={{fontSize:14,color:'#9b9b9b',alignSelf:'center'}}>
                        {this.state.showFilters?'Hide Filters':'Show Filters'}
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this._switchFiltering()} style={{alignSelf:'center',marginRight:10}}>
                <View style={{height:40,width:150,margin:10,backgroundColor:'white',borderColor: '#9b9b9b',borderWidth:1, borderRadius:22,justifyContent:'center'}}>
                    <Text style={{fontSize:14,color:'#9b9b9b',alignSelf:'center'}}>
                        {this.state.showFilters?'Apply Filters':'Clear Filters'}
                    </Text>
                </View>
            </TouchableOpacity>
            </View>
            {this._renderFilters()}
            {/*Search results section*/}
            <RetailerList retailers={this.props.retailerList} goRetailer={(id)=> this._goRetailer(id)}/>
        </View>
        );
    }
}

//
// Connect state.SearchReducer.retailers  to props
//
function mapStateToProps(state) {
    return {
        retailerList: state.SearchReducer.retailers,
    }
}

//
// Connect GetRetailerAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetRetailerAction }, dispatch); }

module.exports = connect(mapStateToProps,mapActionToProps)(RetailerFrame);
