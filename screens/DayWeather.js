import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WeatherContainer from '../containers/WeatherContainer';
import TopDashboard from '../components/TopDashboard';
import WeatherList from '../components/WeatherList';
import DayWeatherItem from '../components/DayWeatherItem';

function DayWeather(props) {

    const Weather = WeatherContainer.useContainer();

    return (
        <View style={styles.container}>
            <TopDashboard
                city={Weather.dayCity}
                todayDate={Weather.dayDate}
                temperature={Weather.dayTemperature}
                forecast={Weather.dayForecast}
                screen="day"
                iconName={Weather.dayIcon}
            />
            <WeatherList
                data={Weather.dayWeather}
                listItem={DayWeatherItem}
            />
        </View>
    )
}

export default DayWeather;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})