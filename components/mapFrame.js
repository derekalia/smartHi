//
// Description: productFrame.js
// Used for searching and listing products 
//
import React, { Component } from 'react';
import {Alert,MapView, StyleSheet, Text, View, Image, TextInput,TouchableOpacity,} from 'react-native'
import StarRating from 'react-native-star-rating';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//get internal components
import {GetRetailerAction,GetProducerAction,} from '../actions';

class MapRetailerItem extends Component {
    constructor(props) {
        super(props);
    }

    _onPress() {
        this.props.goRetailer(this.props.mapItem.id);
    }
    
    render() {
        return (
             <TouchableOpacity onPress={()=>this._onPress()} style={{width:200}}>
                <Text>{this.props.mapItem.title}</Text>
                        <View style={{flexDirection:'row'}}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                starSize={12}
                                starColor={'red'}
                                rating={this.props.mapItem.rating}
                                selectedStar={function(){}}
                                />
                            <Text>({this.props.mapItem.ratingCount})</Text>
                        </View>
             </TouchableOpacity>

        );
    }
}

class MapFrame extends Component {
    constructor(props) {
        super(props);
        //
        // BatsFix. retailer should be populated dynamically. 
        //
        var retailers = [{latitude: 47.597713,longitude: -122.321777,title:'Uncle Ike Here',rating:3.5,ratingCount:201,id:0}];
        var mapItems = this._populateMap(retailers);
        this.state = {mapItems:mapItems};
    }
    _populateMap(retailers) {
        var mapItems = [];
        for (var i=0; i < retailers.length; i++) {
            mapItems.push(this._getRetailerItem(retailers[i]));
        }
        return mapItems;
    }
    _getRetailerItem(retailer) {
        return ({latitude:retailer.latitude,
                 longitude:retailer.longitude,
                 tintColor:'blue',
                 title:' ',
                 rightCalloutView: (<MapRetailerItem mapItem={retailer} goRetailer={(t)=>this._goRetailer(t)}/>),
        });
    }
    _goRetailer(retailerId) {
        this.props.GetRetailerAction(retailerId);
    }
    render() {
        return(
            <View style={[{ backgroundColor: 'white' }]}>
                <MapView
                    style={{ height: 620, width: 377 }}
                    showsUserLocation={true}
                    region={{ latitude: 47.597713, longitude: -122.321777, latitudeDelta: 0.5, longitudeDelta: 0.5, }}
                    showsCompass = {true}
                    annotations = {this.state.mapItems}
                    />
            </View>
        );
    }
}

// Connect state mapItems 
function mapStateToProps(state) {
    return {
        mapItems: state.MapReducer.mapItems,
    }
}
// Connect GetRetailerAction and GetProducerAction
function mapActionToProps(dispatch) { return bindActionCreators({ GetRetailerAction,GetProducerAction }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(MapFrame);
