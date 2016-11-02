//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component, PropTypes } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator, TouchableHighlight,requireNativeComponent, NativeModules, DeviceEventEmitter} from 'react-native'
//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Camera from 'react-native-camera';


import {HerbyBar}         from '../../../common/controls.js';
import {UploadProductImageAction,GetRateQueueAction} from '../../../actions';


var Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
    cameraButton: {
        margin: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#4A90E2",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

class CameraScene extends Component {
    constructor(props) {
        super(props);
        this.state  = {cameraType: Camera.constants.Type.back};
        this._isFrontTaken = false;
        this._isBackTaken  = true;
    }

    _goRateQueue() {
        this.props.GetRateQueueAction();
    }

    render() {
        return (
        <View style={{flex:1}}>
            {/* <HerbyBar navigator={this.props.navigator} name="Camera"/> */}
            <Camera
                ref="cam"
                style={Styles.container}
                onBarCodeRead={this._onBarCodeRead}>
                    <View>
                    <View>
                    <View style={{ flex: 1, flexDirection: "row", alignSelf:'flex-start',top:-270,justifyContent:'flex-start',marginHorizontal:-15}}>
                      <View style={{ flex: 1, flexDirection: "row", alignItems: 'center',justifyContent:'flex-start' }}>
                        {/* <TouchableOpacity style={{flexDirection: "row",alignItems:'center'}}>
                            <Image  source={require("../../../media/BackArrowWhite1.png") } style={{ width: 12, height: 19 }} />
                            <Text style={{ fontSize: 18, color: "white" }}> Back </Text>
                        </TouchableOpacity> */}
                      </View>
                        <TouchableOpacity onPress={()=>this._goRateQueue()} style={{flexDirection: "row",alignItems:'center',padding:8,marginHorizontal:10,backgroundColor:"#50E3C2",borderRadius:5}}>
                            <Text style={{ fontSize: 18, color: "white" }}> Rate Queue </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{flex:1,flexDirection:'row',top:220}}>
                        {/* <TouchableHighlight onPress={()=> this._takePictureBack()}
                            style={[{height:32,width:100},Styles.cameraButton]}>
                            <Text style={{fontSize:16,textAlign:'center'}}>Back Pic</Text>
                        </TouchableHighlight> */}
                        <TouchableHighlight onPress={()=> this._takePictureFront()} style={{alignItems:'center',justifyContent:'center',padding:10,borderRadius:5,paddingLeft:30,paddingRight:30}}>
                            <Text style={{color:'white',fontSize:18}}>RECEIPT</Text>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={()=> this._takePictureFront()} style={{alignItems:'center',justifyContent:'center',padding:10,backgroundColor:"#15B4F1",borderRadius:5,marginLeft:43,paddingLeft:30,paddingRight:30}}>
                            <Text style={{color:'white',fontSize:18,}}>BARCODE</Text>
                        </TouchableHighlight>
                    </View>

                    </View>
            </Camera>
        </View>
        );
    }

    _onBarCodeRead(e) {
        console.log(e);
    }

    _onComplete() {
        // upload the pictures
        this._isFrontTaken = false;
        // this._isBackTaken  = false;
        // upload Action.
        this.props.UploadProductImageAction();
    }
    //BatsFix. on real device cam.capture should be used!
    _takePictureFront() {
        //this.refs.cam.capture(function(err, data) {
            this._isFrontTaken = true;
            if (this._isFrontTaken == true && this._isBackTaken == true) {
                //BatsFix go to next step.
                this._onComplete();
            }
        //});
    }

    _takePictureBack() {
        //this.refs.cam.capture(function(err, data) {
            this._isBackTaken = true;
            if (this._isFrontTaken == true  && this._isBackTaken == true) {
                //BatsFix go to next step
                this._onComplete();
            }
        //});
    }
}

//
// Connect UploadProductImageAction
//
function mapActionToProps(dispatch) { return bindActionCreators({GetRateQueueAction, UploadProductImageAction }, dispatch); }
module.exports = connect(null,mapActionToProps)(CameraScene);
