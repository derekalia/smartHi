//loginscenes.js
import React, { Component } from 'react';
import {StyleSheet,Text,View,ScrollView,Image,TextInput,TouchableOpacity,Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
// import Styles from './styles.js';

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
                <View style={[{marginTop:30}]}>
                    <ScrollView>
                         <View>
                            <TouchableOpacity style={[Styles.FindProductButton]}
                              onPress={this._onToSearch.bind(this)}>
                                <Text style={{color:'white',fontSize:22,fontFamily:"Avenir Next"}}>Find Product</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[{height:120,margin:10}]}>
                                <View style={[Styles.container,{flex:1,alignItems:'flex-start'}]}>
                                    <Text style={{fontSize:16, fontWeight: 'bold'}}> Featured </Text>
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


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    FindProductButton: {
        flex: 1,
        height:42,
        marginHorizontal: 10,
        marginTop: 0,
        borderRadius: 3,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    buttonSmall: {
        flex: 1,
        marginHorizontal: 3,
        borderRadius: 20,
        backgroundColor: '#8888ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 10,
        textAlign: 'center',
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#999999',
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },
});

module.exports         = connect(mapStateToProps)(HomeScene);
