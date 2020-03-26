import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';

const { width } = Dimensions.get('window');

const data = [
    {
        uri: 'https://media.discordapp.net/attachments/643737938735267843/646626060934447125/confiance.png?width=888&height=630',
    },
    {
        uri: 'https://media.discordapp.net/attachments/643737938735267843/646626061341163530/honte.png?width=510&height=630',
    },
    {
        uri: 'https://media.discordapp.net/attachments/643737938735267843/646626057654370304/curiosite.png?width=640&height=630',
    },
    {
        uri: 'https://media.discordapp.net/attachments/643737938735267843/646626029103874048/amour.png?width=726&height=631',

    },
    {
        uri: 'https://media.discordapp.net/attachments/643737938735267843/646626062914289680/peur.png?width=603&height=630',

    }
];

export default class ImageCarousel extends Component {
    renderItem = ({ item, index }) => {
        const { uri, title, content } = item;
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.item}
                onPress={() => {
                    this.numberCarousel.scrollToIndex(index);
                }}
            >
                <ImageBackground
                    source={{ uri: uri }}
                    style={styles.imageBackground}
                >

                </ImageBackground>

            </TouchableOpacity>
        );
    };

    render() {
        return (
            <Carousel
                style={styles.carousel}
                data={data}
                renderItem={this.renderItem}
                itemWidth={0.5 * width}
                inActiveOpacity={0.3}
                containerWidth={width - 0}
                ref={(c) => {
                    this.numberCarousel = c;
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    carousel: {
        flex: 1,
        backgroundColor: '#141518'
    },
    item: {
        borderWidth: 2,
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        borderColor: 'white',
        elevation: 3
    },
    imageBackground: {
        flex: 2,
        backgroundColor: '#EBEBEB',
        borderWidth: 2,
        borderColor: 'white'
    }
});