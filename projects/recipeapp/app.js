/* Recipe application for our day's task */
"use strict";
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const recipeRouter = require('./routes/recipe');
const recipes = require('./lib/recipes');

/* Start application */
const app = express();

/* Configurations */
//port
app.set('port', process.env.PORT || 3000);

// Static files
app.use(express.static(path.resolve(__dirname, 'public')));

/* Setting the views */
app.engine('handlebars', hbs.engine({extname: 'handlebars', defaultLayout: null}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// for the recipe routes
app.use('/recipe', recipeRouter);

/* Default path to the recipe application */
app.get('/',(req,res)=>{
    const fileRoot = path.resolve(__dirname, 'public/html');
    res.status(200).sendFile('recipe.html',{root: fileRoot});
});

// Using handlebars
app.get('/hbsversion',(req,res)=>{
    const recipesAll = recipes.map((recipe,index)=>({
        index: index,
        title: recipe.title,
        description: recipe.description
    }));
    res.render('recipe', {recipes: recipesAll});
});

app.get('/hbsversion/view/:id',(req,res)=>{
    const recipeSpecific = recipes.at(req.params.id);
    res.render('view', {recipe: recipeSpecific});
});

/* Error Path - default */
app.use((req,res,next)=>{
    res.status(404).send('404-Resource Not Found');
})

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('500 - Server Error');
});

/* Listening devices */
const port = app.get('port');
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})