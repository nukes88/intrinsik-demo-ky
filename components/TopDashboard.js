import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { mainStyle, weatherIconsURL } from '../Config';
import ImageWithLoader from './ImageWithLoader';

function TopDashboard(props) {

    // donno but round up
    let temperature = Math.ceil(props.temperature)

    switch (props.screen) {
        case 'main':
            return (
                <View style={styles.container}>
                    <Text style={[styles.infoText, mainStyle.textColor]}>{props.city}</Text>
                    <Text style={[styles.infoText, mainStyle.textColor]}>{props.todayDate}</Text>
                    <Text style={[styles.temperatureText, mainStyle.textColor]}>{temperature}{'\u00b0'}C</Text>
                    <Text style={[styles.infoText, mainStyle.textColor]}>{props.forecast}</Text>
                </View>
            )
            break;
        case 'day':
            let iconURL = `${weatherIconsURL}${props.iconName}@4x.png`;
            return (
                <View style={styles.container}>
                    <Text style={[styles.infoText, mainStyle.textColor]}>{props.city}</Text>
                    <Text style={[styles.infoText, mainStyle.textColor]}>{props.todayDate}</Text>
                    <Text style={[styles.infoText, mainStyle.textColor, styles.dayForecast]}>{props.forecast}</Text>
                    <ImageWithLoader
                        style={[mainStyle.icon, styles.icon]}
                        source={iconURL}
                        loaderSize="large"
                    />
                    <Text style={[styles.temperatureText, mainStyle.textColor]}>{temperature}{'\u00b0'}C</Text>

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
    },
    dayForecast: {
        marginTop: 20
    },
    icon: {
        marginTop: 6,
        width: 100,
        height: 100,
    }
})