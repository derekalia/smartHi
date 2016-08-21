//
// Description: filterItem.js
// Handles a single filter item manipulation and display.
//

import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, ListView, } from 'react-native';

// Import filters.
import {FiltersActivity, FiltersEffect, FiltersType,FiltersCategory,FiltersSymptoms} from '../common/filters.js';

class FilterItem extends Component {
    constructor(props) {
        super(props);
        var filter = this.props.filter;
        var tagStye = Styles.tagActivity;
        var textStyle = Styles.tagTextActivity;

        if (filter.type == 'activity') {
            tagStyle = Styles.tagActivity;
            textStyle = Styles.tagTextActivity;
        }
        else
        if (filter.type == 'effect') {
            tagStyle = Styles.tagEffect;
            textStyle = Styles.tagTextEffect;
        }
        else
        if (filter.type == 'symptoms') {
            tagStyle = Styles.tagSymptom;
            textStyle = Styles.tagTextSymptom;
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
        if (this.props.filter.selected) {
            this._borderWidth = 3;
        }
        else {
            this._borderWidth = 1;
        }
        this._tagStyle = tagStyle;
        this._textStyle = textStyle;
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
            this._borderWidth = 0;

            //this._tagColor = this.style.borderColor;
            this._tagColor = "#4A90E2";
            this._tagFontColor = "white";

        }
        else {
            this._borderWidth = 1;
            this._tagColor = "white";
            this._tagFontColor = "#4A90E2";
        }
        this._filter.selected = current;

        this.setState({filterSelected: current});

        if (this.props.onPress) {
            this.props.onPress(this._filter);
        }
    }

    render() {
        return (
            <TouchableOpacity style={[this._tagStyle,{borderWidth:this._borderWidth,backgroundColor:this._tagColor}]} onPress={() => this._onPress()}>
                <Text style={this._textStyle}>{this._filter.name}</Text>
            </TouchableOpacity>
        );
    }
}

module.exports = FilterItem;

const Styles = StyleSheet.create({
    tagEffect: {
        margin: 5,
        borderRadius: 20,
        height:40,
        borderWidth: 1,
        borderColor: "#4A90E2",
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextEffect: {
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextType: {
        color: "#F5A623",
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
    },
    tagSymptom: {
        margin: 5,
        borderRadius: 20,
        height:40,
        borderWidth: 1,
        borderColor: "#D0021B",
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagTextSymptom: {
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
