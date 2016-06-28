//loginscenes.js
import React, { Component } from 'react';
import {StyleSheet,Text,View,ScrollView,Image,TextInput,TouchableOpacity,Navigator} from 'react-native'

//get state management components 
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components 
import Styles from './styles.js';

class HomeScene extends Component {
    constructor(props) {
        super(props);
        // these should come from the app state. 
        this.state = {
            act  :  this.props.act, 
            eff  :  this.props.eff, 
            sale : ['good','bad','ugly'],
        }
    }

    _onToSearch() {
        //
        // BatsFix. should it call setSearchAction criteria first?
        // Does it make sense to make all scenes available on all tabs?
        //
        this.props.navigator.push(this.props.searchScene);
    }
    _plusActivity() {
        console.log("plus category called");
    }
    _plusEffect() {
        console.log("plus category called");
    }
    _plusSale() {
        console.log("plus sale called");
    }
    // BatsFix. These should be broken into components later.
    render() {
            return (
                <View style={[Styles.container,{width:360,marginTop:70}]}>
                    <ScrollView contentContainerStyle={[Styles.container,{width:360,marginTop:0}]}>
                         <View style={[Styles.container,{height:30}]}>
                            <TouchableOpacity style={Styles.buttonLarge} onPress={this._onToSearch.bind(this)}>
                                <Text> Search </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[Styles.container,{height:120,margin:10}]}>
                                <View style={[Styles.container,{flex:1,alignItems:'flex-start'}]}>
                                    <Text> Featured </Text>
                                </View>
                                <View style={[Styles.container,{flex:1.5,backgroundColor:'grey'}]}>
                                    <Text>Forged Cannabis</Text>
                                    <Text>Issaquah</Text>
                                    <Text>Washington</Text>
                                </View>
                        </View>
                        <View style={[Styles.container,{height:80,margin:10}]}>
                                 <View style={[Styles.container,{flex:1,alignItems:'flex-start'}]}>
                                    <Text> Activities </Text>
                                    <View style={[Styles.container,{flex:3,flexDirection:'row'}]}>
                                            <TouchableOpacity style={Styles.buttonSmall}>
                                                <Text>{this.state.act[0]}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={Styles.buttonSmall}>
                                                <Text>{this.state.act[1]}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={Styles.buttonSmall}>
                                                <Text>{this.state.act[2]}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=> this._plusActivity()} style={Styles.buttonSmall}>
                                                <Text>+</Text>
                                            </TouchableOpacity>
                                    </View>
                                </View>
                        </View>
                        <View style={[Styles.container,{height:120,margin:10}]}>
                                 <View style={[Styles.container,{flex:1,alignItems:'flex-start'}]}>
                                    <Text> Effects </Text>
                                    <View style={[Styles.container,{flex:3,flexDirection:'row'}]}>
                                            <TouchableOpacity style={Styles.buttonSmall}>
                                                <Text>{this.state.eff[0]}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={Styles.buttonSmall}>
                                                <Text>{this.state.eff[1]}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={Styles.buttonSmall}>
                                                <Text>{this.state.eff[2]}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=> this._plusEffect()} style={Styles.buttonSmall}>
                                                <Text>+</Text>
                                            </TouchableOpacity>
                                    </View>
                                </View>
                        </View>
                        <View style={[Styles.container,{height:120,margin:10}]}>
                                <View style={[Styles.container,{flex:1,alignItems:'flex-start'}]}>
                                    <Text> On Sale Products </Text>
                                </View>
                                <View style={[Styles.container,{flex:3,flexDirection:'row'}]}>
                                        <TouchableOpacity style={Styles.buttonSmall}>
                                            <Text>{this.state.sale[0]}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={Styles.buttonSmall}>
                                            <Text>{this.state.sale[1]}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={Styles.buttonSmall}>
                                            <Text>{this.state.sale[2]}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=> this._plusSale()} style={Styles.buttonSmall}>
                                            <Text>+</Text>
                                        </TouchableOpacity>
                                </View>
                        </View>
                    </ScrollView>
                </View>
            );
    }
}


// BatsFix. This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        act:  state.SearchReducer.act, 
        eff:  state.SearchReducer.eff, 
    } 
}

module.exports         = connect(mapStateToProps)(HomeScene);
