/* This is the middleware for all the paths to the movie */
const movies = require("../controller/movie");
const { Fav } = require("../model/fav");

// now th efunction to getmovie
async function getMovie(req,res,next){
    try {
        const searchTerm = req.params.moviename;

        const response = await movies.fetchMovie(searchTerm);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
}

// function to get the bod and return 
async function saveFav(req,res,next){
    const {title} = req.body;

    try {
        // save the fav
        const fav = await Fav.create({title: title});

        if(!fav){
            return res.json({message: "error"})
        }

        // return the json file 
        res.json({message: "saved"})


    } catch (error) {
        next(error);
    }
}

async function fetchFav(req,res,next){
    try {
        const fav = await Fav.find(); // return all of them

        return res.json({favs: fav || []}); // return them out
    } catch (error) {
        next(error);
    }
}

// export it oit
exports.getMovie = getMovie;
exports.saveFav = saveFav;
exports.fetchFav = fetchFav;