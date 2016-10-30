//
// Description: licenseeLoginScene.js
//

import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Switch, TouchableOpacity,TouchableHighlight, Image } from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import {LicenseeLoginAction} from '../../../actions';
import {ProducerLoginAction} from '../../../actions';
import {HerbyButton2,HerbyInput,HerbyBar,}         from '../../../common/controls.js';
import HerbyNotification from '../../util/herbyNotification.js';

class LicenseeLoginScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
        trueSwitchIsOn: true,
        falseSwitchIsOn: false,
        };
    }


    _producerLogin() {
        //
        // Go to product page
        //
       this.props.ProducerLoginAction();
    }
    _licenseeLogin() {
        //
        // Go to product page
        //
       this.props.LicenseeLoginAction();
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'#EFEFF4'}}>

              <HerbyBar name="Authentication"  navigator={this.props.navigator}/>

                <View>
                  <Text style={{fontSize:14,paddingLeft:20,paddingTop:16,paddingBottom:10,color:'#666666'}}>USER INFO</Text>
                </View>

                <View style={{borderTopWidth:1,borderTopColor:'#C7C7CC'}}/>
                <View style={{backgroundColor:'white',flexDirection:"row",borderBottomWidth:1,borderBottomColor:'#C7C7CC'}}>
                  <Text style={{fontSize:16,paddingLeft:20,paddingTop:16,paddingBottom:16,color:'black'}}>State</Text>
                  <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'center'}}>
                    <Text  style={{color:'grey',fontSize:16,justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'flex-end',marginRight:10}}>Washington</Text>
                  </View>
                </View>


                <View style={{backgroundColor:'white',flexDirection:"row",borderBottomWidth:1,borderBottomColor:'#C7C7CC'}}>
                  <Text style={{fontSize:16,paddingLeft:20,paddingTop:16,paddingBottom:16,color:'black'}}>Email</Text>
                  <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'center'}}>
                    <Text  style={{color:'grey',fontSize:16,justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'flex-end',marginRight:10}}>ike@uncleikes.com</Text>
                  </View>
                </View>

                <View style={{backgroundColor:'white',flexDirection:"row",borderBottomWidth:1,borderBottomColor:'#C7C7CC'}}>
                  <Text style={{fontSize:16,paddingLeft:20,paddingTop:16,paddingBottom:16,color:'black'}}>Password</Text>
                  <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'center'}}>
                  <Text  style={{color:'grey',fontSize:16,justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'flex-end',marginRight:10}}>******</Text>
                  </View>
                </View>

                <View>
                  <Text style={{fontSize:14,paddingLeft:20,paddingTop:16,paddingBottom:10,color:'#666666'}}>LICENSE TYPE</Text>
                </View>

                <View style={{borderTopWidth:1,borderTopColor:'#C7C7CC'}}/>
                <TouchableOpacity onPress={()=>this._licenseeLogin()} style={{backgroundColor:'white',flexDirection:"row",borderBottomWidth:1,borderBottomColor:'#C7C7CC'}}>
                  <Text style={{fontSize:16,paddingLeft:20,paddingTop:16,paddingBottom:16,color:'black'}}>Retail</Text>
                  <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'center'}}>
                    <Image style={{justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'flex-end',width:8+2,height:12+4,marginRight:10}} source={require('../../../media/More1.png') }/>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this._producerLogin()} style={{backgroundColor:'white',flexDirection:"row",borderBottomWidth:1,borderBottomColor:'#C7C7CC'}}>
                  <Text style={{fontSize:16,paddingLeft:20,paddingTop:16,paddingBottom:16,color:'black'}}>Producer</Text>
                  <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'center'}}>
                    <Image style={{justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'flex-end',width:8+2,height:12+4,marginRight:10}} source={require('../../../media/More1.png') }/>
                  </View>
                </TouchableOpacity>

                <View>
                  <Text style={{fontSize:14,paddingLeft:20,paddingTop:16,paddingBottom:10,color:'#666666'}}>STATUS</Text>
                </View>

                <View style={{borderTopWidth:1,borderTopColor:'#C7C7CC'}}/>
                <View style={{backgroundColor:'white',flexDirection:"row",borderBottomWidth:1,borderBottomColor:'#C7C7CC'}}>
                  <Text style={{fontSize:16,paddingLeft:20,paddingTop:16,paddingBottom:16,color:'black'}}>Sync Off</Text>
                  <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'center'}}>

                  <View>
                    <Switch
                      style={{marginRight:10}}
                      onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
                      value={this.state.trueSwitchIsOn} />
                  </View>

                  </View>
                </View>
                    {/* <HerbyInput name="State" value=''/>
                    <HerbyInput name="Email" value=''/>
                    <HerbyInput name="UBI" value=''/>
                    <HerbyInput name="Password"  value=''/>
                    <View style={{flexDirection:'row'}}>
                        <HerbyButton2 name="Continue" onPress={()=>this._licenseeLogin()}/>
                    </View> */}
                    {/* <HerbyNotification/> */}
                </View>
        );
    }
}

//
// Connect LoginLicenseeAction to props
//

function mapActionToProps(dispatch) { return bindActionCreators({ LicenseeLoginAction,ProducerLoginAction }, dispatch); }
module.exports = connect(null,mapActionToProps)(LicenseeLoginScene);
