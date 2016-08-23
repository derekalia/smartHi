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
        var filter = this.props.filter;

        this._filterColor = tagColor[filter.type];

        if (this.props.filter.selected) {
            this._textColor = 'white';
            this._tagColor  = this._filterColor;
        }
        else {
            this._textColor = this._filterColor;
            this._tagColor  = 'white' 
        }
 
        this._filter    = filter;

        // Only changeable attributes should be in state.
        this.state = {
            filterSelected: this.props.filter.selected,
        };
    }

    componentWillReceiveProps(nextProps) {
    }

    _onPress() {
        var current = !this.state.filterSelected;
        if (current) {
            this._textColor = 'white';
            this._tagColor  = this._filterColor;
        }
        else {
            this._textColor = this._filterColor;
            this._tagColor  = 'white' 
        }
        this._filter.selected = current;

        this.setState({filterSelected: current});

        if (this.props.onPress) {
            this.props.onPress(this._filter);
        }
    }

    render() {
        return (
            <TouchableOpacity style={[Styles.tagStyle,{backgroundColor:this._tagColor,borderColor:this._textColor,}]} onPress={() => this._onPress()}>
                <Text style={[Styles.tagText,{color:this._textColor}]}>{this._filter.name}</Text>
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
