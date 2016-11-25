//loginscenes.js
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Navigator} from 'react-native'

//get state management components
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//get internal components
import {RegisterUser,LoginAction} from '../../../actions';
import HerbyNotification from '../../util/herbyNotification.js';



class RegisterScene extends Component {
    constructor(props) {
        super(props);
        this._userEmail = "";
        this._userName = "";
        this._userPassword = "";
        this._userPassword2 = "";
        this.state = { loading: false,error: null};
        this._mounted = false;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    componentDidMount() {
        this._mounted = true;
    }

    _enterUserEmail(event) {
        this.setState({ error: null });
        this._userEmail = event.nativeEvent.text;
    }

    _enterUserName(event) {
        this.setState({ error: null });
        this._userName = event.nativeEvent.text;
    }

    _enterUserPassword(event) {
        this.setState({ error: null });
        this._userPassword = event.nativeEvent.text
    }

    _confirmUserPassword(event) {
        this.setState({ error: null });
        this._userPassword2 = event.nativeEvent.text;
    }

    _submit() {
        this.setState({loading:true});
        RegisterUser(this._userEmail,this._userName,this._userPassword,(profile,error)=>{
            if (this._mounted) {
                if (error  == null) {
                    this.setState({loading:false});
                    this.props.LoginAction(profile);
                }
                else {
                    this.setState({loading:false,error:error});
                }
            }
        });
    }

    render() {
        return (
            <View>
                <View style={[{ flex: 1, alignItems: 'center', marginTop: 30 }]}>
                    <Image style={Styles.icon} source={require('../../../media/smartHi_splash1.png') }/>
                    {/* <Text style={{ fontFamily: 'Pacifico', fontSize: 38, marginTop: 10 }}>Hashtag</Text> */}
                </View>

                <View style={{flex:1,alignItems: 'center',marginTop:0, }}>

                <View style={[{ flexDirection: 'row', width: 300, alignItems: 'center', alignItems: "center", }]}>
                    <TextInput style={[Styles.input, { fontSize: 20, flex: 3 }]}
                        autoCapitalize  = "none"
                        autoCorrect     = {false}
                        placeholder     = "Email"
                        returnKeyType   = "next"
                        onChange        = {this._enterUserEmail.bind(this) }
                        />
                    <View style={{ alignItems: 'center', alignItems: "center" }}>
                        <Image style={{ margin: 9, width: 30, height: 30 }} source={require("../../../media/mailicon1.png") }/>
                    </View>
                </View>

                <View style={{ borderWidth: 1, borderColor: "#dddddd", width: 290, alignItems: 'center', alignItems: "center", justifyContent: "center" }}/>

                <View style={[{ flexDirection: 'row', width: 300, alignItems: 'center', alignItems: "center",marginTop:10 }]}>
                    <TextInput style={[Styles.input, { fontSize: 20, flex: 3 }]}
                        autoCapitalize  = "none"
                        autoCorrect     = {false}
                        placeholder     = "Username"
                        returnKeyType   = "next"
                        onChange        = {this._enterUserName.bind(this) }
                        />
                    <View style={{ alignItems: 'center', alignItems: "center" }}>
                        <Image style={{ margin: 9, width: 25+2, height: 33+2 }} source={require("../../../media/userName.png") }/>
                    </View>
                </View>

                <View style={{ borderWidth: 1, borderColor: "#dddddd", width: 290, alignItems: 'center', alignItems: "center", justifyContent: "center" }}/>

                <View style={[{ flexDirection: 'row', width: 300, alignItems: 'center', alignItems: "center",marginTop: 10 }]}>
                    <TextInput style={[Styles.input, { fontSize: 20, flex: 3 }]}
                        password        = {true}
                        autoCapitalize  = "none"
                        autoCorrect     = {false}
                        placeholder     = "Password"
                        onChange        = {this._enterUserPassword.bind(this) }
                        />
                    <View style={{alignItems: 'center', alignItems: "center" }}>
                        <Image style={{ margin: 9, width: 32, height: 30 }} source={require("../../../media/passwordIcon.png") }/>
                    </View>
                </View>

                <View style={{ borderWidth: 1, borderColor: "#dddddd", width: 290, alignItems: 'center', alignItems: "center", justifyContent: "center" }}/>

                <View style={[{ flexDirection: 'row', width: 300, alignItems: 'center', alignItems: "center", marginTop: 10 }]}>
                    <TextInput style={[Styles.input, { fontSize: 20, flex: 3 }]}
                        password        = {true}
                        autoCapitalize  = "none"
                        autoCorrect     = {false}
                        placeholder     = "Comfirm Password"
                        onChange        = {this._confirmUserPassword.bind(this) }
                        />
                    <View style={{  alignItems: 'center', alignItems: "center" }}>
                        <Image style={{ margin: 9, width: 32, height: 30 }} source={require("../../../media/passwordIcon.png") }/>
                    </View>
                </View>

                <View style={{ borderWidth: 1, borderColor: "#dddddd", width: 290, alignItems: 'center', alignItems: "center", justifyContent: "center",  }}/>
                  <View style={{height:30,marginTop:15}}>
                    <TouchableOpacity style={Styles.loginButton}
                        onPress = {this._submit.bind(this) }
                        >
                        <Text style={{ color: "white", fontFamily: "Avenir Next", fontSize: 20, }}> REGISTER </Text>
                    </TouchableOpacity>
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
        marginTop: 40,
        height: 220,
        width: 250,
    },

    loginButton: {
        height: 55,
        width:260,
        marginTop:18,
        borderRadius: 40,
        backgroundColor: '#15b4f1',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent:'center'
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

function mapActionToProps(dispatch) { return bindActionCreators({ LoginAction }, dispatch); }

module.exports = connect(null, mapActionToProps)(RegisterScene);
