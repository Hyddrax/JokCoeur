//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
// import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
//import all the basic component we have used

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomCard from "../components/Card";
import ImageCarousel from '../components/Caroussel';

export default class JournalScreen extends React.Component {
    //Detail Screen to show from any Open detail button
    render() {
        return (
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "purple", flex: 1, }}>
                <View style={{ flexDirection: "row", flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "green", width: "100%" }}>
                    {/* <CustomCard uri={require("../assets/test.jpg")} /> */}
                    <CustomCard uri={{ uri: 'https://media.discordapp.net/attachments/643737938735267843/646626060934447125/confiance.png?width=888&height=630' }} />
                    <CustomCard uri={{ uri: 'https://media.discordapp.net/attachments/643737938735267843/646626061341163530/honte.png?width=510&height=630' }} />

                </View>
                {/* <View><ImageCarousel /></View> */}
                <View style={{ flexDirection: "row", flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "red", width: "100%", }}>
                    <CustomCard uri={{ uri: 'https://media.discordapp.net/attachments/643737938735267843/646626057654370304/curiosite.png?width=640&height=630' }} />
                    <CustomCard uri={{ uri: 'https://media.discordapp.net/attachments/643737938735267843/646626029103874048/amour.png?width=726&height=631' }} />
                </View>
            </View>
        );
    }
}