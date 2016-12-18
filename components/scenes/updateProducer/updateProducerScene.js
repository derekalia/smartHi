//
// Description: updateProducerScene.js
//

// Import modules
import React, { Component } from 'react';
import {Alert,TextInput, Modal,Dimensions,StyleSheet, View, Text, ScrollView, Image, Navigator, TouchableOpacity, Platform,TouchableHighlight } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {UpdateProducer} from '../../../actions';
import {HerbyButton2,HerbyBar,} from '../../../common/controls.js';

class UpdateProducerScene extends Component {
    constructor(props) {
        super(props)
        this._defaultImage = require('../../../media/RosinXJ.png');
        this.state = {
            imageSource:this._defaultImage,
        }
        this._mounted = false;
        this._name = this.props.producer.name,
        this._description = this.props.producer.description;

    }
    componentWillUnmount() {
        this._mounted = false;
    }
    componentDidMount() {
        this._mounted = true;
    }

    _updateProducer() {
        this.setState({loading:true});
        var producerData = {};
        producerData.id          = this.props.producer.id;
        producerData.name        = this._name;
        producerData.description = this._description;
        producerData.sourceImage  = this.state.imageSource;

        // BatsFix. Should this be getting back retailer properties from firebase?
        UpdateProducer(producerData,(error)=>{
            if (this._mounted) {
                if (error  == null) {
                    this.setState({loading:false,error:null});
                }
                else {
                    this.setState({loading:false,error:error});
                }
            }
        });
    }
    _setDescription(t) {
        this._description = t;
    }
    _setTitle(t) {
        this._title = t;
    }
    _showImagePicker() {
        var options = {
            title: 'Select producer image',
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
        <View>
            <HerbyBar navigator={this.props.navigator} name="Update Producer" back="Back" forward="Done" forwardCallback={()=>this._updateProducer()}/>
            <View style={{backgroundColor:'white',margin:10,marginTop:0}}>
                <Image source={this.state.imageSource} style={{ height: 190, width: 380,justifyContent:'center',alignItems:'center',alignSelf:'center'}}/>
                <TouchableHighlight onPress={()=>this._showImagePicker()} style={{marginTop:5,backgroundColor:'#468ee5',marginTop:10,height:30,width:150,borderRadius:8,justifyContent:'center',alignSelf:'center'}}>
                  <Text style={{color:'white',alignSelf:'center'}}>
                    Choose Image
                  </Text>
                </TouchableHighlight>

                <View style={{flexDirection:'row',marginTop:20,alignItems:'center'}}>
                    <Text style={{fontSize:16,fontWeight:'bold'}}>Title</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
                    <TextInput style={{color:"black",marginLeft:0,height:35,borderRadius:3,flex:1,backgroundColor:'white',borderWidth:1,borderColor:'lightgray'}} placeholder={"Enter title here"} onChangeText={(t)=>this._setTitle(t)}/>
                </View>
                <View style={{flexDirection:'row',marginTop:20,alignItems:'center'}}>
                    <Text style={{fontSize:16,fontWeight:'bold'}}>Description</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
                    <TextInput style={{color:"black",marginLeft:0,height:35,borderRadius:3,flex:1,backgroundColor:'white',borderWidth:1,borderColor:'lightgray',height:100}} placeholder={"Enter description here"} onChangeText={(t)=>this._setDescription(t)} multiline={true}/>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

                </View>
            </View>
        </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        producer: state.ProducerReducer.producer,
    }
}

module.exports = connect(mapStateToProps)(UpdateProducerScene);
