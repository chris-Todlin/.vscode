/* Our recipe application */
const clickView = document.querySelector('.clickview');
const recipeList = document.querySelector('.recipelist');

// Should fetch the recipes and render them then after the dom leads apply them
// function to load the data
async function getAllRecipes(){
    await fetch('http://localhost:3000/recipe/recipes').
    then(async(res)=>{
        const recipesAll =  await res.json();
        recipesAll.forEach((data, index)=> appendData(index,data));
    }).finally(()=>{
        console.log('Data fetched successfully!');
    }).catch((err)=>{
        console.error(err);
    })
}

// function to append the data
function appendData(index,recipe){
    const section = document.createElement('section');
    section.setAttribute('class', 'recipe');
    section.setAttribute('id', index);

    // The h3
    const h3 = document.createElement('h3');
    h3.textContent = recipe.title;

    const img = document.createElement('img');
    img.setAttribute('src', "img/poster.png");
    img.setAttribute('alt', "poster");

    const p = document.createElement('p');
    const strong = document.createElement('strong');

    strong.textContent = "Description";
    p.append(strong, recipe.description);

    // append all in the section
    section.append(h3, img, p);

    // The event listner for the section
    section.addEventListener('click', (e)=>{
        getRecipe(index);
    })

    // append it in the list
    document.querySelector(".list").append(section);
}

getAllRecipes();

// function to fet a single one
async function getRecipe(id){
    await fetch(`http://localhost:3000/recipe/recipe/${id}`).
    then(async(res)=>{
        const recipe =  await res.json();
        viewRecipe(recipe);
    }).finally(()=>{
        console.log('Data fetched successfully!');
    }).catch((err)=>{
        console.error(err);
    })
}

// Now the user click on a single section
function viewRecipe(recipe){
    document.querySelector('head title').textContent = recipe.title;
    const section = document.createElement('section');
    section.setAttribute('class', 'recipe');

    document.querySelector('h1').textContent = recipe.title;

    const img = document.createElement('img');
    img.setAttribute('src', "img/poster.png");
    img.setAttribute('alt', "poster");

    const h2Req = document.createElement('h2');
    h2Req.textContent = "Requirements";

    /* NOw appending the ol */
    const ol = document.createElement('ol');

    recipe.requirements.forEach(req=>{
        const li = document.createElement('li');
        li.textContent = req;
        ol.append(li);
    })

    const p = document.createElement('p');
    const strong = document.createElement('strong');

    strong.textContent = "Description";
    p.append(strong, recipe.description);

    const h2Pro= document.createElement('h2');
    h2Pro.textContent = "Procedure";

    /* NOw appending the ul */
    const ul = document.createElement('ul');

    recipe.procedure.forEach(req=>{
        const li = document.createElement('li');
        li.textContent = req;
        ul.append(li);
    })

    const buttonBack = document.createElement('button');
    buttonBack.textContent = "Back";

    buttonBack.addEventListener('click', backMove);

    // append all in the section
    section.append(img,h2Req, ol, p,h2Pro,ul, buttonBack);

    clickView.append(section);
    clickView.classList.remove('not-visible');
    recipeList.classList.add('not-visible');
}

function backMove(){
    clickView.classList.add('not-visible');
    // Claer the inner html
    clickView.innerHTML = "";

    recipeList.classList.remove('not-visible');
    document.querySelector('h1').textContent = "Recipe Application";
}