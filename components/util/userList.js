//
// Description: retailerList.js
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {GetProfileAction} from '../../actions';
import UserItem from './userItem.js';

class UserList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
              <View style={{backgroundColor:'white',marginTop:5,marginHorizontal:5,borderRadius:2,paddingBottom:0 }}>
              {/* <View style={{borderBottomColor:'#DEDEDE',borderBottomWidth:1,marginHorizontal:8,marginTop:5}}/>                */}
                {this._renderUsers()}
            </View>
        );
    }

    // BatsFix. Should we be using list instead?
    _renderUsers() {
        var users = [];
        if (this.props.userList != null) {
            for (var i=0; i < this.props.userList.length; i++) {
                var userId = this.props.userList[i].id;
                var user   = this.props.userList[i];
                users.push(
                    <UserItem getUser={(userId) => this.props.GetProfileAction(userId)} user={user} key={userId}/>
                );
            }
        }
        return users;
    }
}
//
// Connect GetProfileAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetProfileAction }, dispatch); }

module.exports = connect(null,mapActionToProps)(UserList);
