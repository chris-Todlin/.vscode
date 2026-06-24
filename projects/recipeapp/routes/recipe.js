/* Router for the recipe API */
"use strict";
const express = require('express');
const recipes = require('../lib/recipes')

const router = express.Router();

router.use(express.json());

/* Path for the single and all recipes */
router.get('/recipes',(req,res)=>{
    const recipesAll = recipes.map((recipe,index)=>({
        index: index,
        title: recipe.title,
        description: recipe.description
    }));
    res.json(recipesAll);
});

router.get('/recipe/:id',(req,res)=>{
    const id = req.params.id;
    res.json(recipes[id]); // If the id is whithin range
});

module.exports = router;