//
// Description: activitysection.js
// This contains the declaration for the activity section
//

// Import modules
import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import ActivityItem from './activityitem.js';

class ActivitySection extends Component {
    render() {
        //
        // BatsFix. This needs to be flexible with regard to a device with and height.
        //
        return (
            <View>
                {/* Section Header */}
                <View style={{ alignItems: 'flex-end', marginLeft: 5, height:40,flexDirection:'row',justifyContent: 'flex-start',marginBottom:10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Activity </Text>
                    <TouchableHighlight>
                      <Text style={{ fontSize: 16,color:'blue' }}> more </Text>
                    </TouchableHighlight>
                </View>
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

module.exports = ActivitySection;
