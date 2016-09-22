import React, { Component } from 'react';
import {Modal,View, Text, Alert } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


import {ResetModalAction,} from '../actions';

class HerbyModal extends Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate(prevProps,prevState) {
        if (this.props.switchModal) {
            // Nav reducer is indicating dialog finished
            // its task. First, close the dialog.
            this.props.onClose();
            // Then indicate that dialog is now closed
            this.props.ResetModalAction();
        }
    }

    render() {
        return (
        <Modal
            animationType={'slide'}
            transparent={true}
            visible={this.props.show}>
            {this.props.children}
         </Modal>
         );
    }
}
function mapStateToProps(state) {
    return {
        switchModal: state.NavigationReducer.switchModal,
    }
}

function mapActionToProps(dispatch) { return bindActionCreators({ResetModalAction }, dispatch); }

module.exports = connect(mapStateToProps,mapActionToProps)(HerbyModal);
