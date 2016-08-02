//
// Description: retailerList.js
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'



import {GoSearchAction, GetProductAction} from '../actions';
import ProductItem from './productItem.js';


class ProductList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                {this._renderProducts()}
            </View>
        );
    }

    _renderProductItem(product) {
        return (
            <ProductItem goProduct={(productId) => this.props.goProduct(productId)} product={product}/>
        )
    }

    _renderProducts() {
        if (this.props.productList.size !== 0) {
            var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1 != r2), });
            return (
                <ListView dataSource = {ds.cloneWithRows(this.props.productList) }
                    enableEmptySections = {true}
                    renderRow  = {this._renderProductItem.bind(this) }
                    />
            );
        }
        return null;
    }
}

module.exports = ProductList;
