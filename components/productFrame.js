//
// Description: productFrame.js
// Used for searching and listing products
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import FilterList   from './filterList.js';
import ProductList   from './productList.js';
import {GetProductAction}   from '../actions';

class ProductFrame extends Component {

    constructor(props) {
        super(props);
        this._searchTerm = "";
        this._attributes = [];
    }

    _goProduct(productId) {
        //
        // Go to product page
        //
       this.props.GetProductAction(productId);
    }

    render() {
        return(
          <View style={{backgroundColor:'#ECECEC',flex:1,}}>
        <ScrollView style={{backgroundColor:'white'}}>        
        <View style={{}}>
            <FilterList productCount={this.props.products.length} addRemoveFilter={this.props.addRemoveFilter}/>
            {/*Search results section*/}
            <ProductList productList={this.props.products} goProduct={(id)=> this._goProduct(id)}/>
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
