import * as React from 'react';
import { StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements'
export default class CustomCheckBox extends React.Component {
    constructor(props) {
        super();
        this.state = {
            title: props.title,
            idEmot: props.idEmot,
            checked: props.checked,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return nextProps
    }

    onPressHandler = () => {
        this.setState({ checked: !this.state.checked }, () => {
            this.props.callBack(this.state)
        })
    }

    render() {
        return (
            <CheckBox
                title={this.state.title}
                checked={this.state.checked}
                onPress={() => { this.onPressHandler() }}
            />
        );
    }
}

const styles = StyleSheet.create({

});
