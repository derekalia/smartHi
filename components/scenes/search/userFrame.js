//
// Description: userFrame.js
// Used for searching and listing users
//
import React, { Component } from 'react';
import {StyleSheet, Text, View, Slider, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableHighlight, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// import apollo helper
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


//get internal components
import {HerbyLoading,HerbyButton2} from '../../../common/controls.js';
import UserList from '../../util/userList.js';

class UserFrame extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.loading) {
            return (<HerbyLoading/>);
        }
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

//
// BatsFix. Attach apollo query to the component. This creates props loading and products
//
const apolloUsers = gql`query($searchCount: Int!,$searchTerm: String!) {
    allUsers(first:$searchCount,filter:{name_contains:$searchTerm}){
      id,
      name,
      score,
    }
}`;

//
// BatsFix. Maps data obtained from the query to props.
//
function mapDataToProps({props,data}) {
    return ({
        loading: data.loading,
        users: data.allUsers,
    });
}

module.exports = graphql(apolloUsers,{props:mapDataToProps})(UserFrame);
