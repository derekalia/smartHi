//
// Description: updateLicenseeScene.js
//

// Import modules
import React, { Component } from 'react';
import {Alert,TextInput, Modal,Dimensions,StyleSheet, View, Text, ScrollView, Image, Navigator, TouchableOpacity, Platform } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {UpdateRetailerAction,SwitchSceneAction,} from '../../../actions';
import {HerbyButton2,HerbyBar,} from '../../../common/controls.js';

class UpdateLicenseeScene extends Component {
    constructor(props) {
        super(props)
        this._defaultImage = require('../../../media/RosinXJ.png');
        this.state = {
            imageSource:this._defaultImage,
        }
        this._name = this.props.retailer.name,
        this._description = this.props.retailer.description;
    }

    _updateRetailer() {
        var sourceImage = null; 
        if (this.state.imageSource != this._defaultImage ) {
            sourceImage = this.state.imageSource;
        }
        var result = this.props.UpdateRetailerAction(this.id,this._name,this._description, sourceImage);
        Alert.alert("",result);
    }
    _setDescription(t) {
        this._description = t;
    }
    _setName(t) {
        this._name = t;
    }
    _showImagePicker() {
        var options = {
            title: 'Select retailer image',
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
            if (response.didCancel) {
            }
            else 
            if (response.error) {
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
        <View style={{flex:1}}>
            <HerbyBar navigator={this.props.navigator} name="Update Store"/>
            <View style={{backgroundColor:'white',marginTop:0,margin:10,}}>
                <Image source={this.state.imageSource} style={{ height: 190, width: 380,justifyContent:'center',alignItems:'center'}}/>
                <View style={{flexDirection:'row',marginTop:20,}}>
                    <Text>Title:</Text>
                    <TextInput style={{flex:1,backgroundColor:'#EDEDED'}} placeholder={this._name} onChangeText={(t)=>this._setName(t)}/>
                </View>
                <View style={{marginTop:20}}>
                    <Text>Description:</Text>
                    <TextInput style={{flex:1,height:200,backgroundColor:'#DEDEDE'}} placeholder={this._description} onChangeText={(t)=>this._setDescription(t)} multiline={true}/>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <HerbyButton2 name="Pick Image" onPress={()=>this._showImagePicker()}/>
                    <HerbyButton2 name="Update" onPress={()=>this._updateRetailer()}/>
                </View>
            </View>
        </View>
        );
    }
}

function mapStateToProps(state) { 
    return { 
        retailer: state.RetailerReducer.retailer, 
    } 
}


function mapActionToProps(dispatch) {
    return bindActionCreators({UpdateRetailerAction,},dispatch);
}

module.exports = connect(mapStateToProps, mapActionToProps)(UpdateLicenseeScene);
