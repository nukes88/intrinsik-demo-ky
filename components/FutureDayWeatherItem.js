import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { mainStyle } from '../Config';

function FutureDayWeatherItem({ item, onPress }) {
    let { dateStr, minTemp, maxTemp, forecast } = item;

    // donno but round up
    let rMinTemp = Math.ceil(minTemp);
    let rMaxTemp = Math.ceil(maxTemp);
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() => onPress(dateStr)}
        >
            <Text style={[mainStyle.textColor, styles.biggerText]}>{dateStr}</Text>
            <Text style={[mainStyle.textColor]}>{rMinTemp}{'\u00b0'}C - {rMaxTemp}{'\u00b0'}C</Text>
            <Text style={[mainStyle.textColor]}>{forecast}</Text>
        </TouchableOpacity>
    )
}

export default FutureDayWeatherItem;

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'cyan'
    },
    biggerText: {
        fontSize: 18
    }
})