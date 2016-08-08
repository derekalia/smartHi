//
// Description: testscene.js
// Used for testing various UI components
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator, TouchableHighlight,} from 'react-native'

import Camera from 'react-native-camera';

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
        console.log("camera type is "+ this.state.cameraType);
    }

    render() {
        return (
            <Camera
                ref="cam"
                style={Styles.container}
                onBarCodeRead={this._onBarCodeRead}>
                    <View style={{marginTop:440,flexDirection:'row'}}>
                        <TouchableHighlight onPress={()=> this._takePictureBack()}
                            style={[{height:32,width:100},Styles.cameraButton]}>
                            <Text style={{fontSize:16,textAlign:'center'}}>Back Pic</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=> this._takePictureFront()} style={[{height:32,width:100},Styles.cameraButton]}>
                            <Text>Front Pic</Text>
                        </TouchableHighlight>
                    </View>
            </Camera>
        );
    }

    _onBarCodeRead(e) {
        console.log(e);
    }

    _submit() {
    }

    _takePictureFront() {
        this.refs.cam.capture(function(err, data) {
            console.log(err, data);
        });
    }

    _takePictureBack() {
        this.refs.cam.capture(function(err, data) {
            console.log(err, data);
        });
    }
}

module.exports = CameraScene;
