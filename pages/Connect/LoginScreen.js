import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SignInForm from "./SignInForm"

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: "SignIn",
        headerLeft: () => {
            <View />
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <SignInForm {...this.props} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});