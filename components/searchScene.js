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
        this.state = {
            attributes: [],
        }
    }

    _startSearch() {
        this.props.StartSearchAction(this._searchTerm);
    }

    _setSearchTerm(term) {
        this._searchTerm = term;
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
                    <FilterList productCount={this.props.products.length}/>
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
