import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import SVG from './SVG'
import CustomCheckBox from '../../../components/CustomCheckBox'

import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/Ionicons';
import CustomDatePicker from '../../../components/CustomDatePicker';

import axios from "axios"

const apiServerIp = 'http://192.168.0.15:3000/api'//TODO change ip with api server ip don't use 'localhost'

import { apiBouchon, bouchonStatsData, bouchonEmotList } from '../../../config/Variables';


export default class StatScreen extends React.Component {
  constructor(props) {
    super(props);

    this.dataSource = [];

    this.state = {
      isModalVisible: false,
      isFocus: false,
      data: this.dataSource,
      emotList: [],
      startDate: null,
      endDate: null,
      userId: 3,
    };
  }

  componentDidMount() {
    this.callsApi();
  }

  static navigationOptions = {
    title: "Statistique",
  };

  async callsApi() {
    let bouchon = apiBouchon;

    if (!bouchon) {
      let urlStat = apiServerIp + '/stats/' + this.state.userId
      let urlEmot = apiServerIp + '/emots/'

      if (this.state.startDate != null && this.state.endDate != null) {
        urlStat += "?startDate=" + this.state.startDate + "&endDate=" + this.state.endDate
      } else if (this.state.startDate != null) {
        urlStat += "?startDate=" + this.state.startDate
      } else if (this.state.endDate != null) {
        urlStat += "?endDate=" + this.state.endDate
      }

      let stats = await axios.get(urlStat)
        .then((response) => {
          // console.log(response.data, "response data");
          return response.data;
        })
        .catch(error => console.log(error))

      let emots = await axios.get(urlEmot)
        .then((response) => {
          // console.log(response.data, "response data");
          return response.data;
        })
        .catch(error => console.log(error))


      this.setState({
        data: stats,
        emotList: emots
      })
      this.dataSource = stats
    } else {
      //IF Bonchon
      this.dataSource = bouchonStatsData || [];
      this.setState({
        data: this.dataSource,
        emotList: bouchonEmotList || []
      })
    }
  }

  // data = [[15, "Colère"], [60, "Triste"], [55, "Joie"], [75, "Fatigue"], [30, "Ennuye"], [20, "test"], [85, "test2"], [45, "test3"], [45, "test3"], [45, "test3"], [45, "test3"], [45, "test3"], [45, "test3"]];



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

  updateStartDate = (nDate) => { //TODO check if necessary to get the date here (only need in CustomDatePicker ?)
    this.setState({
      startDate: nDate
    })
    this.callsApi();
  }
  updateEndDate = (nDate) => {
    this.setState({
      endDate: nDate
    })
    this.callsApi();
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

          <View style={styles.dateView}>
            <CustomDatePicker callBack={this.updateStartDate} placeHolder="Date de début" date={this.state.startDate} />
            <CustomDatePicker callBack={this.updateEndDate} placeHolder="Date de fin" date={this.state.endDate} />
          </View>



          <View style={styles.selectModalView}>
            <TouchableOpacity style={styles.selectModalBtn} onPress={this.checkAll}>
              <Text style={styles.exitModalText}>Tout Selectionner</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectModalBtn} onPress={this.unCheckAll}>
              <Text style={styles.exitModalText}>Tout Deselectionner</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.exitModalBtn} onPress={() => { this.modalHandler(false, true) }}>
            <Text style={styles.exitModalText}>Valider</Text>
          </TouchableOpacity>
        </Modal>
        <View style={styles.content}>
          <SVG data={this.state.data} emotList={this.state.emotList} />
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
