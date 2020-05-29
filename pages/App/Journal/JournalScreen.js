import React from 'react';

import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CustomCard from "../../../components/CustomCard";
import Modal from 'react-native-modal';

import axios from "axios"

const apiServerIp = 'http://192.168.0.15:3000/api'//TODO change ip with api server ip don't use 'localhost'

export default class JournalScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalVisible: false,
            isFocus: false,
            itemUsed: [null, null, null, null],
            currentIndex: null,

        };
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    modalHandler = (isFocus, isPressed, elem) => {
        if (isFocus) {
            this.setState({ isFocus: true });
        } else {
            this.setState({ isFocus: false });
        }

        if (isPressed) {
            this.toggleModal();
        }

        if (elem != null) {
            let tmp = this.state.itemUsed
            tmp[this.state.currentIndex] = elem
            this.setState({
                itemUsed: tmp
            })
        }

    }

    dataSource = [
        {
            emotId: 1,
            value: 0,
            uri: 'https://media.discordapp.net/attachments/643737938735267843/646626060934447125/confiance.png?width=888&height=630',
        },
        {
            emotId: 2,
            value: 0,
            uri: 'https://media.discordapp.net/attachments/643737938735267843/646626061341163530/honte.png?width=510&height=630',
        },
        {
            emotId: 3,
            value: 0,
            uri: 'https://media.discordapp.net/attachments/643737938735267843/646626057654370304/curiosite.png?width=640&height=630',
        },
        {
            emotId: 4,
            value: 0,
            uri: 'https://media.discordapp.net/attachments/643737938735267843/646626029103874048/amour.png?width=726&height=631',

        },
        {
            emotId: 5,
            value: 0,
            uri: 'https://media.discordapp.net/attachments/643737938735267843/646626062914289680/peur.png?width=603&height=630',

        }
    ];

    emotZoneEditValue = (index, val) => {
        let tmp = this.state.itemUsed
        tmp[index].value = val
        this.setState({
            itemUsed: tmp
        })

    }

    renderEmotZone(index) {
        return (
            <TouchableOpacity style={[this.state.itemUsed[index] == null ? styles.modalButton : styles.card, this.state.isFocus && this.state.currentIndex == index ? { backgroundColor: "#800080" } : { backgroundColor: "#eee" }]}
                onPress={() => {
                    this.setState({
                        currentIndex: index
                    })
                    this.modalHandler(true, true)
                }}
                onPressIn={() => {
                    this.setState({
                        currentIndex: index
                    })
                    this.modalHandler(true, false)
                }}
                onPressOut={() => {
                    this.modalHandler(false, false)
                }}>
                <CustomCard uri={this.state.itemUsed[index]} index={index} callBack={this.emotZoneEditValue} />

            </TouchableOpacity>
        )
    }

    render() {
        let itemAvailable = this.dataSource.filter(x => !this.state.itemUsed.includes(x));
        let index = 0;
        return (
            <View style={styles.container}>


                <Modal isVisible={this.state.isModalVisible} style={{ backgroundColor: 'rgba(200,200,200,0.85)', flex: 1 }}>
                    <ScrollView style={styles.scrollView}>
                        {itemAvailable.map((prop, key) => {
                            return (
                                <TouchableOpacity key={key}
                                    onPress={() => { this.modalHandler(false, true, prop) }}
                                    onPressIn={() => { this.modalHandler(true, false) }}
                                    onPressOut={() => { this.modalHandler(false, false) }}>
                                    <CustomCard uri={prop} sliderVisibility={false} />
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    <TouchableOpacity style={styles.exitModalBtn}
                        onPress={() => {
                            let tmp = this.state.itemUsed
                            tmp[this.state.currentIndex] = null
                            this.setState({
                                itemUsed: tmp
                            })
                            this.modalHandler(false, true)
                        }}>
                        <Text style={styles.exitModalText}>Déselectionner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.exitModalBtn} onPress={() => {
                        this.modalHandler(false, true)
                    }}>
                        <Text style={styles.exitModalText}>Anuler</Text>
                    </TouchableOpacity>

                </Modal>

                <View style={styles.cardRow}>
                    {this.renderEmotZone(0)}
                    {this.renderEmotZone(1)}
                </View>

                <View style={styles.cardRow}>
                    {this.renderEmotZone(2)}
                    {this.renderEmotZone(3)}
                </View>
                <TouchableOpacity style={styles.exitModalBtn}
                    onPress={() => {
                        let tmp = []
                        this.state.itemUsed.forEach(element => {
                            if (element != null) {
                                tmp = [...tmp, {
                                    userId: "3",
                                    emotId: element.emotId,
                                    emotValue: element.value
                                }]
                            }
                        });
                        this.callApiInsertData(tmp);
                    }}>
                    <Text style={styles.exitModalText}>Valider</Text>
                </TouchableOpacity>
            </View>
        );
    }

    async callApiInsertData(data) {

        if (data.length > 0) {
            let url = apiServerIp + '/stats/'

            let retApiCall = await axios.post(url, data)
                .then((response) => {
                    return response.data;
                })
                .catch(error => console.log(error))

            if (retApiCall != null) {//ret 200
                this.setState({
                    itemUsed: [null, null, null, null]
                })
            }
        }

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
        justifyContent: "space-around",
        padding: '6%',
    },
    caroussel: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropZone: {
        backgroundColor: "#00334d",
        width: "40%"
    },
    text: {
        marginTop: 25,
        marginLeft: 5,
        marginRight: 5,
        textAlign: "center",
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold"
    },

    modalButton: {
        width: '20%',
        aspectRatio: 1,
        borderRadius: 180,
        borderWidth: 1,
        borderColor: "#800080",
        backgroundColor: "#eee",
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        width: '40%',
        borderWidth: 1,
        borderColor: "#800080",
    },
    iconMenu: {
        color: '#000',
    },
    scrollView: {
        flex: 1,
    },
    selectModalView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    selectModalBtn: {
        alignItems: "center",
        backgroundColor: "#800080",
        height: 40,
        padding: 10,
    },
    exitModalBtn: {
        backgroundColor: "#800080",
        alignItems: "center",
        justifyContent: 'center',
        height: 40,
        margin: 10,
    },
    exitModalText: {
        color: "#fff"
    },
    dateView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }

});