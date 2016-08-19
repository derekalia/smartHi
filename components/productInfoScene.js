//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity,TouchableHighlight, Navigator} from 'react-native'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import {ConfirmProductInfoAction,} from '../actions';

class ProductInfoScene extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            lotNumber:'500 600 990 0193',
            retailer:'Uncle Ikes',
            producer:'Forged IO',
            name:'Somehash',
            price:'30',
        }
    }
    _goProductRate() {
        this.props.ConfirmProductInfoAction();
    }
    render() {
        return (
        <View>
        <View style={{backgroundColor:'#EFEFF4',height:600, marginTop:64}}>
            <View style={{marginTop:30}}>
                <Text style={{marginLeft:20,marginBottom:10}}>Product Info</Text>
                <View style={{backgroundColor:'white',borderTopWidth:1,borderTopColor:'#C8C8CC',borderBottomWidth:1,borderBottomColor:'#C8C8CC'}}>
                    <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                        <TouchableHighlight><Text>Lot Number</Text></TouchableHighlight>
                        <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                            <Text style={{color:'#C8C8CC'}}>{this.state.lotNumber}</Text>
                        </View>
                    </View>
                    <View style={{alignSelf:'flex-end',width:1,width:356,borderTopWidth:1,borderTopColor:'#C8C8CC'}}></View>
                    <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                        <TouchableHighlight><Text>Retailer</Text></TouchableHighlight>
                        <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                            <Text style={{color:'#C8C8CC'}}>{this.state.retailer}</Text>
                        </View>
                    </View>

                    <View style={{alignSelf:'flex-end',width:1,width:356,borderTopWidth:1,borderTopColor:'#C8C8CC'}}></View>
                    <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                        <TouchableHighlight><Text>Producer</Text></TouchableHighlight>
                        <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                            <Text style={{color:'#C8C8CC'}}>{this.state.producer}</Text>
                        </View>
                    </View>
                    <View style={{alignSelf:'flex-end',width:1,width:356,borderTopWidth:1,borderTopColor:'#C8C8CC'}}></View>

                    <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                        <TouchableHighlight><Text>Product</Text></TouchableHighlight>
                        <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                            <Text style={{color:'#C8C8CC'}}>{this.state.name}</Text>
                        </View>
                    </View>
                    <View style={{alignSelf:'flex-end',width:1,width:356,borderTopWidth:1,borderTopColor:'#C8C8CC'}}></View>

                    <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                        <TouchableHighlight><Text>Price</Text></TouchableHighlight>
                        <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                            <Text style={{color:'#C8C8CC'}}>{this.state.price}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{justifyContent:'flex-end', alignItems:'flex-end', marginRight:10}} onPress={()=>this._goProductRate()}>
                    <View style={{marginLeft:20,marginTop:10,marginBottom:10,flexDirection:'row',height:26,alignItems:'center'}}>
                        <TouchableHighlight><Text>Next</Text></TouchableHighlight>
                        <View style={{alignItems:'flex-end',flex:1,marginRight:20}}>
                            <Image source={require('../media/ForwardArrow2.png') } style={{ width: 8, height: 14,alignItems:'flex-end' }}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        </View>
        );
    }
}

// BatsFix. This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        product: state.ReviewReducer.product,
    }
}
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called GetRetailerAction.
//
function mapActionToProps(dispatch) { return bindActionCreators({ ConfirmProductInfoAction, }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(ProductInfoScene);
