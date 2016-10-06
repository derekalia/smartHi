//
// Description: filterList.js
// Handles filters manipulation and display.
//

import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight,ScrollView, TouchableOpacity, ListView, } from 'react-native';

// Import filters.
import {FiltersActivity, FiltersEffect, FiltersType,FiltersCategory,FiltersSymptoms} from '../../common/filters.js';
import FilterItem   from './filterItem.js';

class FilterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFilters: [],
            filters: {
            activity: FiltersActivity,
            effect:   FiltersEffect,
            type:     FiltersType,
            category: FiltersCategory,
            symptoms: FiltersSymptoms,
            },
        }
        this._initializeFilters();
    }

    _initializeFilters() {
        for (key in this.state.filters) {
            var filterArray = this.state.filters[key];
            for (var i=0; i < filterArray.length; i++) {
                filterArray[i].selected = false;
            }
        }
    }

    //
    // If the filter is not in the list of current filters
    // add to the current list. If it is in the current filters
    // list, remove it from the current list
    //
    _getFilterIndex(filter,filterArray) {
        for (var i=0; i < filterArray.length; i++) {
            if (filterArray[i].name == filter.name) {
                return i;
            }
        }
        return -1;
    }

    _addRemoveFilter(filter) {
        var current = this.state.currentFilters;
        if (filter.selected == true) {
            var index = this._getFilterIndex(filter,current);
            if (index < 0) {
                current.push({name:filter.name,type:filter.type,selected:true});
                this.props.addRemoveFilter(filter.name);
                this.setState({currentFilters: current});
            }
        }
        else {
            var index = this._getFilterIndex(filter,current);
            if (index >= 0) {
                this.props.addRemoveFilter(filter.name);
                current.splice(index, 1);
                this.setState({currentFilters: current});
            }
        }
    }

    render() {
        return (
            <ScrollView style={{flex:1,}}>
                {this._renderFilters()}
            </ScrollView>
        );
    }

    _renderFiltersArray(filterArray,isCurrent) {
        var filters = [];
        for (var i=0; i < filterArray.length; i++) {
            filters.push(<FilterItem filter={filterArray[i]} key={filterArray[i].name} onPress={(t) => this._addRemoveFilter(t)}/>);
        }
        return (
            <View style={{flexWrap: 'wrap',flexDirection:'row'}}>
                {filters}
            </View>
        );
    }

    _renderFilters() {
        return (
            <View style={{marginHorizontal:12}}>
                <View>
                    <View style={{ height: 40, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, }}> Activity </Text>
                    </View>
                    {this._renderFiltersArray(this.state.filters['activity'],false)}
                </View>
                <View>
                    <View style={{ height: 40, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, }}> Effects </Text>
                    </View>
                    {this._renderFiltersArray(this.state.filters['effect'],false)}
                </View>
                <View>
                    <View style={{ height: 40, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, }}> Type </Text>
                    </View>
                    {this._renderFiltersArray(this.state.filters['type'],false)}
                </View>
                <View>
                    <View style={{ height: 40, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, }}> Category </Text>
                    </View>
                    {this._renderFiltersArray(this.state.filters['category'],false)}
                </View>
                <View>
                    <View style={{ height: 40, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, }}> Symptoms </Text>
                    </View>
                    {this._renderFiltersArray(this.state.filters['symptoms'],false)}
                </View>
            </View>
        );
    }
}

module.exports = FilterList;

const Styles = StyleSheet.create({
    buttonText: {
        fontSize: 14,
        color: '#48BBEC',
        alignSelf: 'center',
    },
    button: {
        height: 35,
        flex: 1,
        backgroundColor: 'white',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 22,
        margin: 3,
        justifyContent: 'center',

    },
    rowContainer: {
        flexDirection: 'row',
        marginRight: 3,
    },
    outside: {

        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 6,
        margin: 6,
    },
    rowContainerStars: {
        flexDirection: 'row',
        marginTop: 8,
        marginRight: 3,
    },
    tagContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    flexContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    input: {
        height: 50,
        fontSize: 20,

        backgroundColor: 'white',
        borderRadius: 0,
        borderColor: "#4A90E2",

        borderWidth: 1,
    },
    company: {
        flex: 1,
        textAlign: 'right',
        fontSize: 13,
        marginRight: 4,
        flexWrap: 'nowrap',
        height: 13
    },
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'white',
        borderWidth: 1,
        padding: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'white',
    },
    thumb: {
        width: 100,
        height: 100,
        marginRight: 8,
        borderRadius: 5,
        // borderTopLeftRadius: 60,
        // borderTopRightRadius: 0,
    },
});
