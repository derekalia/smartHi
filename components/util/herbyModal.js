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
            {this.props.children}
         </Modal>
         );
    }
}

module.exports = HerbyModal;
