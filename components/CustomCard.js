import * as React from 'react';
import { Text, View, StyleSheet, Image, Slider } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
// import Slider from "@react-native-community/slider";


export default class CustomCard extends React.Component {
    constructor(props) {
        super();
        this.state = {
            uri: props.uri,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Card style={styles.card} >
                    <Card.Cover style={styles.cardCover} source={this.state.uri} />
                </Card>
                <Slider
                    step={1}
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor="#800080"
                    maximumTrackTintColor="#000"
                    thumbTintColor="#800080"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        width: "40%",
    },
    card: {
        flex: 7,
        width: "100%",
    },
    cardCover: {
        width: "100%",
        height: "100%",
    },
    slider: {
        flex: 1,
        width: "90%",
    }
});
