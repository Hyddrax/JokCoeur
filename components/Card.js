import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Slider from "react-native-slider";


export default class CustomCard extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <Card style={styles.card}>
                    <Card.Cover source={this.props.uri} />
                </Card>
                <Slider
                    step='1'
                    style={{ width: 120, height: 30 }}
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#ffffff"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        width: 120,
        margin: 20,
        backgroundColor: '#000',
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 2 }

    }
});
