//loginscenes.js
import React, { Component } from 'react';
import {StyleSheet,Text,View,ListView,ListViewDataSource,ScrollView,Image,TextInput,TouchableOpacity,Navigator} from 'react-native'

//get state management components 
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components 
import Styles from './styles.js';
import {GetProducerAction} from '../actions';

class ProductScene extends Component {
    constructor(props) {
        super(props);
        // these should come from the app state. 
        this.state = {
            act  :  this.props.act, 
            eff  :  this.props.eff, 
        }
    }

    _goProducer(rowData:string) {
        // BatsFix. should set a producer state first.
        this.props.navigator.push(this.props.producerScene);
    }

    _renderRow(rowData:string) {
        return (
            <TouchableOpacity style={Styles.buttonLarge} onPress={()=>this._goProducer(rowData)}>
                <Text>{rowData}</Text>
            </TouchableOpacity>
        )
    }
     
    _renderList() {
        if (this.props.producers.size !== 0)
        {
            var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => (r1 != r2),});
            return (
                <ListView dataSource = {ds.cloneWithRows(this.props.producers)}
                          enableEmptySections = {true}
                          renderRow  = {this._renderRow.bind(this)}
                          />

            );
        }
        else
        return null; 
    }
    
    // BatsFix. These should be broken into components later.
    render() {
        return (
                <View style={[Styles.container,{marginTop:70}]}>
                      <View style={[Styles.container,{flex:1}]}>
                        <Image source={require('./background.png')} style={[Styles.container,{height:64,width:64}]}/>
                      </View>
                      <View style={[Styles.container,{flex:1}]}>
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
                                    </View>
                                </View>
                        </View>
                        <View style={[Styles.container,{flex:1}]}>
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
                                    </View>
                                </View>
                        </View>
                        <View style={Styles.container}>
                            <ScrollView>
                                {this._renderList()}
                            </ScrollView>
                        </View>
                </View>
        );
    }
}


// BatsFix. This function is used to convert state to props passed to this component
function mapStateToProps(state) {
    return {
        act:  state.ProductReducer.act, 
        eff:  state.ProductReducer.eff, 
        producers: state.ProductReducer.producers,
    } 
}
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called GetProducerAction. 
//
function mapActionToProps(dispatch) {return bindActionCreators({GetProducerAction,}, dispatch);}

module.exports         = connect(mapStateToProps,mapActionToProps)(ProductScene);
