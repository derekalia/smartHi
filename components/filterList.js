//
// Description: filterList.js
// Handles filters manipulation and display.
//

import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, ListView, } from 'react-native';

// Import filters.
import {FiltersActivity, FiltersEffect, FiltersType,FiltersCategory,FiltersSymptoms} from '../common/filters.js';

class FilterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFilters: [],
            filtersVisible: true,
        };
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
    _addRemoveFilter(filter) {
        var current = this.state.currentFilters;
        if (filter.isCurrent == null) {
            var index = current.indexOf(filter);
            if (index < 0) {
                filter.isCurrent = true;
                current.push(filter);
                this.props.addRemoveFilter(filter.name);
                this.setState({currentFilters: current});
            }
        }
        else {
            filter.isCurrent = null;
            var current = this.state.currentFilters;
            var index = current.indexOf(filter);
            if (index >= 0) {
                this.props.addRemoveFilter(filter.name);
                current.splice(index, 1);
                this.setState({currentFilters: current});
            }
        }
    }

    _switchFiltering() {
        var current = this.state.filtersVisible;
        this.setState({filtersVisible: !current});
    }

    render() {
        return (
            <View >
                <View>
                    {this._renderFiltersArray(this.state.currentFilters, true)}
                </View>
                <View style={{alignItems:'center'}}>
                {this._renderFilterButton()}
                </View>
                {this._renderFilters()}
            </View>
        );
    }

    _renderFilter(filter) {
        // BatsFix. find a better way to select styling.
        // Or should styling be tied to each filter individually?
        var tagStye = Styles.tagActivity;
        var textStyle = Styles.tagTextActivity;

        if (filter.type == 'activity') {
            tagStyle = Styles.tagActivity;
            textStyle = Styles.tagTextActivity;
        }
        else
        if (filter.type == 'effect') {
            tagStyle = Styles.tagEffects;
            textStyle = Styles.tagTextEffects;
        }
        else
        if (filter.type == 'symptoms') {
            tagStyle = Styles.tagSymptoms;
            textStyle = Styles.tagTextSymptoms;
        }
        else
        if (filter.type == 'category') {
            tagStyle = Styles.tagCategory;
            textStyle = Styles.tagTextCategory;
        }
        else
        if (filter.type == 'type') {
            tagStyle = Styles.tagType;
            textStyle = Styles.tagTextType;

        }
        return (
            <TouchableOpacity style={tagStyle} onPress={() => this._addRemoveFilter(filter) }>
                <Text style={textStyle}>{filter.name}</Text>
            </TouchableOpacity>
        );
    }

    _renderFiltersArray(filterArray) {
        if (filterArray.length > 0) {
            var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1 != r2), });
            return (
                <ListView dataSource = {ds.cloneWithRows(filterArray) }
                    enableEmptySections = {true}
                    renderRow  = {this._renderFilter.bind(this)}
                    contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                    />
            );
        }
        else {
            return null;
        }
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
                    {this._renderFiltersArray(FiltersActivity)}
                </View>
                <View>
                    <View style={{ height: 40, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Effects </Text>
                    </View>
                    {this._renderFiltersArray(FiltersEffect)}
                </View>
                <View>
                    <View style={{ height: 40, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Type </Text>
                    </View>
                    {this._renderFiltersArray(FiltersType)}
                </View>
                <View>
                    <View style={{ height: 40, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Category </Text>
                    </View>
                    {this._renderFiltersArray(FiltersCategory)}
                </View>
                <View>
                    <View style={{ height: 40, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, fontFamily: "Avenir Next" }}> Symptoms </Text>
                    </View>
                    {this._renderFiltersArray(FiltersSymptoms)}
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
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 22,
                justifyContent: 'center',}}>
                  <Text style={{fontSize: 14,
                  color: 'black',
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
    tagEffects: {
        margin: 5,
        borderRadius: 20,
        height:40,
        borderWidth: 1,
        borderColor: "#4A90E2",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumb: {
        width: 100,
        height: 100,
        marginRight: 8,
        borderRadius: 5,
        // borderTopLeftRadius: 60,
        // borderTopRightRadius: 0,
    },
    tagTextEffects: {
        color: "#4A90E2",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },

    tagActivity: {
        margin: 5,
        height:40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#BD10E0",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextActivity: {
        color: "#BD10E0",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },

    tagType: {
        margin: 5,
        height:40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#F5A623",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextType: {
        color: "#F5A623",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },

    tagSymptoms: {
        margin: 5,
        borderRadius: 20,
        height:40,
        borderWidth: 1,
        borderColor: "#D0021B",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextSymptoms: {
        color: "#D0021B",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },

    tagCategory: {
        margin: 5,
        borderRadius: 20,
        borderWidth: 1,
        height:40,
        borderColor: "#7ED321",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextCategory: {
        color: "#7ED321",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },

    tag: {
        margin: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#4A90E2",
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagText: {
        color: "#4A90E2",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },
});
