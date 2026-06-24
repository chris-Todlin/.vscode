/* For the movie search API functionality */

// -> Create the landing page - done
// -> create the 404 page - done
// -> create the 500 page - done
// -> create the movie search page 
// -> crete home for the user 
// -> set the API 
// move on in life

/* This is the routes for the movie only one of them */
const express = require("express");
const { getMovie, saveFav, fetchFav } = require("../middleware/movie");

// create the router
const movieRouter = express.Router();

// the default path 
movieRouter.get("/",(req,res)=> {res.render("movie")});

// path to save the favourites and another to get the movie
movieRouter.get("/search/:moviename",/* function here */getMovie);

movieRouter.post("/favorite",saveFav);

movieRouter.get("/fetchfav",fetchFav);

// export it out
exports.movieRouter = movieRouter;