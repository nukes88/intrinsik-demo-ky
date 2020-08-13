import React, { useState, useEffect } from 'react';
import {
    View, Text, Button, StyleSheet, Alert, SafeAreaView, ActivityIndicator
} from 'react-native';
import UserContainer from '../containers/UserContainer';
import { mainStyle, weatherApiURL, weatherApiKey } from '../config';
import TopDashboard from '../components/TopDashboard';
import { getDateFormatStr } from '../components/Dates';
import { parseFetch } from '../components/Fetcher';
import FutureWeatherList from '../components/FutureWeatherList';


function Home({ navigation }) {

    const User = UserContainer.useContainer();

    const malaysianCities = [
        'Kuala Lumpur',
        'Johor',
        'Selangor',
        'Melaka',
        'Negeri Sembilan',
        'Pulau Pinang'
    ]
    let [selectedCity, setSelectedCity] = useState(malaysianCities[0]);
    let [selectedDate, setSelectedDate] = useState();
    let [selectedTemperature, setSelectedTemperature] = useState();
    let [selectedForecast, setSelectedForecast] = useState();
    let [selectedCityLat, setSelectedCityLat] = useState();
    let [selectedCityLong, setSelectedCityLong] = useState();

    let [loadingDashboard, setLoadingDashboard] = useState(false);
    let [loadingList, setLoadingList] = useState(false);

    let [weatherData, setWeatherData] = useState();
    let [futureWeatherData, setFutureWeatherData] = useState();

    let [futureWeatherList, setFutureWeatherList] = useState([]);



    /**
     * Using the free weather api: https://openweathermap.org/api
     * The city list is a json in the assets folder
     */
    async function getCurrentWeather() {
        setLoadingDashboard(true);
        try {
            let fetchStr = `${weatherApiURL}weather?q=${selectedCity}&appid=${weatherApiKey}&units=metric`;
            let weatherData = await parseFetch(fetchStr);
            setWeatherData(weatherData);
        } catch (e) {
            // console.error('get weather error', e)
            Alert.alert(
                'Get current weather error!',
                e.toString()
            )
        } finally {
            setLoadingDashboard(false);
        }
    }

    useEffect(() => {
        getCurrentWeather();
    }, [])

    useEffect(() => {
        if (weatherData) {
            let d = weatherData;
            console.log(d)
            setSelectedCity(d.name);
            let dtStr = getDateFormatStr(new Date((d.dt) * 1000));
            setSelectedDate(dtStr)
            setSelectedTemperature(d.main.temp)
            setSelectedForecast(d.weather[0] ? d.weather[0].main : 'N/a')

            // luckily this returns from the call
            setSelectedCityLat(d.coord.lat)
            setSelectedCityLong(d.coord.lon)
        }
    }, [weatherData])

    /**
     * free version only gets 7 days
     */
    async function getFutureWeather() {
        if (!selectedCityLat || !selectedCityLong) {
            Alert.alert(
                'Get future weather error!',
                'No latitude or longitude!'
            )
            return;
        }

        setLoadingList(true);
        try {
            let fetchStr = `${weatherApiURL}onecall?lat=${selectedCityLat}&lon=${selectedCityLong}&appid=${weatherApiKey}&units=metric`;
            console.log(fetchStr);
            let weatherData = await parseFetch(fetchStr);
            console.log('future weather', weatherData.daily);
            setFutureWeatherData(weatherData.daily);
        } catch (e) {
            Alert.alert(
                'Get future weather error!',
                e.toString()
            )
        } finally {
            setLoadingList(false);
        }
    }

    useEffect(() => {
        if (selectedCityLat && selectedCityLong) {
            getFutureWeather();
        }
    }, [selectedCityLat, selectedCityLong])

    useEffect(() => {
        if (futureWeatherData) {
            let summarisedList = futureWeatherData.map(d => {
                let dtStr = getDateFormatStr(new Date((d.dt) * 1000));
                return {
                    dateStr: dtStr,
                    minTemp: d.temp.min,
                    maxTemp: d.temp.max,
                    forecast: d.weather[0].main
                }
            })
            let withoutToday = summarisedList.filter(d => d.dateStr !== selectedDate)
            setFutureWeatherList(withoutToday);
        }
    }, [futureWeatherData])

    function seeDayWeather() {
        navigation.navigate('DayWeather')
        // console.log('niama')
    }

    return (
        <SafeAreaView style={[mainStyle.bg, styles.container]}>
            {
                loadingDashboard ? <ActivityIndicator size="large" /> :
                    <TopDashboard
                        city={selectedCity}
                        todayDate={selectedDate}
                        temperature={selectedTemperature}
                        forecast={selectedForecast}
                        screen="main"
                    />
            }
            {
                loadingList ? <ActivityIndicator size="large" /> :
                    <FutureWeatherList
                        data={futureWeatherList}
                        itemPressed={seeDayWeather}
                    />
            }
        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})