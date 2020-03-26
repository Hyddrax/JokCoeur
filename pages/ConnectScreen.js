import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import LoginForm from '../components/LoginForm';

export default class ConnectScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logocontainer}>
                    <Image style={styles.logo}
                        source={require('../assets/test.jpg')} />
                    <Text style={styles.title}> Creer Mon Compte </Text>

                </View>
                <View style={styles.formcontainer}>
                    <LoginForm {...this.props} />
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
        //textAlign : 'center'
    }
});