//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
//import all the basic component we have used

import Icon from 'react-native-vector-icons/FontAwesome';

export default class SettingsScreen extends React.Component {
    //Setting Screen to show in Setting Option
    render() {
        return (
            <View style={styles.background}>

                <View style={{ flex: 1 }}>
                </View>

                <View style={{ flex: 4 }}>

                    <View style={styles.borderStyleTop}>
                        <View style={{ flex: 1 }} />
                        <Icon name="user-circle-o" color="#000" size={20} style={styles.icon} />
                        <Text style={styles.Text1}> Mon compte </Text>
                    </View>

                    <View style={styles.borderStyle}>
                        <View style={{ flex: 1 }} />
                        <Icon name="bell-slash-o" color="#000" size={20} style={styles.icon} />
                        <Text style={styles.Text1}> Recevoir les notifications </Text>
                    </View>

                    <View style={styles.borderStyle}>
                        <View style={{ flex: 1 }} />
                        <Icon name="exclamation-circle" color="#000" size={20} style={styles.icon} />
                        <Text style={styles.Text1}> A propos de </Text>
                    </View>

                    <View style={styles.borderStyle}>
                        <View style={{ flex: 1 }} />
                        <Icon name="sign-out" color="#000" size={20} style={styles.icon} />
                        <Text style={styles.Text1}> Deconnexion </Text>
                    </View>
                </View>
            </View>
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