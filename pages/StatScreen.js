import React from 'react';
import { Text, View, StyleSheet, Image, SVGAElement, Button, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';


import SVG from '../components/SVG'
import CustomCheckBox from '../components/CustomCheckBox'

import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/Ionicons';
import { reload } from 'expo/build/Updates/Updates';


export default class StatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isFocus: false,
      data: this.dataSource,
    };
  }

  static navigationOptions = {
    title: "Statistique",
  };

  // data = [[15, "Colère"], [60, "Triste"], [55, "Joie"], [75, "Fatigue"], [30, "Ennuye"], [20, "test"], [85, "test2"], [45, "test3"], [45, "test3"], [45, "test3"], [45, "test3"], [45, "test3"], [45, "test3"]];
  dataSource = [{ value: 30, label: "Colère" }, { value: 60, label: "Triste" }, { value: 55, label: "Joie" }, { value: 75, label: "Fatigue" }, { value: 30, label: "Ennuye" }]

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
  }

  checkBoxHandler = (props) => {
    if (!props.checked) {

      if (this.state.data.find(element => element.label == props.idEmot) == undefined) {

        this.setState({
          data: this.state.data.concat(this.dataSource.find(elem => elem.label == props.idEmot))
        });
      }
    } else {
      if (this.state.data.find(element => element.label == props.idEmot) != undefined) {

        this.setState({
          data: this.state.data.filter((elem) => {
            return elem.label !== props.idEmot;
          })
        });
      }
    }
  }

  checkAll = () => {
    this.setState({
      data: this.dataSource
    })
  }

  unCheckAll = () => {
    this.setState({
      data: []
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modalButtonView}>
          <TouchableOpacity style={[styles.modalButton, this.state.isFocus ? { backgroundColor: "#800080" } : {}]}
            onPress={() => { this.modalHandler(true, true) }}
            onPressIn={() => { this.modalHandler(true, false) }}
            onPressOut={() => { this.modalHandler(false, false) }}>
            <Icon name="md-menu" size={40} style={styles.iconMenu} />
          </TouchableOpacity>
        </View>
        <Modal isVisible={this.state.isModalVisible} style={{ backgroundColor: 'rgba(200,200,200,0.85)', flex: 1 }}>
          <ScrollView style={styles.scrollView}>
            {this.dataSource.map((prop, key) => {
              return (
                <CustomCheckBox key={key} title={prop.label} idEmot={prop.label} checked={this.state.data.find(element => element.label == prop.label) != undefined} callBack={this.checkBoxHandler} />
              );
            })}
          </ScrollView>
          <View style={styles.selectModalView}>
            <TouchableOpacity style={styles.selectModalBtn} onPress={this.checkAll}>
              <Text style={styles.exitModalText}>Tout Selectionner</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectModalBtn} onPress={this.unCheckAll}>
              <Text style={styles.exitModalText}>Tout Deselectionner</Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            {/* Input Type Date  */}
          </View>

          <TouchableOpacity style={styles.exitModalBtn} onPress={() => { this.modalHandler(false, true) }}>
            <Text style={styles.exitModalText}>Valider</Text>
          </TouchableOpacity>
        </Modal>
        <View style={styles.content}>
          <SVG data={this.state.data} />
        </View>
      </View >
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    alignContent: 'center',
    alignItems: 'center',
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  modalButton: {
    width: '20%',
    aspectRatio: 1,
    borderRadius: 180,
    borderWidth: 1,
    borderColor: "#800080",
    alignItems: "center",
    justifyContent: "center",
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
    padding: 10,
    margin: 10,
  },
  exitModalText: {
    color: "#fff"
  }
});
