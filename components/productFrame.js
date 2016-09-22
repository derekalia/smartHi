//
// Description: productFrame.js
// Used for searching and listing products
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView,TouchableOpacity, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import FilterList   from './filterList.js';
import ProductList   from './productList.js';
import {GetProductAction}   from '../actions';
import {HerbyMulti} from '../common/controls.js';

class ProductFrame extends Component {

    constructor(props) {
        super(props);
        this._searchTerm = "";
        this._attributes = [];
        this.state = {showFilters:true};
    }

    _goProduct(productId) {
        //
        // Go to product page
        //
       this.props.GetProductAction(productId);
    }
    _switchFiltering() {
        this.setState({showFilters:!this.state.showFilters});
    }
    render() {
        return(
        <View style={{backgroundColor:'#ECECEC',flex:1,}}>
        <ScrollView style={{backgroundColor:'white'}}>
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
        <View style={{}}>
        <HerbyMulti items={['Any','$','$$','$$$','$$$$']} label='Price'/>
        <View style={{flex:1,margin:5,borderBottomColor:'#DEDEDE',borderBottomWidth:1,marginHorizontal:10}}/>
        <HerbyMulti items={['Any','0.5 mi','1 mi','5 mi','10 mi']} label='Distance'/>
        <View style={{flex:1,margin:5,borderBottomColor:'#DEDEDE',borderBottomWidth:1,marginHorizontal:10}}/>
        <HerbyMulti items={['Any','1 star','2 stars','3 stars','4 stars']} label='Rating at least'/>
        <View style={{flex:1,margin:5,borderBottomColor:'#DEDEDE',borderBottomWidth:1,marginHorizontal:10}}/>
            {/* <FilterList productCount={this.props.products.length} addRemoveFilter={this.props.addRemoveFilter}/> */}
            {/*Search results section*/}
            <ProductList productList={this.props.products} goProduct={(id)=> this._goProduct(id)}/>
            {/*Without trailing space scroll view is blocking some of the filters.*/}
            <View style={{height:200}}/>
        </View>
        </ScrollView>
        </View>
        );
    }
}

//
// Connect state.SearchReducer.products  to props
//
function mapStateToProps(state) {
    return {
        products: state.SearchReducer.products,
    }
}

//
// Connect StartSearchAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetProductAction }, dispatch); }

module.exports = connect(mapStateToProps,mapActionToProps)(ProductFrame);
