import React, { useState, useEffect } from 'react';
import {
    View, Text, Button, StyleSheet, Alert, SafeAreaView, ActivityIndicator, Easing, Animated, InteractionManager
} from 'react-native';
import UserContainer from '../containers/UserContainer';
import { mainStyle, weatherApiURL, weatherApiKey } from '../Config';
import TopDashboard from '../components/TopDashboard';
import { getDateFormatStr } from '../Functions';
import { parseFetch } from '../components/Fetcher';
import WeatherList from '../components/WeatherList';
import WeatherContainer from '../containers/WeatherContainer';
import FutureDayWeatherItem from '../components/FutureDayWeatherItem';


function Home({ navigation }) {

    const User = UserContainer.useContainer();
    const Weather = WeatherContainer.useContainer();

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
            // console.log(d)
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
            // console.log(fetchStr);
            let weatherData = await parseFetch(fetchStr);
            setFutureWeatherData(weatherData.daily);

            let summarisedList = weatherData.daily.map(d => {
                let dtStr = getDateFormatStr(new Date((d.dt) * 1000));
                return {
                    dateStr: dtStr,
                    minTemp: d.temp.min,
                    maxTemp: d.temp.max,
                    forecast: d.weather[0].main
                }
            })
            // let withoutToday = summarisedList.filter(d => d.dateStr !== selectedDate)
            setFutureWeatherList(summarisedList);
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

    // cant find specific day API
    // closest is this
    // 5 days 3 hourly
    async function getDayWeather(tappedDayDateStr) {
        try {
            let fetchStr = `${weatherApiURL}forecast?lat=${selectedCityLat}&lon=${selectedCityLong}&appid=${weatherApiKey}&units=metric`;
            let weatherData = await parseFetch(fetchStr);
            // console.log(weatherData.list);
            let summarisedList = weatherData.list.map(d => {
                let dtStr = getDateFormatStr(new Date((d.dt) * 1000))
                return {
                    dateStr: dtStr,
                    hour: parseInt(d.dt_txt.split(' ')[1].split(':')[0], 10),
                    minTemp: Math.ceil(d.main.temp_min),
                    maxTemp: Math.ceil(d.main.temp_max),
                    forecast: d.weather[0].main,
                    temp: d.main.temp,
                    weatherIcon: d.weather[0].icon
                }
            })

            let dayWeatherList = summarisedList.filter(d => d.dateStr == tappedDayDateStr).sort((a, b) => a.hour - b.hour);
            if (dayWeatherList.length > 0) {
                Weather.setDayWeather(dayWeatherList);
                Weather.setDayCity(selectedCity);
                Weather.setDayDate(tappedDayDateStr);
                Weather.setDayTemperature(dayWeatherList[0].temp)
                Weather.setDayForecast(dayWeatherList[0].forecast)
                Weather.setDayIcon(dayWeatherList[0].weatherIcon)
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.error(e);
        }
    }

    let oneSecOpacity = new Animated.Value(0);
    let listOpacity = new Animated.Value(1);

    function seeDayWeather(tappedDayDateStr) {
        animate();
        InteractionManager.runAfterInteractions(async () => {
            if (await getDayWeather(tappedDayDateStr) === true) {
                navigation.navigate('DayWeather');
            } else {
                animateReset();
                Alert.alert(
                    'No Data!',
                    'No weather data for ' + tappedDayDateStr
                )
            }
        })

    }

    function animate() {
        animateReset();
        Animated.timing(oneSecOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
        Animated.timing(listOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    function animateReset() {
        oneSecOpacity.setValue(0)
        listOpacity.setValue(1)
    }

    useEffect(() => {
        navigation.addListener('blur', () => {
            animateReset()
        })

        return () => {
            navigation.removeListener('blur', () => {
                animateReset()
            })
        }
    }, [navigation])

    return (
        <SafeAreaView style={[mainStyle.bg, styles.container]}>
            <Animated.View style={[styles.animated, { opacity: oneSecOpacity }]}>
                <Text style={[mainStyle.textColor, styles.animatedText]}>One sec ...</Text>
            </Animated.View>
            <Animated.View style={[mainStyle.bg, styles.main, { opacity: listOpacity }]}>
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
                        <WeatherList
                            data={futureWeatherList}
                            itemPressed={seeDayWeather}
                            header="The Future"
                            listItem={FutureDayWeatherItem}
                        />
                }
            </Animated.View>
        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        flex: 1,
        width: '100%',
    },
    animatedText: {
        fontSize: 30
    },
    animated: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    }
})