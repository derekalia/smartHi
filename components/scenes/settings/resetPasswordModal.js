//
// Description: resetPasswordModal.js
//
import React, { Component } from 'react';
import {Alert,StyleSheet, Text, View, Image, TextInput} from 'react-native'

import {ResetUserPassword} from '../../../actions';

import {HerbyButton,HerbyButton2,HerbyHeader,HerbyInput} from '../../../common/controls.js';
import HerbyModal from '../../util/herbyModal.js';

class ResetPasswordModal extends Component {

    constructor(props) {
        super(props);
        this._password = "";
        this._password2 = "";
    }
    _setPassword(password) {
        this._password = password;
    }
    _setPassword2(password2) {
        this._password2 = password2;
    }

    _resetPassword() {
        ResetUserPassword(this.props.user.id,this._password,this._password2,(error)=>{
            if (error == null) {
                this.props.onClose();
            }
            //BatsFix. otherwise show animated error here
        });
    }

    render() {
        return(
        <HerbyModal show={this.props.visible} onClose={()=>this.props.onClose()}>
            <View style={{backgroundColor:'white',alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                <HerbyInput style={{marginLeft:20,marginRight:20}} value='Enter Password' isCentered={true} secureTextEntry={true} onChange={(t)=>this._setPassword(t)}/>
                <HerbyInput style={{marginLeft:20,marginRight:20}} value='Re-Enter Password' isCentered={true} secureTextEntry={true} onChange={(t)=>this._setPassword2(t)}/>
                <View style={{flexDirection:'row',alignSelf:'stretch',justifyContent:'space-around',marginTop:10,marginBottom:10}}>
                    <HerbyButton2 name="Reset" onPress={()=>this._resetPassword()}/>
                    <HerbyButton2 name="Cancel" onPress={()=>this.props.onClose()}/>
                </View>
            </View>
        </HerbyModal>
        );
    }
}

module.exports = ResetPasswordModal;
