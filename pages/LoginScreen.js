import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import SignInForm from '../components/SignInForm';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: "SignIn",
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}> Creer Mon Compte </Text>

                </View>
                <View>
                    <SignInForm {...this.props} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1
    },
    logo: {
        height: 100,
        width: 100,
    },
    title: {
        width: 160,
        marginTop: 20,
        opacity: 0.6
    }
});