//
// Description: filterList.js
// Handles filters manipulation and display.
//

import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight,ScrollView, TouchableOpacity, ListView, } from 'react-native';

// Import filters.
import {FiltersActivity, FiltersEffect, FiltersType,FiltersCategory,FiltersSymptoms} from '../common/filters.js';
import FilterItem   from './filterItem.js';

class FilterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFilters: [],
            filtersVisible: true,
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

    componentWillReceiveProps(nextProps) {
        productCount = nextProps.productCount;
        if (productCount > 0) {
            this.setState({filtersVisible: false});
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

    _removeFilter(filter) {
        var filterArray = this.state.filters[filter.type];
        var index = this._getFilterIndex(filter,filterArray);
        filterArray[index].selected = false;

        this._addRemoveFilter(filter);
    }

    _switchFiltering() {
        var current = this.state.filtersVisible;
        this.setState({filtersVisible: !current});
    }

    render() {
        return (
            <View >
            <View style={{backgroundColor:'#ECECEC',flex:1,height:10,marginHorizontal:0}}/>
                <View>
                    {this._renderSelectedFilters(this.state.currentFilters)}
                </View>
                <View style={{alignItems:'center'}}>
                {this._renderFilterButton()}
                </View>
                {this._renderFilters()}
            </View>
        );
    }

    //
    // BatsFix. For some reason using lists makes the list item not update
    // on frame switch. Another mysterious bug in react-native,
    // iterating over the array does not work properly if the key item is just
    // an index number!!!!! Bad Bad Bug! May be we should be using a list instead
    // of iterating over the array
    //
     _renderSelectedFilters(filterArray) {
        var filters = [];
        for (var i=0; i < filterArray.length; i++) {
            filters.push(<FilterItem filter={filterArray[i]} key={filterArray[i].name} onPress={(t) => this._removeFilter(t)}/>);
        }
        return (
            <View style={{flexWrap: 'wrap'}}>
            <ScrollView horizontal={true}>
                {filters}
            </ScrollView>
            </View>
        );
    }


    _renderFiltersArray(filterArray,isCurrent) {
        var filters = [];
        for (var i=0; i < filterArray.length; i++) {
            filters.push(<FilterItem filter={filterArray[i]} key={filterArray[i].name} onPress={(t) => this._addRemoveFilter(t)}/>);
        }
        return (
            <View style={{flexWrap: 'wrap'}}>
            <ScrollView horizontal={true}>
                {filters}
            </ScrollView>
            </View>
        );
    }

    _renderFilters() {
        if (this.state.filtersVisible == false) {
            return null;
        }
        return (
            <View>
                <View>
                    <View style={{ height: 40, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Activity </Text>
                    </View>
                    {this._renderFiltersArray(this.state.filters['activity'],false)}
                </View>
                <View>
                    <View style={{ height: 40, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Effects </Text>
                    </View>
                    {this._renderFiltersArray(this.state.filters['effect'],false)}
                </View>
                <View>
                    <View style={{ height: 40, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Type </Text>
                    </View>
                    {this._renderFiltersArray(this.state.filters['type'],false)}
                </View>
                <View>
                    <View style={{ height: 40, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Category </Text>
                    </View>
                    {this._renderFiltersArray(this.state.filters['category'],false)}
                </View>
                <View>
                    <View style={{ height: 40, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Symptoms </Text>
                    </View>
                    {this._renderFiltersArray(this.state.filters['symptoms'],false)}
                </View>
                <View style={{ height: 40, justifyContent: 'center', }}>
                    <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Price </Text>
                </View>
                <View style={{ height: 40, justifyContent: 'center', }}>
                    <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Distance </Text>
                </View>
            </View>
        );
    }

    _renderFilterButton() {
        var filterButtonText = "Show Filtering Options";
        if (this.state.filtersVisible) {
            filterButtonText = "Hide Filtering Options";
        }
        return (
            <TouchableHighlight onPress = {()=> this._switchFiltering()} underlayColor={'white'} style={{  }}>
              <View style={{  height: 40,
                margin:10,
                width:340,
                backgroundColor: 'white',
                borderColor: '#9b9b9b',
                borderWidth: 1,
                borderRadius: 22,
                justifyContent: 'center',}}>
                  <Text style={{fontSize: 14,
                  color: '#9b9b9b',
                  alignSelf: 'center',}}>
                  {filterButtonText}
                </Text>
              </View>
            </TouchableHighlight>
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
