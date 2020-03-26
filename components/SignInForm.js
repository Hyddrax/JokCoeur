import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthSession } from 'expo';

import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class SignInForm extends React.Component {
    constructor(props) {
        super();
        this.state = {
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

    validateConnection() {
        let connectionOK = false;
        //Check in BDD if user Exist and then check MDP is OK
        connectionOK = true; //Bouchon

        if (connectionOK) {
            this.props.navigation.navigate('Main');
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