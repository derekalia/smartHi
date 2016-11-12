//loginscenes.js
import React, { Component } from 'react';
import {Alert,StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import HerbyNotification from '../../util/herbyNotification.js';

import {LoginUser,LoginAction, LogoffAction} from '../../../actions';


class LoginScene extends Component {
    constructor(props) {
        super(props);
        this._userName = "";
        this._userPassword = "";
        this.state = { loading: false,error: null };
    }

    _enterUserName(event) {
        this.setState({error:null});
        this._userName = event.nativeEvent.text;
    }

    _enterUserPassword(event) {
        this.setState({error:null});
        this._userPassword = event.nativeEvent.text
    }

    async _submit() {
            this.setState({loading:true});
        LoginUser(this._userName,this._userPassword).then((result)=> {
            if (result.error == null) {
                this.setState({loading:false});
                this.props.LoginAction(result);
            }
            else {
                this.setState({loading:false, error:result.error});
            }
        });
    }

    _onCancel() {
        this.setState({loading: false, error: null});
    }

    render() {
        return (
            <View style={Styles.container}>
                <View style={[{ flex: 2.5, alignItems: 'center', }]}>
                    <Image style={Styles.icon} source={require('../../../media/smartHi_splash1.png') }/>
                    {/* <Text style={{ fontFamily: 'Pacifico', fontSize: 38, marginTop: 10 }}>Hashtag</Text> */}
                </View>

                <View style={[{ flexDirection: 'row', width: 300, alignItems: 'center', alignItems: "center", justifyContent: "center", marginLeft: 40,marginTop:40 }]}>
                    <TextInput style={[Styles.input, { fontSize: 20, flex: 3 }]}
                        autoCapitalize  = "none"
                        autoCorrect     = {false}
                        placeholder     = "Email"
                        returnKeyType   = "next"
                        onChange        = {this._enterUserName.bind(this) }
                        />
                    <View style={{ flex: 1, alignItems: 'center', alignItems: "center" }}>
                        <Image style={{ margin: 9, width: 30, height: 30 }} source={require("../../../media/mailicon1.png") }/>
                    </View>
                </View>

                <View style={{ borderWidth: 1, borderColor: "#dddddd", width: 280, alignItems: 'center', alignItems: "center", justifyContent: "center", left: 44 }}/>

                <View style={[{ flexDirection: 'row', width: 300, alignItems: 'center', alignItems: "center", justifyContent: "center", marginLeft: 40, marginTop: 25 }]}>
                    <TextInput style={[Styles.input, { fontSize: 20, flex: 3 }]}
                        password        = {true}
                        autoCapitalize  = "none"
                        autoCorrect     = {false}
                        placeholder     = "Password"
                        onChange        = {this._enterUserPassword.bind(this) }
                        />
                    <View style={{ flex: 1, alignItems: 'center', alignItems: "center" }}>
                        <Image style={{ margin: 9, width: 32, height: 30 }} source={require("../../../media/passwordIcon.png") }/>
                    </View>
                </View>

                <View style={{ borderWidth: 1, borderColor: "#dddddd", width: 280, alignItems: 'center', alignItems: "center", justifyContent: "center", left: 44 }}/>

                <View style={[Styles.container]}>
                    <TouchableOpacity style={Styles.loginButton} onPress={this._submit.bind(this) }>
                        <Text style={{ color: "white", fontFamily: "Avenir Next", fontSize: 18 }}> LOGIN </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{width:200,height:50,backgroundColor:'#A4DC10',borderRadius:40,justifyContent:'center'}} onPress={()=>this._goToAnotherScene()}>
                      <Text style={{alignSelf:'center',color:'white',fontSize:18}}>YES</Text>
                    </TouchableOpacity> */}

                    <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                        <Text style={{ color: "red", fontSize: 16, justifyContent: "center" }}>{this.state.showMessage ? this.props.userMessage : ""}</Text>
                    </View>
                </View>
                <HerbyNotification showBusy={this.state.loading} message={this.state.error}/>
                </View>
        );
    }
}


const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    icon: {
      marginTop: 100,
      height: 260 ,
      width: 300,
    },

    separator: {
        height: 2,
        backgroundColor: '#dddddd'
    },

    loginButton: {
        flex: 1,
        height: 40,
        marginHorizontal: 50,
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 40,
        backgroundColor: '#15b4f1',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    signUpButton: {
        flex: 1,
        height: 52,
        marginHorizontal: 30,
        marginTop: 0,
        marginBottom: 10,
        borderRadius: 3,
        backgroundColor: '#50E3C2',
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
        height: 30,
        fontSize: 10,
        marginHorizontal: 10,
        textAlign: 'left',
        margin: 10,
        backgroundColor: 'white',

    },
});


// BatsFix. This function is used to convert state to props passed to this component
// In this example, there is now prop called user that contains state.UserReducer.user section
// Why is it UserReducer???
function mapStateToProps(state) { return { userMessage: state.UserReducer.message } }
// BatsFix. This function is used to convert action to props passed to this component.
// In this example, there is now prop called LoginAction.
function mapActionToProps(dispatch) { return bindActionCreators({ LoginAction, LogoffAction }, dispatch); }

module.exports = connect(mapStateToProps, mapActionToProps)(LoginScene);
