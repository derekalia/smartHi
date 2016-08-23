//
// Description: filterItem.js
// Handles a single filter item manipulation and display.
//

import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, ListView, } from 'react-native';

// Import filters.
import {FiltersActivity, FiltersEffect, FiltersType,FiltersCategory,FiltersSymptoms} from '../common/filters.js';

const tagColor = {
    type:     "#F7A700",
    category: "#7BD500",
    effect:   "#4A90E2",
    symptoms:  "#ED3C52",
    activity: "#BE00E3",
} 

class FilterItem extends Component {
    constructor(props) {
        super(props);
        var selected = false;
        this._filter      = this.props.filter;
        this._filterColor = tagColor[this._filter.type];

        selected = this._filter.selected;
        // Only changeable attributes should be in state.
        this.state = {
            selected: selected,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selected:nextProps.filter.selected});
    }

    _onPress() {
        var current = !this.state.selected;
        this.setState({selected: current});

        // Notify container about the current state.
        this._filter.selected = current;
        if (this.props.onPress) {
            this.props.onPress(this._filter);
        }
    }

    render() {
        var selected = this.state.selected;
        var bgColor = selected?this._filterColor:'white';
        var fgColor = selected?'white':this._filterColor;
        return (
            <TouchableOpacity style={[Styles.tagStyle,{backgroundColor:bgColor,borderColor:fgColor,}]} onPress={() => this._onPress()}>
                <Text style={[Styles.tagText,{color:fgColor}]}>{this._filter.name}</Text>
            </TouchableOpacity>
        );
    }
}

module.exports = FilterItem;

const Styles = StyleSheet.create({
    tagStyle: {
        margin: 5,
        borderRadius: 20,
        height:40,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagText: {
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },
});
