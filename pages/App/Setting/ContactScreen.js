import React from 'react';

import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default class ContactScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
        };
    }

    static navigationOptions = {
        title: "Nous Contacter"
    };

    sendMsg() {
        //TODO call api to send mail to support
        this.setState({
            text: ""
        })
        this.textInput.clear();
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputText}
                    multiline={true}
                    placeholder="Ecrivez votre message ..."
                    placeholderTextColor="#003f5c"
                    maxLength={255}
                    ref={input => { this.textInput = input }}
                    onChangeText={text => {
                        if (text.length > 0) {
                            //Toast
                        }
                        this.setState({ text: text })
                    }} />
                <TouchableOpacity style={styles.btn}
                    onPress={() => {
                        this.sendMsg()
                    }}>
                    <Text style={styles.btnText}>Valider</Text>
                </TouchableOpacity>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: '#fff',
    },
    inputText: {
        backgroundColor: "#f2f2f2",
        fontSize: 18,
        textAlignVertical: "top",
        height: "50%",
        padding: 15,
        margin: 20,
        textAlign: "justify",
    },
    btn: {
        width: "50%",
        height: 40,
        backgroundColor: "#800080",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10
    },
    btnText: {
        color: "#fff"
    },

})