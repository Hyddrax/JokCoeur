import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthSession } from 'expo';

import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class SignUpForm extends React.Component {
    constructor(props) {
        super();
        this.state = {
            prenom: "",
            nom: "",
            age: "",
            profession: "",
            email: "",
            password: ""
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>JokCoeur</Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Prénom"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ prenom: text })} />
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
                        placeholder="Age"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ age: text })} />
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

    validateRegistration() {
        let registrationOK = false;
        //Check in BDD if user Exist and then check MDP is OK
        registrationOK = true; //Bouchon

        if (registrationOK) {
            this.props.navigation.navigate('SignIn');
        } else {
            //Afficher registration Failed
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
    }
});