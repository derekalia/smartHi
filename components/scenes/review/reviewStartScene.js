//
// Description: reviewStartScene.js
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator, TouchableHighlight,} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import {GetCameraAction,GetRateQueueAction,} from '../../../actions';
import {HerbyButton2,HerbyBar} from '../../../common/controls.js';

class ReviewStartScene extends Component {
    constructor(props) {
        super(props);
    }
    _goRateQueue() {
        this.props.GetRateQueueAction();
    }
    _goCamera() {
        this.props.GetCameraAction();
    }

    render() {
        return (
            <View style={{flex:1}}>
                <HerbyBar name='Rate' navigator={this.props.navigator} forward='Rate Queue' forwardCallback={()=>this._goRateQueue()}/>
                <View style={{flex:1}}>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
                      <Text style={{fontWeight:'bold',fontSize:20,color:'black',}}>Take a picture of the receipt</Text>
                    </View>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
                        <Image source={require('../../../media/receipt.png') } style={{ height: 240, width: 300,justifyContent:'center',}}/>
                    </View>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
                    <TouchableOpacity style={{width:200,height:50,backgroundColor:'#A4DC10',borderRadius:40,justifyContent:'center'}} onPress={()=>this._goCamera()}>
                      <Text style={{alignSelf:'center',color:'white',fontSize:18}}>SCAN BARCODE</Text>
                    </TouchableOpacity>

                    </View>

                </View>
            </View>
        );
    }
}
//
// connect to GetRateQueueAction,GetCameraAction
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetRateQueueAction,GetCameraAction}, dispatch); }
module.exports = connect(null, mapActionToProps)(ReviewStartScene);
