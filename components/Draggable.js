import React, { Component } from "react";
import { StyleSheet, View, Text, PanResponder, Animated } from "react-native";
import CustomCard from "./CustomCard";

export default class Draggable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDraggable: true,
            dropAreaValues: null,
            pan: new Animated.ValueXY(),
            opacity: new Animated.Value(1),
            uri: props.uri,
        };


    }

    componentWillMount() {
        this._val = { x: 0, y: 0 }
        this.state.pan.addListener((value) => this._val = value);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderGrant: (e, gesture) => {
                this.state.pan.setOffset({
                    x: this._val.x,
                    y: this._val.y
                })
                this.state.pan.setValue({ x: 0, y: 0 })
            },
            onPanResponderMove: Animated.event([
                null, { dx: this.state.pan.x, dy: this.state.pan.y }
            ]),
            onPanResponderRelease: (e, gesture) => {
                if (this.isDropArea(gesture)) {
                    Animated.timing(this.state.opacity, {
                        toValue: 0,
                        duration: 1000
                    }).start(() =>
                        this.setState({
                            showDraggable: false
                        })
                    );
                }
            }
        });
    }

    isDropArea(gesture) {
        return gesture.moveY < 200;
    }

    renderDraggable() {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        }
        if (this.state.showDraggable) {
            return (
                <View style={styles.mainContainer}>
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={[panStyle, styles.circle, { opacity: this.state.opacity }]}
                    >
                        <CustomCard uri={{ uri: this.state.uri }} />
                    </Animated.View>
                </View>
            );
        }
    }

    render() {
        return (
            <View>
                {this.renderDraggable()}
            </View>
        );
    }


}

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
    },
    circle: {
        flex: 1,
    },
});