/* This is the main entry file of the server - protect it well */
const express = require("express");
const superagent = require("superagent");
const axios = require("axios");
const path = require("path");
const consolidate = require("consolidate");

// startt he application
const app = express();

//settting the view engine and other on the way 
app.engine('html',consolidate.handlebars);
app.set('view engine','html');
app.set('views',path.join(__dirname, "./views"));

// The static foler to hanlder the css we need
app.use(express.static(path.resolve(__dirname, "./public")));

// The username and story for the 
const user = 'azat_co', story_slug = 'kazan';

// KEY and usernme or tokem
const api_key = "", username = "", _token = "";

/* The home route handler */
app.get("/",async function(req,res, next){
    superagent.get(`http://api.storify.com/v1/stories/${user}/${story_slug}`)
                    .query({api_key: api_key, username: username, _token: _token})
                    .set({accept: "application/json"})
                    .end(function(err,storyfy){
                        if(err) return next(err);
                        console.log(storyfy.body.content);
                        return res.render("index", storyfy.body.content);
                    });
});

// now set it up and rev the engine
app.listen(3000);