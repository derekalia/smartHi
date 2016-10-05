//
// Description: updateInfoModal.js
//

// Import modules
import React, { Component } from 'react';
import {Alert,TextInput, Modal,Dimensions,StyleSheet, View, Text, ScrollView, Image, Navigator, TouchableOpacity, Platform } from 'react-native';
import HerbyModal from './herbyModal.js';
import {HerbyButton2,HerbyInput} from '../../common/controls.js';
import ImagePicker from 'react-native-image-picker';

class UpdateInfoModal extends Component {
    //onClose and onImage required. 
    //show should be set to true to show.
    constructor(props) {
        super(props)
        this._defaultImage = require('../media/RosinXJ.png');
        this.state = {show:this.props.show,imageSource:this._defaultImage,title:this.props.title,description:this.props.description};
       
    }
    _show(value) {
        if (value == false) {
            this.props.onClose();
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({show:nextProps.show});
    }
    _updateInfo() {
        var sourceImage = null; 
        if (this.state.imageSource != this._defaultImage ) {
            sourceImage = this.state.imageSource;
        }
        this.props.onUpdate(this._title,this._description, sourceImage);
        this.props.onClose();
    }
    _setDescription(t) {
        this._description = t;
    }
    _setTitle(t) {
        this._title = t;
    }
    _showImagePicker() {
        var options = {
            title: 'Select Avatar',
            customButtons: [
            {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchImageLibrary(options,(response) => {
            var source = '';
            console.log('response was' + response);
            if (response.didCancel) {
                console.log('image picker was cancelled');
            }
            else 
            if (response.error) {
                console.log('there was error'+response.error);
            }
            else {
                if (Platform.OS === 'ios') {
                    source = {uri: response.uri.replace('file://',''),isStatic:true}
                }
                else {
                    source = { uri: response, isStatic:true}
                }
                this.setState({imageSource:source});
            }
        });
    }
    render() {
        return(
         <HerbyModal show={this.state.show} onClose={()=>this._show(false)}>
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'white',marginTop:200,borderWidth:1}}>
            <Image source={this.state.imageSource} style={{ height: 190, width: 380,justifyContent:'center',}}/>
            <HerbyInput name='Title' onChange={(t)=>this._setTitle(t)}/>
            <HerbyInput name='Desription'  onChange={(t)=>this._setDescription(t)} multiline={true}/>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <HerbyButton2 name="Update" onPress={()=>this._updateInfo()}/>
                <HerbyButton2 name="Cancel" onPress={()=>this._show(false)}/>
                <HerbyButton2 name="Image Upload" onPress={()=>this._showImagePicker()}/>
                </View>
            </View>
        </HerbyModal>
        );
    }
}
module.exports = UpdateInfoModal
