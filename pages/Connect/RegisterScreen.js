import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import SignUpForm from "./SignUpForm"

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: "SignUp",
        headerLeft: () => {
            <View />
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <SignUpForm {...this.props} />
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