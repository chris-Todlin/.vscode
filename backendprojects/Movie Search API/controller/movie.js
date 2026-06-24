/* This is the controller for the movie part */
const axios = require("axios"); // the fetch patterm
const dotenv = require("dotenv").config({path: "../file.env"});
const NodeCache = require("node-cache");

// create the instance
const myCache = new NodeCache({stdTTL: 3600}); // cache for 1 hour

// function to gfetcht the movie
async function fetchMovie(searchTerm){
    const cachekey = `omdb_search_${searchTerm}`; 

    try {
        const cachedData = myCache.get(cachekey);
        if(cachedData){
            return {data: cachedData};
        } else {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=41a2386a&s=${searchTerm}`);
            myCache.set(cachekey, response.data);

            if(response.data){
                return {data: response.data};
            } else {
                return {message: "No data!"};
            }
        }
    } catch (error) {
        console.error(error.stack);
    }
}

// export it out 
exports.fetchMovie = fetchMovie;