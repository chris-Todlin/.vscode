/* The controller for the weather endpoint */
const getWeather = require("./getweather.js")

// the function
async function weatherCity(req,res,next){
    //get the city on the radar
    const city = req.params.city;

    try {
        // get the response
        const weather = await getWeather(city);

        res.json(weather);
    } catch (error) {
        next(error);
    }
}

module.exports = weatherCity;