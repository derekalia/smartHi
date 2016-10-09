//
// Description: reviewStartScene.js
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator, TouchableHighlight,} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import {ConfirmProductInfoAction} from '../../../actions';
import {HerbyButton2,HerbyBar} from '../../../common/controls.js';
import ProductList from '../../util/productList.js';

class RateQueueScene extends Component {
    constructor(props) {
        super(props);
    }
    _rateProduct(t) {
        //Action here. 
        this.props.ConfirmProductInfoAction(t); 
    }
    render() {
        return (
            <View style={{flex:1}}>
                <HerbyBar navigator={this.props.navigator} name="Rate Queue"/>
                <ProductList productList={this.props.products} goProduct={(t)=>this._rateProduct(t)}/>
            </View>
        );
    }
}

//
// Connect user rate queue
//
function mapStateToProps(state) {
    return {
        products: state.UserReducer.rateQueue,
    }
}
//
// connect to GetRateQueueAction,GetCameraAction
//
function mapActionToProps(dispatch) { return bindActionCreators({ ConfirmProductInfoAction, }, dispatch); }
module.exports = connect(mapStateToProps, mapActionToProps)(RateQueueScene);
