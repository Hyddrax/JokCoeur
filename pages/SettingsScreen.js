//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
//import all the basic component we have used

import Icon from 'react-native-vector-icons/FontAwesome';

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notificationsState: false,
        };
    }


    render() {
        return (
            <View style={styles.background}>

                <View style={{ flex: 1 }}>
                </View>

                <View style={{ flex: 4 }}>
                    <TouchableOpacity style={styles.borderStyleTop}
                        onPress={() => {
                            this.props.navigation.navigate('MyAccount');
                        }}
                    >
                        <View style={{ flex: 1 }} />
                        <Icon name="user-circle-o" color="#000" size={20} style={styles.icon} />
                        <Text style={styles.Text1}> Mon compte </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.borderStyle}
                        onPress={() => {
                            this.setState({
                                notificationsState: !this.state.notificationsState,
                            })
                        }}
                    >
                        <View style={{ flex: 1 }} />
                        <Icon name={"bell-" + (this.state.notificationsState ? "" : "slash-") + "o"} color="#000" size={20} style={styles.icon} />
                        <Text style={styles.Text1}> Recevoir les notifications </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.borderStyle}
                        onPress={() => {
                            this.props.navigation.navigate('Contact');
                        }}
                    >
                        <View style={{ flex: 1 }} />
                        <Icon name="envelope" color="#000" size={20} style={styles.icon} />
                        <Text style={styles.Text1}> Nous Contacter </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.borderStyle}
                        onPress={() => {
                            this.props.navigation.navigate('About');
                        }}
                    >
                        <View style={{ flex: 1 }} />
                        <Icon name="exclamation-circle" color="#000" size={20} style={styles.icon} />
                        <Text style={styles.Text1}> A propos de </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.borderStyle}
                        onPress={() => {
                            //TODO exit session
                            this.props.navigation.navigate('SignIn');
                        }}
                    >
                        <View style={{ flex: 1 }} />
                        <Icon name="sign-out" color="#000" size={20} style={styles.icon} />
                        <Text style={styles.Text1}> Deconnexion </Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    Text1: {
        flex: 7,
        color: '#000',
        fontSize: 30,
        fontWeight: '500',

    },
    background: {
        display: "flex",
        flex: 1,
        backgroundColor: '#fff',
    },
    borderStyle: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 3,

    },
    borderStyleTop: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 3,

    },
    icon: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",



    }
})