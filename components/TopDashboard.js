import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { mainStyle } from '../config';

function TopDashboard(props) {
    switch (props.screen) {
        case 'main':
            return (
                <View style={styles.container}>
                    <Text style={[styles.infoText, mainStyle.textColor]}>{props.city}</Text>
                    <Text style={[styles.infoText, mainStyle.textColor]}>{props.todayDate}</Text>
                    <Text style={[styles.temperatureText, mainStyle.textColor]}>{props.temperature}{'\u00b0'}C</Text>
                    <Text style={[styles.infoText, mainStyle.textColor]}>{props.forecast}</Text>
                </View>
            )
            break;
        default:
            return (
                null
            )
    }
}

export default TopDashboard;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20
    },
    infoText: {
        fontSize: 20,
    },
    temperatureText: {
        fontSize: 50
    }
})