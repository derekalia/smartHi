import React, { Component } from 'react';
import {Modal,View, Text, Alert } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class HerbyModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <Modal
            animationType={'fade'}
            transparent={true}
            visible={this.props.show}>
            <View style={{flex:1,backgroundColor:'rgba(52,52,52,0.5)',alignItems:'center',justifyContent:'center'}}>
            {this.props.children}
            </View>
         </Modal>
         );
    }
}

module.exports = HerbyModal;
