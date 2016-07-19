//loginscenes.js
import React, { Component } from 'react';
import {StyleSheet, Text, View, ListView, ListViewDataSource, ScrollView, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import Styles from './styles.js';
import {GetProductAction} from '../actions';

class ProducerScene extends Component {
    constructor(props) {
        super(props);
        // these should come from the app state.
        this.state = {
            act: this.props.act,
            eff: this.props.eff,
        }
    }

    _goProduct(rowData: string) {
        // BatsFix. should set a product state first.
        // BatsFix. Or just move the whole thing to action.
        // that is probably better
        // That means UI state will be wholly managed by
        // the state not locally.
        this.props.navigator.push(this.props.productScene);
    }

    _renderRow(rowData: string) {
        return (
            <TouchableOpacity style={Styles.buttonLarge} onPress={() => this._goProduct(rowData) }>
                <Text>{rowData}</Text>
            </TouchableOpacity>
        )
    }

    _renderList() {
        if (this.props.products.size !== 0) {
            var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1 != r2), });
            return (
                <ListView dataSource = {ds.cloneWithRows(this.props.products) }
                    enableEmptySections = {true}
                    renderRow  = {this._renderRow.bind(this) }
                    />

            );
        }
        else
            return null;
    }

    // BatsFix. These should be broken into components later.
    render() {
        return (
            <View style={[Styles.container, { marginTop: 70 }]}>
                <View style={[Styles.container, { flex: 1 }]}>
                    <Image source={require('./background.png') } style={[Styles.container, { height: 64, width: 64 }]}/>
                </View>
                <View style={[Styles.container, { flex: 1 }]}>
                    <View style={[Styles.container, { flex: 1, alignItems: 'flex-start' }]}>
                        <Text> Something about this producer</Text>
                    </View>
                </View>
                <View style={Styles.container}>
                    <ScrollView>
                        {this._renderList() }
                    </ScrollView>
                </View>
            </View>
        );
    }
}


// BatsFix. This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        products: state.ProducerReducer.products,
    }
}
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called GetProductAction.
//
function mapActionToProps(dispatch) { return bindActionCreators({ GetProductAction, }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(ProducerScene);
