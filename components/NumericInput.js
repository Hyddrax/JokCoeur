import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';
export default class NumericInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
        };
    }

    updateContent(text) {
        text = text.replace(/[^0-9]/g, '')
        this.setState({
            content: text,
        })
        this.props.updateValue(text);
    }

    render() {
        return (
            <TextInput
                style={this.props.style}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.props.placeholderTextColor}
                keyboardType='numeric'
                onChangeText={text => this.updateContent(text)}
                value={this.state.content}
                maxLength={3}
            />
        )
    }
}

const styles = StyleSheet.create({
    inputText: {
        height: 30,
        color: "#800080"
    },
})