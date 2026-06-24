/* This api is used to fetch weather of a place no matter what */

const axios = require("axios");
const path = require("path");
const dotenv = require("dotenv").config({path: path.resolve(__dirname, "../enviroment.env")});
const API_KEY = process.env.API_KEY;

// function to get the data on board
async function getWeather(city){
    // fetch the wether via the aios
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        // now get the data in the response
        const {data} = await response;

        const currentWeather = {
            name: data.name,
            icon: data.weather[0].icon,
            temp: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            speed: data.wind.speed
        };

        if(currentWeather !== undefined) {
            return currentWeather;
        } else {
            return {message: "City not found"};
        }
    } catch (error) {
        console.error(error.stack); // console the error
    }
}

module.exports = getWeather;