import React from 'react';
import { Text, View, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

import { mainStyle } from '../config';


function WeatherItem({ item, onPress }) {
    let { dateStr, minTemp, maxTemp, forecast } = item;
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={onPress}
        >
            <Text style={[mainStyle.textColor, styles.biggerText]}>{dateStr}</Text>
            <Text style={[mainStyle.textColor]}>{minTemp}{'\u00b0'}C - {maxTemp}{'\u00b0'}C</Text>
            <Text style={[mainStyle.textColor]}>{forecast}</Text>
        </TouchableOpacity>
    )
}

function FutureWeatherList(props) {

    function renderItem({ item }) {
        return (
            <WeatherItem
                item={item}
                onPress={props.itemPressed}
            />
        )
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            {
                props.data && props.data.length > 0 ? <>
                    <Text style={[styles.listHeader, mainStyle.textColor]}>Next 7 days</Text>
                    <FlatList
                        data={props.data}
                        renderItem={renderItem}
                        keyExtractor={item => item.dateStr}
                        extraData={props.itemPressed}
                    />
                </> : <Text>No data.</Text>
            }

        </SafeAreaView>
    )
}

export default FutureWeatherList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        width: '100%',
        paddingHorizontal: 10
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'cyan'
    },
    biggerText: {
        fontSize: 18
    },
    listHeader: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})