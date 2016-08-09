//
// Description: searchscene.js
//

import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, ListView } from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import ProductItem           from './productItem.js';
import SearchBar             from './searchBar.js';
import FilterList            from './filterList.js';
import ProductList           from './productList.js';
import {StartSearchAction,GetProductAction}   from '../actions';

class SearchScene extends Component {
    constructor(props) {
        super(props);
        this._searchTerm = "";
        this._attributes = [];
    }

    _startSearch() {
        this.props.StartSearchAction(this._searchTerm, this._attributes);
    }

    _setSearchTerm(term) {
        this._searchTerm = term;
    }

    //
    // BatsFix. For now keeping filters string only for simplicity
    //
    _addFilter(filter) {
        var index = this._attributes.indexOf(filter);
        if (index < 0) {
            this._attributes.push(filter);
        }
    }

    _removeFilter(filter) {
        var index = this._attributes.indexOf(filter);
        if (index >= 0) {
            this._attributes.splice(index, 1);
        }
    }

    _goProduct(productId) {
        //
        // Go to product page
        //
       this.props.GetProductAction(productId);
    }

    render() {
        return (
            <View style={[{ marginTop: 50, flex: 1,marginHorizontal:5,}]}>
                <SearchBar startSearch={()=>this._startSearch()} setSearchTerm={(t)=>this._setSearchTerm(t)}/>
                <ScrollView style={{marginTop: 0,}}>
                <View style={{}}>
                    <FilterList productCount={this.props.products.length} addFilter={(t)=>this._addFilter(t)} removeFilter={(t)=>this._removeFilter}/>
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
function mapActionToProps(dispatch) { return bindActionCreators({ StartSearchAction,GetProductAction }, dispatch); }

module.exports = connect(mapStateToProps,mapActionToProps)(SearchScene);
