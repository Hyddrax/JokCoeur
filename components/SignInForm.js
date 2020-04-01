import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthSession } from 'expo';

import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import axios from "axios"

const apiServerIp = 'http://192.168.0.15:3000/api'


export default class SignInForm extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: "",
            password: "",
            showError: false,
            errorMessage: ""
        };
    }

    showErrorMsg(msg) {
        this.setState({
            errorMessage: msg,
            showError: true,
        })
    }

    hideErrorMsg() {
        this.setState({
            errorMessage: "",
            showError: true,
        })
    }

    _renderErrorMsg() {
        if (this.state.showError) {
            return (
                <Text style={styles.errorText} disable={true}>{this.state.errorMessage}</Text>
            )
        } else {
            return null
        }
    }

    //
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>JokCoeur</Text>
                <View>
                    {this._renderErrorMsg()}
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ email: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password..."
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ password: text })} />
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signinBtn} onPress={() => this.validateConnection()}>
                    <Text style={styles.signinText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signupBtn} onPress={() => this.props.navigation.navigate('SignUp')}>
                    <Text style={styles.signupText}>Signup</Text>
                </TouchableOpacity>
            </View>
        );
    }

    async validateConnection() {
        let bouchon = true;

        if (!bouchon) {
            let url = apiServerIp + '/user/' + this.state.email

            let userApiCall = await axios.get(url)
                .then((response) => {
                    console.log(response.data);

                    return response.data;

                })
                .catch(error => console.log(error))

            if (userApiCall != null && userApiCall != undefined) {
                let users = userApiCall;

                if (Array.isArray(users) && users.length == 1) {
                    let user = users[0];

                    if (user.password == this.state.password) {
                        // console.log("retour OK")
                        this.props.navigation.navigate('Main');
                    } else {
                        this.showErrorMsg("Mot de passe Incorrecte !");
                    }
                } else {
                    if (users.length > 1) {
                        this.showErrorMsg("Plusieur compte semble avoir la même email, merci de contacter le support !");
                    } else {
                        this.showErrorMsg("Email incorrecte ou inconnu !");
                    }
                }
            } else {
                this.showErrorMsg("Merci de saisir votre email !");
                // console.log("Api return Null qsdqsdor undefined");
            }
        } else {
            // SI BOUCHON
            this.props.navigation.navigate('Main');
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#800080",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        height: 50,
        backgroundColor: "#f2f2f2",
        justifyContent: "center",
        marginBottom: 20,
        padding: 20
    },
    inputText: {
        height: 50,
        color: "#800080"
    },
    errorText: {
        height: 50,
        color: "#f11"
    },
    forgot: {
        color: "#800080",
        fontSize: 11
    },
    signinBtn: {
        width: "50%",
        height: 50,
        backgroundColor: "#800080",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    signupBtn: {
        height: 20,
        backgroundColor: "#800080",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        padding: 20,
    },
    signinText: {
        color: "#fff"
    },
    signupText: {
        color: "#fff"
    }
});