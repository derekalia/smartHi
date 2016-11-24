//
// Description: changeNameModal.js
//
import React, { Component } from 'react';
import {Alert,StyleSheet, Text, View, Image, TextInput} from 'react-native'

import {HerbyButton,HerbyButton2,HerbyHeader,HerbyInput} from '../../../common/controls.js';
import HerbyModal from '../../util/herbyModal.js';


class ChangeNameModal extends Component {

    constructor(props) {
        super(props);
        this._name = this.props.name;
    }
    _setName(name) {
        this._name = name;
    }
    _changeName() {
        //BatsFix. change name function called here. this should update the profile also    
    }
    render() {
        return(
        <HerbyModal show={this.props.visible} onClose={()=>this.props.onClose()}>
            <View style={{backgroundColor:'white',alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                <HerbyInput style={{marginLeft:20,marginRight:20}} value={this.props.user.name} isCentered={true} onChange={(t)=>this._setName(t)}/>
                <View style={{flexDirection:'row'}}>
                    <HerbyButton2 name="Continue" onPress={()=>this._changeName()}/>
                    <HerbyButton2 name="Cancel" onPress={()=>this.props.onClose()}/>
                </View>
            </View>
        </HerbyModal>
        );
    }
}

module.exports = ChangeNameModal;

