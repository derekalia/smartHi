//
// Description: activityList.js
// This contains the declaration for the activity section
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableHighlight,ScrollView } from 'react-native';

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {FiltersActivity} from '../common/filters.js';
import {GetActivityAction} from '../actions';
import ActivityItem from './activityItem.js';

class ActivityList extends Component {

    _goActivity(activityType) {
        console.log("going to activity" + activityType);
        this.props.GetActivityAction(activityType);
    }

    render() {
        //
        // BatsFix. This needs to be flexible with regard to a device with and height.
        //

        var count = this.props.count;
        if (count >= FiltersActivity.length) {
            count = FiltersActivity.length;
        }
        var items = [];
        for (var i=0; i < count; i++) {
            items.push(
                <ActivityItem activity={FiltersActivity[i].name} imageIndex={i} key={FiltersActivity[i].name} goActivity={(n) => this._goActivity(n)}/>
            );
        }

        return (
            <View>
                {/* Activity Items BatsFix. should be dynamically generated here*/}
                <ScrollView horizontal={1}>
                <View style={{flexDirection:'row',flexWrap:'wrap',flex:1}}>
                    {items}
                </View>
                </ScrollView>
            </View>

        );
    }
}

//
// Connect GetActivityAction to props
//
function mapActionToProps(dispatch) { return bindActionCreators({  GetActivityAction }, dispatch); }
module.exports = connect(null,mapActionToProps)(ActivityList);
