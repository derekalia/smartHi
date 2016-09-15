//
// Description: productFrame.js
// Used for searching and listing products 
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import RetailerList   from './retailerList.js';
import {GetRetailerAction}   from '../actions';
import {HerbyMulti} from '../common/controls.js';


class RetailerFrame extends Component {
    constructor(props) {
        super(props);
    }

    _goRetailer(retailerId) {
        //
        // Go to product page
        //
       this.props.GetRetailerAction(retailerId);
    }


    render() {
        return(
        <View style={{backgroundColor:'white',flex:1,flex:1}}>
            <HerbyMulti items={['Any','$','$$','$$$','$$$$']} label='Price'/>
            <View style={{flex:1,margin:5,borderBottomColor:'#DEDEDE',borderBottomWidth:2}}/>
            <HerbyMulti items={['Any','0.5 mi','1 mi','5 mi','10 mi']} label='Distance'/>
            <View style={{flex:1,margin:5,borderBottomColor:'#DEDEDE',borderBottomWidth:2}}/>
            <HerbyMulti items={['Any','1 star','2 stars','3 stars','4 stars']} label='Rating at least'/>
            <View style={{flex:1,margin:5,borderBottomColor:'#DEDEDE',borderBottomWidth:2}}/>
            <HerbyMulti items={['Any','Open Now']} label='Hours'/>
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
