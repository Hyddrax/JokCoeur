import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignInForm extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 6 }}>
                    <View style={styles.lineStyle}>
                        <Icon
                            name="user-circle-o"
                            color="#000"
                            size={45}
                            style={styles.icon}
                        />
                        <TextInput placeholder="Prénom & Nom" style={styles.input} />
                    </View>

                    <View style={styles.lineStyle}>
                        <Icon name="envelope" color="#000" size={45} style={styles.icon} />
                        <TextInput placeholder="Email" style={styles.input} />
                    </View>

                    <View style={styles.lineStyle}>
                        <Icon name="key" color="#000" size={45} style={styles.icon} />
                        <TextInput
                            placeholder="Mot de Passe"
                            secureTextEntry={true}
                            style={styles.input}
                        />

                        <TouchableOpacity style={styles.btnEye} onPress={this.onPress}>
                            <Icon name="eye-slash" size={30} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.butt}>
                        <TouchableOpacity style={styles.button} onPress={() => this.validateConnection}>
                            <Text> SignIn </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignUp')}>
                            <Text> SignUp </Text>
                        </TouchableOpacity>
                        <Text style={styles.text1}> Conditions générales </Text>
                    </View>
                </View>
            </View >
        );
    }

    validateConnection() {
        let connectionOK = false;
        //Check in BDD if user Exist and then check MDP is OK
        connectionOK = true; //Bouchon
        if (connectionOK) {
            this.props.navigation.navigate('Main');
        } else {
            //Afficher connection Failed
        }
    }

}
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        flex: 8,
        height: 40,
        backgroundColor: 'rgba(255,255,255,100)',
        marginBottom: 10,
        color: '#000',
        paddingHorizontal: 10,
        borderRadius: 18,
    },

    icon: {
        display: 'flex',
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lineStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text1: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 14,
    },
    butt: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    button: {
        height: 45,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 18,
    },
    btnEye: {
        position: 'absolute',
        top: 8,
        right: 37,
    },
});
