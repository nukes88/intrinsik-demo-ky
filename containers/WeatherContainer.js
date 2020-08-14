import React, { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

function useWeather() {
    let [dayWeather, setDayWeather] = useState();
    let [dayCity, setDayCity] = useState();
    let [dayDate, setDayDate] = useState();
    let [dayTemperature, setDayTemperature] = useState();
    let [dayForecast, setDayForecast] = useState();
    let [dayIcon, setDayIcon] = useState();

    return {
        dayWeather, setDayWeather,
        dayCity, setDayCity,
        dayDate, setDayDate,
        dayTemperature, setDayTemperature,
        dayForecast, setDayForecast,
        dayIcon, setDayIcon
    }
}

const WeatherContainer = createContainer(useWeather);
export default WeatherContainer;