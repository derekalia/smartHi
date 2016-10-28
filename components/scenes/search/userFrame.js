//
// Description: userFrame.js
// Used for searching and listing users
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import {HerbyButton2} from '../../../common/controls.js';
import UserList from '../../util/userList.js';

class UserFrame extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <ScrollView style={{marginTop: 1,}}>
            <UserList userList={this.props.users}/>
        </ScrollView>
        );
    }
}

//
// Connect state.SearchReducer.users  to props
//
function mapStateToProps(state) {
    return {
        users: state.SearchReducer.users,
    }
}
module.exports = connect(mapStateToProps)(UserFrame);
