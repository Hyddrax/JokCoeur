import * as React from 'react';
import { View, StyleSheet, Slider } from 'react-native';
import { Card } from 'react-native-paper';
// import Slider from "@react-native-community/slider";
export default class CustomCard extends React.Component {
    constructor(props) {
        super();
        this.state = {
            uri: props.uri,
            sliderVisibility: props.sliderVisibility == undefined ? true : false,
            index: props.index == undefined ? -1 : props.index,
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            uri: props.uri,
            index: props.index,
        };
    }

    render() {

        return (
            <View style={styles.container}>
                {this.state.uri != null && (
                    <View style={{ width: "100%", height: "100%" }}>
                        <Card style={styles.card} >
                            <Card.Cover style={styles.cardCover} source={this.state.uri} />
                        </Card>
                        {this.state.sliderVisibility && (
                            <Slider
                                step={10}
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={100}
                                onValueChange={(val) => {
                                    if (this.props.callBack != undefined) {
                                        this.props.callBack(this.state.index, val);
                                    }
                                }}
                                minimumTrackTintColor="#800080"
                                maximumTrackTintColor="#000"
                                thumbTintColor="#800080"
                            />
                        )}

                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 7,
        width: "100%",
    },
    cardCover: {
        flex: 1,
    },
    slider: {
        flex: 1,
        width: "90%",
    }
});
