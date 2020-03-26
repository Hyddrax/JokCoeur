//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
// import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
//import all the basic component we have used

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomCard from "../components/CustomCard";
import CustomCarousel from '../components/CustomCarousel';

export default class JournalScreen extends React.Component {
    //Detail Screen to show from any Open detail button
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cardRow}>
                    {/* <CustomCard uri={require("../assets/test.jpg")} /> */}
                    <CustomCard uri={{ uri: 'https://media.discordapp.net/attachments/643737938735267843/646626060934447125/confiance.png?width=888&height=630' }} />
                    <CustomCard uri={{ uri: 'https://media.discordapp.net/attachments/643737938735267843/646626061341163530/honte.png?width=510&height=630' }} />

                </View>
                <View style={styles.cardRow}>
                    <CustomCard uri={{ uri: 'https://media.discordapp.net/attachments/643737938735267843/646626057654370304/curiosite.png?width=640&height=630' }} />
                    <CustomCard uri={{ uri: 'https://media.discordapp.net/attachments/643737938735267843/646626029103874048/amour.png?width=726&height=631' }} />
                </View>
                <View style={styles.caroussel}><CustomCarousel /></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 7,
        backgroundColor: "#fff",
    },
    cardRow: {
        display: 'flex',
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        justifyContent: "space-between",
        padding: '6%',
    },
    caroussel: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});