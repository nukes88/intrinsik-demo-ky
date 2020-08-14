import React from 'react';
import { Text, View, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

import { mainStyle } from '../Config';


function WeatherList(props) {

    function renderItem({ item }) {
        return (
            <props.listItem
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
                    {
                        props.header ? <Text style={[styles.listHeader, mainStyle.textColor]}>{props.header}</Text> : null
                    }
                    <FlatList
                        data={props.data}
                        renderItem={renderItem}
                        keyExtractor={item => item.dateStr + item.hour}
                    />
                </> : <Text>No data.</Text>
            }

        </SafeAreaView>
    )
}

export default WeatherList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        width: '100%',
        paddingHorizontal: 10
    },
    listHeader: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})