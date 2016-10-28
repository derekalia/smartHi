//
// Description: retailerList.js
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'



import {GoSearchAction, GetProductAction} from '../../actions';
import ProductItem from './productItem.js';


class ProductList extends Component {
    constructor(props) {
        super(props);
    }
    // BatsFix. minHeight is needed to ensure product is visible
    render() {
        return (
              <View style={{minHeight:100,}}>
                {this._renderProducts()}
            </View>
        );
    }


    //
    // BatsFix. ListView is not painting on first entry. React-native bug?
    //
    _renderProducts() {
        var products = [];
        if (this.props.productList != null) {
            for (var i=0; i < this.props.productList.length; i++) {
                var product   = this.props.productList[i];
                if (product.product != null) {
                    product = this.props.productList[i].product;
                    product.price = this.props.productList[i].price;
                }
                var productId = product.id;
                products.push(
                    <ProductItem goProduct={(productId) => this.props.goProduct(productId)} product={product} key={productId}/>
                );
            }
        }
        return products;
    }

    /*
    _renderProductItem(product) {
        return (
            <ProductItem goProduct={(productId) => this.props.goProduct(productId)} product={product} key={product.id}/>
        )
    }

    _renderProducts() {
        if (this.props.productList != null && this.props.productList.length !== 0) {
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
    */
}

module.exports = ProductList;
