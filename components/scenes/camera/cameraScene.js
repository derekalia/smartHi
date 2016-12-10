//
// Description: cameraScene.js
//
import React, { Component, PropTypes } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity,requireNativeComponent, NativeModules, DeviceEventEmitter} from 'react-native'
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Camera from 'react-native-camera';

import {HerbyBar,HerbyButton2}           from '../../../common/controls.js';
import {GoRateQueueAction} from '../../../actions';

class CameraScene extends Component {
    constructor(props) {
        super(props);
    }

    _goRateQueue() {
        this.props.GoRateQueueAction();
    }

    render() {
        return (
        <Camera ref="cam" style={{flex:1}} onBarCodeRead={(e)=>this._onBarCodeRead(e)}>
        
        <View style={{flex:1,alignItems:'center',marginTop:20}}>
            <HerbyButton2 style={{width:128}} name="Rate Queue" onPress={()=>this._goRateQueue()}/>
        </View>
        <View style={{flex:5}}/>
        <View style={{flex:1,alignItems:'center',marginTop:20}}>
            <HerbyButton2 style={{width:128}} name="Scan" onPress={()=>this._goRateQueue()}/>
        </View>

        </Camera>
        );
    }

    _onBarCodeRead(e) {
        // Read bar code here
        console.log('_onBarCodeRead called');
        console.log(e);
    }
    
    _takePicture() {
        this.refs.cam.capture((err, data) => {
        // Upload picture here 
        console.log('_takePicture called');
        });
    }
}

//
// Connect GoRateQueueAction 
//
function mapActionToProps(dispatch) { return bindActionCreators({GoRateQueueAction}, dispatch); }
module.exports = connect(null,mapActionToProps)(CameraScene);
