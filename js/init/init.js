/**
 * Initialisation du tableau des recettes recipesArray à partir de recipe.js
 * ajout d'un key display
 */
var initRecipesArray = () => {

    sectionRecipes.innerHTML = ""
    recipesArray=[]
    
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        var newKey = {display:true}
        recipe = {...recipe, ...newKey}
        recipesArray.push(recipe)
    }
}

/**
 * Initialisation du tableaux de filtres ingrédients, ustensiles et appareils
 */
var initFiltersArray = () => {
    for (let i = 0; i < recipesArray.length; i++) {
        const recipe = recipesArray[i];

        for (let j = 0; j < recipe.ingredients.length; j++) {
            ingredientToAdd  = {
                accent: recipe.ingredients[j].ingredient, 
                noAccent: recipe.ingredients[j].ingredient.toLowerCase().noAccent(),
                display: true,
                id: recipe.id,
                type: "ingredient"
            }
            filtersArray.push(ingredientToAdd)
        }
        
        for (let j = 0; j < recipe.ustensils.length; j++) {
            ustensilToAdd = {
                accent: recipe.ustensils[j], 
                noAccent: recipe.ustensils[j].toLowerCase().noAccent(),
                display: true,
                id: recipe.id,
                type: "ustensil"
            }
            filtersArray.push(ustensilToAdd)
            
        }
        applianceToAdd = {
            accent: recipe.appliance, 
            noAccent: recipe.appliance.toLowerCase().noAccent(),
            display: true,
            id: recipe.id,
            type: "appliance"
        }
        filtersArray.push(applianceToAdd)
    }
}

/**
 * 1-Initialisation du tableau des recettes
 * 2-Initialisation des tableaux filtres
 * 3-Affichage des recettes
 * 4-Affichages des filtres
 * 5- mise en place des listeners
 */
var init = () => {
    
    //*1*
    initRecipesArray()
    //*2*
    initFiltersArray()
    //*3*
    displayRecipes()
    //*4*
    updateFiltersArray()
    //*5*
    setupListeners()
    
}

init()