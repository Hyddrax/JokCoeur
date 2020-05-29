import React from 'react';

import { Text, View, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

import { apiBouchon } from '../../../config/Variables';

export default class MyAccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdition: false,
            email: this.props.email || "test@test.fr",
            password: this.props.password || "1232etst",
            profession: this.props.profession || "test",
            prenom: this.props.name || "test",
            nom: this.props.lastname || "test",
            age: this.props.age || "18",
            showError: false,
            errorMessage: "",

            newEmail: this.props.email || "",
            oldPassword: "",
            newPassword: "",
            newPasswordComfirm: "",
            newProfession: this.props.profession || "",
        };
    }

    static navigationOptions = {
        title: "Mon Compte"
    };

    showErrorMsg(msg) {
        this.setState({
            errorMessage: msg,
            showError: true,
        })
    }

    hideErrorMsg() {
        this.setState({
            errorMessage: "",
            showError: true,
        })
    }

    _renderErrorMsg() {
        if (this.state.showError) {
            return (
                <Text style={styles.errorText} disable={true}>{this.state.errorMessage}</Text>
            )
        } else {
            return null
        }
    }

    async validateUpdate() {
        let bouchon = apiBouchon;

        if (!bouchon) {
            let validateFields = this.validateFields();
            if (validateFields.isOk) {
                let url = apiServerIp + '/user/' + this.state.email

                let userApiCall = await axios.get(url)
                    .then((response) => {
                        // console.log(response.data, "response data");
                        return response.data;
                    })
                    .catch(error => console.log(error))

                if (userApiCall != null && userApiCall != undefined) {
                    let users = userApiCall;

                    if (Array.isArray(users) && users.length == 1) {
                        let user = users[0];

                        if (user.password == this.state.oldPassword) {

                            url = apiServerIp + '/user' + this.state.email

                            userApiCall = await axios.put(url, {
                                email: this.state.newEmail,
                                password: this.state.newPassword,
                                profession: this.state.newProfession
                            }).then((response) => {
                                // console.log(response.data, "response data 2");

                                return response.data;
                            }).catch(error => console.log(error))

                            if (userApiCall != null) {//ret 200
                                this.setState({
                                    isEdition: !this.state.isEdition,
                                })
                            } else {
                                this.showErrorMsg("Un probleme est survenue lors de la mise à jour du compte !");
                            }

                        } else {
                            this.showErrorMsg("Mot de passe Incorrecte !");
                        }
                    } else {
                        if (users.length > 1) {
                            this.showErrorMsg("Plusieur compte semble avoir la même email, merci de contacter le support !");
                        } else {
                            this.showErrorMsg("Email incorrecte ou inconnu !");
                        }
                    }


                } else {
                    this.showErrorMsg("Connection Failed (Database)");
                }
            } else {
                this.showErrorMsg(validateFields.msg);
            }
        } else {
            // SI BOUCHON
            this.setState({
                isEdition: !this.state.isEdition,
            })
        }


    }

    validateFields() {
        let isOK = true;
        let msg = "";

        if (this.isEmpty(this.state.newProfession) && isOK) {//TODO control taille max
            isOK = false;
            msg = "Invalid Profession"
        }
        if (this.isEmpty(this.state.newEmail) && isOK) {//TODO control taille max + email validation
            isOK = false;
            msg = "Invalid Email"
        }
        if ((this.isEmpty(this.state.oldPassword) || this.state.oldPassword.length < 8) && isOK) {//TODO control taille max 
            isOK = false;
            msg = "Password length must be at least 8 long"
        }
        if ((this.isEmpty(this.state.newPassword) || this.state.newPassword.length < 8) && isOK) {//TODO control taille max 
            isOK = false;
            msg = "Password length must be at least 8 long"
        }
        if ((this.isEmpty(this.state.newPasswordComfirm) || this.state.newPasswordComfirm.length < 8) && isOK) {//TODO control taille max 
            isOK = false;
            msg = "Password length must be at least 8 long"
        }

        if (isOK) {
            if (this.state.oldPassword != this.state.newPassword) {
                if (this.state.newPassword != this.state.newPasswordComfirm) {
                    isOK = false;
                    msg = "New password don't mach the comfimation"
                }
            } else {
                isOK = false;
                msg = "New password can't be the same as the old"
            }
        }

        let ret = { isOk: isOK, msg: msg }

        return ret;
    }

    isEmpty(value) {
        return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
    }

    renderEditInfo() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ width: "100%", padding: "5%", paddingTop: "10%" }} >
                    <View style={styles.scrollViewContainer}>
                        <Text style={styles.logo}>JokCoeur</Text>

                        <View>
                            {this._renderErrorMsg()}
                        </View>
                        <View style={styles.inputView} >
                            <TextInput
                                style={styles.inputText}
                                placeholder="New Profession"
                                placeholderTextColor="#003f5c"
                                onChangeText={text => this.setState({ newProfession: text })} />
                        </View>
                        <View style={styles.inputView} >
                            <TextInput
                                style={styles.inputText}
                                placeholder="New Email"
                                placeholderTextColor="#003f5c"
                                onChangeText={text => this.setState({ newEmail: text })} />
                        </View>
                        <View style={styles.inputView} >
                            <TextInput
                                secureTextEntry
                                style={styles.inputText}
                                placeholder="Ancien mot de passe"
                                placeholderTextColor="#003f5c"
                                onChangeText={text => this.setState({ oldPassword: text })} />
                        </View>
                        <View style={styles.inputView} >
                            <TextInput
                                secureTextEntry
                                style={styles.inputText}
                                placeholder="Nouveau mot de Passe"
                                placeholderTextColor="#003f5c"
                                onChangeText={text => this.setState({ newPassword: text })} />
                        </View>
                        <View style={styles.inputView} >
                            <TextInput
                                secureTextEntry
                                style={styles.inputText}
                                placeholder="Nouveau mot de Passe"
                                placeholderTextColor="#003f5c"
                                onChangeText={text => this.setState({ newPasswordComfirm: text })} />
                        </View>

                        <TouchableOpacity style={styles.btn}
                            onPress={() =>
                                this.validateUpdate()
                            }>
                            <Text style={styles.btnText}>Valider</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            this.setState({
                                isEdition: !this.state.isEdition,
                            })
                        }}>
                            <Text style={styles.btnText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View >
        )
    }

    renderInfo() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>JokCoeur</Text>

                <View style={styles.inputView} >
                    <Text style={styles.text}>
                        {this.state.nom}
                    </Text>
                </View>
                <View style={styles.inputView} >
                    <Text style={styles.text}>
                        {this.state.prenom}
                    </Text>
                </View>
                <View style={styles.inputView} >
                    <Text style={styles.text}>
                        {this.state.age}
                    </Text>
                </View>
                <View style={styles.inputView} >
                    <Text style={styles.text}>
                        {this.state.profession}
                    </Text>
                </View>
                <View style={styles.inputView} >
                    <Text style={styles.text}>
                        {this.state.email}
                    </Text>
                </View>
                <View style={styles.inputView} >
                    <Text style={styles.text} secureTextEntry>
                        {this.state.password}
                    </Text>
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => {
                    this.setState({
                        isEdition: !this.state.isEdition,
                    })
                }}>
                    <Text style={styles.btnText}>Modifier</Text>
                </TouchableOpacity>


            </View>
        )
    }

    render() {
        return this.state.isEdition ? this.renderEditInfo() : this.renderInfo()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    scrollViewContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#800080",
        marginBottom: 30
    },
    inputView: {
        width: "80%",
        height: 30,
        backgroundColor: "#f2f2f2",
        justifyContent: "center",
        marginBottom: 20,
        padding: 20
    },
    inputText: {
        height: 30,
        color: "#800080"
    },
    text: {
        color: "#800080"
    },
    btn: {
        width: "50%",
        height: 40,
        backgroundColor: "#800080",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },
    btnText: {
        color: "#fff"
    },
    errorText: {
        fontWeight: "bold",
        color: "#F00"
    }
});