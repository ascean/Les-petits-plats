const sectionRecipes = document.getElementById('section-recipes')
const inputSearch = document.getElementById('input-search')
const formSearch = document.getElementById('form-search')
const formFilters = document.querySelectorAll('.form-filter')
const inputFilters = document.querySelectorAll('.input-filter')

let allRecipes  //tableau contenant l'ensemble de recettes provenant de recipes.js
let filteredRecipes = []    //tableau contenant les recettes correspondant aux filtres
let ingredientArray = []
let applianceArray = []
let ustensilArray = []

var initRecipes = () => {

    sectionRecipes.innerHTML = ""
    allRecipes = []
    filteredRecipes=[]
    
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        var newKey = {present:"false"}
        recipe = {...recipe, ...newKey}
        allRecipes.push(recipe)
    }
    filteredRecipes = allRecipes
}


/**
 * copie du tableau recipe (recipe.js) + ajout d'une paire flag: "false"
 */
 var initFilters = () => {
    
    ingredientFilter.innerHTML  = ""
    applianceFilter.innerHTML  = ""
    ustensilFilter.innerHTML  = ""

    ingredientArray = []
    applianceArray = []
    ustensilArray = []

    displayFilterItems()

    for(let i = 0; i < inputFilters.length; i++) {
        inputFilters[i].value="";
    }

}

initRecipes()
initFilters()
setupListeners()
displayRecipes()