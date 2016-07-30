//
// Description: activityList.js
// This contains the declaration for the activity section
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import ActivityItem from './activityItem.js';

class ActivityList extends Component {
    render() {
        //
        // BatsFix. This needs to be flexible with regard to a device with and height.
        //
        return (
            <View>              
                {/* Activity Items BatsFix. should be dynamically generated here*/}
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    <ActivityItem activity="music"    imageIndex={0} />
                    <ActivityItem activity="movie"    imageIndex={1} />
                    <ActivityItem activity="exercise" imageIndex={2} />
                    <ActivityItem activity="create"   imageIndex={3} />
                </View>
            </View>
        );
    }
}

module.exports = ActivityList;
