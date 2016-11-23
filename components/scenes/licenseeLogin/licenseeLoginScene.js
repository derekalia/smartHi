//
// Description: licenseeLoginScene.js
//

import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Switch, TouchableOpacity,TouchableHighlight, Image } from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import {ProducerLogin,ProducerLoginAction,RetailerLogin,RetailerLoginAction} from '../../../actions';
import {HerbyHeader,HerbyButton2,HerbyButton,HerbyInput,HerbyBar,}         from '../../../common/controls.js';
import HerbyNotification from '../../util/herbyNotification.js';

class LicenseeLoginScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            error: null,
            isAutoSync: true,
        };
        this._mounted = false;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    componentDidMount() {
        this._mounted = true;
    }

    _retailerLogin() {
        //
        // Go to product page
        //
        this.setState({loading:true});
        RetailerLogin(this._email,this._password,(profile,error)=>{
            if (this._mounted) {
                if (error  == null) {
                    this.setState({loading:false});
                    this.props.RetailerLoginAction(profile);
                }
                else {
                    this.setState({loading:false,error:error});
                }
            }
        });
    }

    _producerLogin() {
        //
        // Go to product page
        //
        this.setState({loading:true});
        ProducerLogin(this._email,this._password,(profile,error)=>{
            if (this._mounted) {
                if (error  == null) {
                    this.setState({loading:false});
                    this.props.ProducerLoginAction(profile);
                }
                else {
                    this.setState({loading:false,error:error});
                }
            }
        });
    }

    _setState(state) {
        this._state = state;
    }
    _setEmail(email) {
        this._email = email;
    }
    _setPassword(password) {
        this._password = password;
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'#EFEFF4'}}>
                <HerbyBar name="Authentication"  navigator={this.props.navigator}/>

                <HerbyHeader name='USER INFO'/>
                <HerbyInput name='State'    value='Washington'        onChange={(t)=>this._setState(t)}/>
                <HerbyInput name='Email'    value='ike@uncleikes.com' onChange={(t)=>this._setEmail(t)}/>
                <HerbyInput name='Password' value='*****************' onChange={(t)=>this._setPassword(t)} secureTextEntry={true}/>

                <HerbyHeader name='LICENSE TYPE'/>                
                <HerbyButton name="Retail"   onPress={()=>this._retailerLogin()}/>
                <HerbyButton name="Producer" onPress={()=>this._producerLogin()}/>

                <HerbyHeader name='STATUS'/>
                <View style={{backgroundColor:'white',flexDirection:"row",borderBottomWidth:1,borderBottomColor:'#C7C7CC'}}>
                  <Text style={{fontSize:16,paddingLeft:20,paddingTop:16,paddingBottom:16,color:'black'}}>Sync Off</Text>
                  <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'center'}}>
                      <View>
                          <Switch
                              style={{marginRight:10}}
                              onValueChange={(value) => this.setState({isAutoSync: value})}
                              value={this.state.isAutoSync} />
                      </View>
                  </View>
                </View>
                <HerbyNotification showBusy={this.state.loading} message={this.state.error}/>
            </View>
        );
    }
}

//
// Connect LoginLicenseeAction to props
//

function mapActionToProps(dispatch) { return bindActionCreators({ RetailerLoginAction,ProducerLoginAction }, dispatch); }
module.exports = connect(null,mapActionToProps)(LicenseeLoginScene);
