//
// Description: updateLicenseeScene.js
//

// Import modules
import React, { Component } from 'react';
import {MapView, Alert,TextInput, Modal,Dimensions,StyleSheet, View, Text, ScrollView, Image, Navigator, TouchableOpacity, Platform } from 'react-native';

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
        this.props.UpdateRetailerAction(this.id,this._name,this._description, sourceImage);
    }
    _setLocation() {
        //BatsFix. Not sure what to do here
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
            <HerbyBar navigator={this.props.navigator} name="Update Store" back="Back" forward="Done" forwardCallback={()=>this._updateRetailer()}/>
            <ScrollView style={{backgroundColor:'white',marginTop:0,marginBottom:50,flex:1,}}>
                <Image source={this.state.imageSource} style={{ height: 190, width: 380,justifyContent:'center'}}/>
                <TouchableOpacity onPress={()=>this._showImagePicker()} style={{marginTop:5,backgroundColor:'#468ee5',marginTop:10,height:30,width:150,borderRadius:30,justifyContent:'center',alignSelf:'center'}}>
                  <Text style={{color:'white',alignSelf:'center',fontSize:16,}}>
                    Pick Image
                  </Text>
                </TouchableOpacity>

                <View>
                    <View style={{marginHorizontal:6}}>

                      <View style={{flexDirection:'row',marginTop:20,alignItems:'center'}}>
                          <Text style={{fontSize:16,fontWeight:'bold'}}>Title</Text>
                      </View>

                      <View style={{flexDirection:'row',marginTop:10,alignItems:'center',borderWidth:1,borderColor:'grey',borderRadius:4}}>
                          <TextInput style={{marginLeft:3,color:"black",height:35,borderRadius:3,flex:1,backgroundColor:'white'}} placeholder={"Store Name"} onChangeText={(t)=>this._setName(t)}/>
                      </View>

                    </View>
                </View>

                <View style={{ marginHorizontal: 6}}>
                    <View style={{ height: 40, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Description</Text>
                    </View>
                    <View style={{ flexDirection: "row",borderColor: 'gray', borderWidth: 1, margin: 0, borderRadius: 4, }}>
                        <TextInput
                            style={{ height: 60, flex:1, margin: 4, fontSize: 16, }}
                            onChangeText={(text) => this._setDescription(text) }
                            placeholder={'Say something'}
                            numberOfLines = {4}
                            multiline = {true}
                        />
                    </View>
                </View>

                {/* <View style={{flexDirection:'row',marginTop:5,}}>
                    <Text>Title:</Text>
                    <TextInput style={{flex:1,backgroundColor:'#EDEDED'}} placeholder={this._name} onChangeText={(t)=>this._setName(t)}/>
                </View>
                <View style={{marginTop:5,}}>
                    <Text>Description:</Text>
                    <TextInput style={{flex:1,height:50,backgroundColor:'#DEDEDE'}} placeholder={this._description} onChangeText={(t)=>this._setDescription(t)} multiline={true}/>
                </View> */}
                <View style={{ marginHorizontal: 6}}>
                    <View style={{ height: 40, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Location</Text>
                    </View>
                    <MapView
                        style={{height:200,width:360,alignSelf:'center'}}
                        showsUserLocation={true}
                        region={{ latitude: 47.597713, longitude: -122.321777, latitudeDelta: 0.5, longitudeDelta: 0.5, }}
                        showsCompass = {true}
                        />
                        <TouchableOpacity onPress={()=>this._setLocation()} style={{marginTop:5,backgroundColor:'#468ee5',marginTop:10,height:30,width:150,borderRadius:30,justifyContent:'center',alignSelf:'center'}}>
                          <Text style={{color:'white',alignSelf:'center',fontSize:16,}}>
                            Set Location
                          </Text>
                        </TouchableOpacity>
                </View>

                <View style={{marginTop:20}}/>

            </ScrollView>
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
