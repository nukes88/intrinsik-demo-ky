import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

import { mainStyle, weatherIconsURL } from '../Config';
import ImageWithLoader from './ImageWithLoader';

function DayWeatherItem({ item }) {

    let { weatherIcon, dateStr, forecast, hour, maxTemp, minTemp, temp } = item;
    let iconURL = `${weatherIconsURL}${weatherIcon}@2x.png`;
    let hourStr = '';
    if (hour < 12) {
        if (hour == 0) {
            hour = 12;
        }
        hourStr = hour + 'AM';
    } else {
        hour -= 12;
        if (hour == 0) {
            hour = 12;
        }
        hourStr = hour + 'PM';
    }


    return (
        <View style={styles.item}>
            <Text>{hourStr}</Text>
            <ImageWithLoader
                style={[mainStyle.icon, styles.icon]}
                source={iconURL}
                loaderSize="small"
            />
            <Text>
                {maxTemp} - {minTemp}
            </Text>
        </View>
    )
}

export default DayWeatherItem;

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 2
    },
    icon: {
        width: 50,
        height: 50
    }
})