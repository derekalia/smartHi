//
// Description: reviewStartScene.js
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator, TouchableHighlight,} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import {GetRateQueue,GoRateProductAction} from '../../../actions';
import {HerbyLoading,HerbyButton2,HerbyBar} from '../../../common/controls.js';
import ProductList from '../../util/productList.js';

class RateQueueScene extends Component {
    constructor(props) {
        super(props);
        this.state = {loading:false,message:null,products:this.props.products};
    }

    _rateProduct(productId) {
        //Action here. 
        this.props.GoRateProductAction(productId);
    }

    render() {
        if (this.state.loading || this.state.message != null) {
            return (<HerbyLoading showBusy={this.state.loading} message={this.state.message}/>);
        }
        console.log('currently reviewProducts');
        console.log(this.props.products);
        return (
            <View style={{flex:1}}>
                <HerbyBar navigator={this.props.navigator} name="Rate Queue"/>
                <ScrollView>
                <ProductList productList={this.state.products} goProduct={(t)=>this._rateProduct(t)}/>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) { 
    return { 
        products: state.UserReducer.profile.reviewProducts 
    } 
}

//
// connect to GoRateProductAction
//
function mapActionToProps(dispatch) { return bindActionCreators({ GoRateProductAction, }, dispatch); }
module.exports = connect(mapStateToProps, mapActionToProps)(RateQueueScene);
