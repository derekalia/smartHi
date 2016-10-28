//
// Description: productFrame.js
// Used for searching and listing products
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import RetailerList   from '../../util/retailerList.js';
import {GetRetailerAction}   from '../../../actions';
import {HerbyMulti} from '../../../common/controls.js';


class RetailerFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {showFilters:true};
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.hideFilters == true) {
            this.setState({showFilters:false});
        }
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
            <View style={{flex:1,margin:5,borderBottomColor:'#DEDEDE',borderBottomWidth:1,marginHorizontal:10,}}/>
            <HerbyMulti items={['Any','Open Now']} label='Hours'/>
            <View style={{flex:1,margin:5,borderBottomColor:'#DEDEDE',borderBottomWidth:0,marginHorizontal:10,}}/>
            </View>
            );
        }
        return null;
    }
    render() {
        return(
          <View style={{backgroundColor:'#ECECEC',borderWidth:0,borderColor:'black'}}>

          <View style={{borderRadius:2,top:6,marginHorizontal:6,backgroundColor:'white',}}>

          <View style={{flexDirection:'row', justifyContent: 'space-between',alignItems:'center',}}>
            <TouchableOpacity onPress={()=> this._switchFiltering()} style={{alignSelf:'center'}}>
                <View style={{height:40,margin:10,width:150,backgroundColor:'white',borderColor: '#9b9b9b',borderWidth:1, borderRadius:22,justifyContent:'center'}}>
                    <Text style={{fontSize:14,color:'#9b9b9b',alignSelf:'center'}}>
                        {this.state.showFilters?'Hide Filters':'Show Filters'}
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this._switchFiltering()} style={{alignSelf:'center',marginRight:0}}>
                <View style={{height:40,width:150,margin:10,backgroundColor:'white',borderColor: '#9b9b9b',borderWidth:1, borderRadius:22,justifyContent:'center'}}>
                    <Text style={{fontSize:14,color:'#9b9b9b',alignSelf:'center'}}>
                        {this.state.showFilters?'Apply Filters':'Clear Filters'}
                    </Text>
                </View>
            </TouchableOpacity>
          </View>
            <View  style={{backgroundColor:'white'}}>
              {this._renderFilters()}
            </View>
          </View>

          <View style={{height:10}}/>

            <View style={{marginHorizontal:6,backgroundColor:'white'}}>
              <ScrollView style={{backgroundColor:'white',borderRadius:2,}}>
                  {/* <View style={{flex:1,margin:5,borderBottomColor:'#DEDEDE',borderBottomWidth:1,marginHorizontal:10}}/> */}
                  {/*Search results section*/}
                  <RetailerList retailerList={this.props.retailerList} goRetailer={(id)=> this._goRetailer(id)}/>
                  {/* <View style={{height:200}}/> */}
              </ScrollView>
            </View>

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
