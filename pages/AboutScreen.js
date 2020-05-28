//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
//import all the basic component we have used

import Icon from 'react-native-vector-icons/FontAwesome';

export default class AboutScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notificationsState: false,
        };
    }

    static navigationOptions = {
        title: "A Propos"
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac libero massa. Pellentesque ut urna commodo, commodo orci in, pulvinar sem. Sed elit ligula, facilisis in odio quis, dapibus blandit nisl. Quisque blandit dictum felis, vitae hendrerit leo lobortis non. Integer laoreet non elit nec placerat. Integer eros velit, ultricies nec mattis sed, dignissim eu libero. Ut varius, velit sed rutrum consectetur, nulla justo lacinia augue, in commodo dui libero id mauris. Nam vitae efficitur nisi, quis mattis mi.

                        Aenean dignissim, justo at molestie porttitor, mi mauris semper odio, at mollis quam tortor et nibh. Vivamus sem ligula, pretium nec orci ac, dictum lobortis leo. Etiam euismod, magna et convallis interdum, nunc nisl aliquet sem, a aliquet lacus nisl at mi. Pellentesque dapibus mauris in ante porttitor, id volutpat lacus pharetra. Vestibulum porttitor blandit justo, vitae vestibulum magna consequat quis. Vestibulum et neque eget arcu iaculis posuere. Phasellus eu urna ac risus aliquam faucibus. Nulla feugiat blandit facilisis. Phasellus non blandit leo, vel interdum dui. Etiam viverra laoreet risus. Vivamus tristique urna quis erat euismod dapibus. Mauris sodales dignissim metus id ultrices. Nullam lacinia augue eu arcu feugiat dictum.
                    </Text>
                </ScrollView>
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
    text: {
        fontSize: 18,
        padding: 20,
        textAlign: "justify",
    }

})