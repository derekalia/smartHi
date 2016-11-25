//
// Description: changeNameModal.js
//
import React, { Component } from 'react';
import {Alert,StyleSheet, Text, View, Image, TextInput} from 'react-native'

import {ChangeUserEmail} from '../../../actions';

import {HerbyButton,HerbyButton2,HerbyHeader,HerbyInput} from '../../../common/controls.js';
import HerbyModal from '../../util/herbyModal.js';


class ChangeEmailModal extends Component {
    constructor(props) {
        super(props);
        this._email = this.props.name;
    }
    _setEmail(email) {
        this._email = email;
    }
    _changeEmail() {
        ChangeUserEmail(this.props.user.id,this._email,(error)=>{
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
                <HerbyInput style={{marginLeft:20,marginRight:20}} value='Email to use' isCentered={true} onChange={(t)=>this._setEmail(t)}/>
                <View style={{flexDirection:'row'}}>
                    <HerbyButton2 name="Continue" onPress={()=>this._changeEmail()}/>
                    <HerbyButton2 name="Cancel" onPress={()=>this.props.onClose()}/>
                </View>
            </View>
        </HerbyModal>
        );
    }
}

module.exports = ChangeEmailModal;

