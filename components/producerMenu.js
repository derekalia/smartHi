//components/producerMenu.js
import React, { Component } from 'react';
import {Dimensions,StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, TouchableHighlight, Navigator} from 'react-native';


//get internal components
import ProductList        from './productList.js';
import HerbySearchBar     from './herbySearchBar.js';

class ProducerMenu extends Component {
    _setFrame(t) {
        //BatsFix. use frame id to sort or search.
    }
    render() {
        return (
        <View>
            <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/>
            <HerbySearchBar entries={['ALL','FLOWER','CONCENTRATE','INFUSED','ONE','TWO','THREE']}/>
            <ProductList style={{ marginHorizontal: 10 }} productList={this.props.producer.products} goProduct={(id)=>this.props.goProduct(id)}/>
        </View>
        );
    };
}
module.exports = ProducerMenu;
