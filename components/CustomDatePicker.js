import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
export default class CustomDatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date || null,
            show: false,
            mode: 'date',
            placeHolder: this.props.placeHolder || "placeHolder Undefined",
            placeHolderStatus: this.props.date == null ? true : false,
        };
    }

    onChangeDate = (event, selectedDate) => {
        this.setState({
            date: selectedDate,
            show: !this.state.show
        })

        if (selectedDate === undefined && event.type == "dismissed") {
            this.setState({
                placeHolderStatus: true,
            })
        } else {
            this.setState({
                placeHolderStatus: false,
            })
        }

        this.props.callBack(selectedDate);
    }

    toggleDate = () => {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        Moment.updateLocale('fr', {
            months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
            monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
            weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
            weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
            weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
            longDateFormat: {
                LT: "HH:mm",
                LTS: "HH:mm:ss",
                L: "DD/MM/YYYY",
                LL: "D MMM YYYY",
                LLL: "D MMMM YYYY LT",
                LLLL: "ddd D MMMM YYYY"
            }
        });
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.dateInput} onPress={this.toggleDate}>
                    <Text style={this.state.placeHolderStatus ? styles.dateTextPlaceHolder : styles.dateText}>{this.state.date ? Moment(this.state.date).format('LLLL') : this.state.placeHolder}</Text>
                </TouchableOpacity>
                {this.state.show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={this.state.date ? this.state.date : new Date(Date.now())}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.onChangeDate}
                    />
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    dateInput: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#800080",
        height: 40,
        margin: 10,
    },
    dateText: {
        color: "#fff",
        fontWeight: "bold",
    },
    dateTextPlaceHolder: {
        color: "#ccc",
    }
});