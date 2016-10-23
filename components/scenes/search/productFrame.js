//
// Description: productFrame.js
// Used for searching and listing products
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView,TouchableOpacity, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import FilterList   from '../../util/filterList.js';
import ProductList   from '../../util/productList.js';
import {GetProductAction}   from '../../../actions';
import {HerbyMulti,HerbyRange} from '../../../common/controls.js';

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

        <View style={{flex:1,top:-20,backgroundColor:'#ECECEC',borderWidth:0,borderColor:'black'}}>

        <View style={{flexDirection:'row',top:5,borderRadius:2, justifyContent: 'space-between',alignItems:'center',marginHorizontal:6,backgroundColor:'white',}}>
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

        <View style={{height:10}}/>

          <View style={{marginHorizontal:6}}>
            <ScrollView style={{backgroundColor:'white',borderRadius:2,}}>
                {this._renderFilters()}
                {/* <View style={{flex:1,margin:5,borderBottomColor:'#DEDEDE',borderBottomWidth:1,marginHorizontal:10}}/> */}
                {/*Search results section*/}
                <ProductList productList={this.props.products} goProduct={(id)=> this._goProduct(id)}/>
                {/* <View style={{height:200}}/> */}
            </ScrollView>
          </View>
        </View>

        );
    }
    _renderFilters() {
        if (this.state.showFilters == false) {
            return null;
        }
        return (
        <View>
            <HerbyRange label="Price"/>

            <View style={{marginTop:5, marginBottom: 5,borderBottomColor:'#DEDEDE',borderBottomWidth:1,marginHorizontal:10}}/>

            <HerbyMulti items={['Any','0.5 mi','1 mi','5 mi','10 mi']} label='Distance'/>

            <View style={{marginTop:5, marginBottom: 5,borderBottomColor:'#DEDEDE',borderBottomWidth:1,marginHorizontal:10}}/>

            <HerbyMulti items={['Any','1 star','2 stars','3 stars','4 stars']} label='Rating at least'/>

            <View style={{marginTop:5, marginBottom: 5,borderBottomColor:'#DEDEDE',borderBottomWidth:1,marginHorizontal:10}}/>

            <HerbyRange label="THC"/>

            <View style={{marginTop:5, marginBottom: 5,borderBottomColor:'#DEDEDE',borderBottomWidth:1,marginHorizontal:10}}/>

            <HerbyRange label="CBD"/>

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
