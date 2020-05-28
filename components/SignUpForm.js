import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthSession } from 'expo';

import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import NumericInput from './NumericInput';


import axios from "axios"

const apiServerIp = 'http://192.168.0.15:3000/api'//TODO change ip with api server ip don't use 'localhost'

export default class SignUpForm extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: "",
            password: "",
            prenom: "",
            nom: "",
            age: 0,
            profession: "",
            showError: false,
            errorMessage: ""
        };
    }

    updateAge(value) {
        this.setState({
            age: value,
        })
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
                        placeholder="Nom"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ nom: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Prénom"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ prenom: text })} />
                </View>
                <View style={styles.inputView} >
                    <NumericInput
                        style={styles.inputText}
                        placeholder="Age"
                        placeholderTextColor="#003f5c"
                        updateValue={this.updateAge.bind(this)}
                    />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Profession"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ profession: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ email: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Mot de Passe"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ password: text })} />
                </View>
                <TouchableOpacity style={styles.signupBtn} onPress={() => this.validateRegistration()}>
                    <Text style={styles.signinText}>SignUp</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signinBtn} onPress={() => this.props.navigation.navigate('SignIn')}>
                    <Text style={styles.signupText}>Signin</Text>
                </TouchableOpacity>


            </View>
        );
    }

    async validateRegistration() {
        let bouchon = false;

        if (!bouchon) {
            let validateFields = this.validateFields();
            if (validateFields.isOk) {
                let url = apiServerIp + '/user/' + this.state.email

                let userApiCall = await axios.get(url)
                    .then((response) => {
                        // console.log(response.data, "response data");

                        return response.data;

                    })
                    .catch(error => console.log(error))

                if (userApiCall != null && userApiCall != undefined) {
                    let users = userApiCall;

                    if (Array.isArray(users) && users.length == 0) {
                        //create User 
                        url = apiServerIp + '/user'

                        userApiCall = await axios.post(url, {
                            email: this.state.email,
                            password: this.state.password,
                            name: this.state.prenom,
                            lastname: this.state.nom,
                            age: this.state.age,
                            profession: this.state.profession
                        }).then((response) => {
                            // console.log(response.data, "response data 2");

                            return response.data;
                        }).catch(error => console.log(error))

                        if (userApiCall != null) {//ret 200
                            this.props.navigation.navigate('SignIn');
                        } else {
                            this.showErrorMsg("Un probleme est survenue lors de la création du compte !");
                        }
                    } else {
                        this.showErrorMsg("Un compte existe déjà avec cette email");
                    }
                } else {
                    this.showErrorMsg("Connection Failed (Database)");
                }
            } else {
                this.showErrorMsg(validateFields.msg);
            }
        } else {
            // SI BOUCHON
            this.props.navigation.navigate('SignIn');
        }


    }

    validateFields() {
        let isOK = true;
        let msg = "";
        if (this.isEmpty(this.state.prenom) && isOK) {//TODO control taille max
            isOK = false;
            msg = "Invalid name"
        }
        if (this.isEmpty(this.state.nom) && isOK) { //TODO control taille max 
            isOK = false;
            msg = "Invalid lastname"
        }
        if ((this.state.age == null || this.state.age == 0 || this.state.age == undefined || this.state.age < 1 || this.state.age > 110) && isOK) {
            isOK = false;
            msg = "Invalid age (1-110)"
        }
        if (this.isEmpty(this.state.profession) && isOK) {//TODO control taille max
            isOK = false;
            msg = "Invalid Profession"
        }
        if (this.isEmpty(this.state.email) && isOK) {//TODO control taille max + email validation
            isOK = false;
            msg = "Invalid Email"
        }
        if ((this.isEmpty(this.state.password) || this.state.password.length < 8) && isOK) {//TODO control taille max 
            isOK = false;
            msg = "Password length must be at least 8 long"
        }
        let ret = { isOk: isOK, msg: msg }
        console.log(ret, "ret");

        return ret;
    }

    isEmpty(value) {
        return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
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
        marginBottom: 30
    },
    inputView: {
        width: "80%",
        height: 30,
        backgroundColor: "#f2f2f2",
        justifyContent: "center",
        marginBottom: 20,
        padding: 20
    },
    inputText: {
        height: 30,
        color: "#800080"
    },
    signupBtn: {
        width: "50%",
        height: 40,
        backgroundColor: "#800080",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },
    signinBtn: {
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
    },
    errorText: {
        fontWeight: "bold",
        color: "#F00"
    }
});