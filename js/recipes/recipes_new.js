var displayRecipes = (mode) => { 

    sectionRecipes.innerHTML = ""

    if (mode=="reset") {
        for (let i = 0; i < recipesArray.length; i++) {
            recipesArray[i].display = true
        }
    }

    let recipesToAddArray = recipesArray.filter(recipe => recipe.display===true)

    for (let i = 0; i < recipesToAddArray.length; i++) {

        const recipeToAdd = recipesToAddArray[i];

        const recipeModel = recipeDatas(recipeToAdd);
        
        //construction du contenu à ajouter au DOM
        const recipeDOM = recipeModel.createRecipeDOM(recipeToAdd);
            
        //ajout au DOM
        if (recipeDOM) {sectionRecipes.appendChild(recipeDOM)};
    }
};

/**
 * recherche de l'élement saisi dans le titre de la recette, la description ou les ingrédients
 * modif display = true pour les recettes correspondant au filtre
 */
var searchForRecipes = (searchText) => {
    
    for (let i = 0; i < recipesArray.length; i++) {
        bFound = false //si vrai, texte trouvé 

        const recipe = recipesArray[i];
        
        //recherche dans le titre de la recette
        if (recipe.name.toLowerCase().noAccent().includes(searchText)) {    
            bFound = true
            
        //recherche dans la description de la recette
        } else if (recipe.description.toLowerCase().noAccent().includes(searchText)) {
            bFound = true

        //recherche dans les ingrédients de la recette
        } else {
            
            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j].ingredient
                if (ingredient.toLowerCase().noAccent().includes(searchText)) {
                    bFound = true
                    break
                }
            }
        }
        recipe.display = bFound   
    }
}

/**
 * Recherche des recettes et filtres correspondant à la saisie user
 * Déclencheur : saisie utilisateur dans la zone de recherche
 * 1-recherche des recettes en fonction des tags + recherche user
 * 2-affichage des recettes concernées
 * 3-affichage des filtres concernés
 */
var searchUserRecipes = () =>{

    //*1*
    searchRecipesWithTags()
    //*2*
    displayRecipes()
    //*3*
    displayFilters()

}

// var searchForRecipesWithTag = () => {
    
//     for (let i = 0; i < recipesArray.length; i++) {
//         recipesArray[i].display = false;
//     }
    
//     //filtre des recettes en fonction des tags ingrédients
//     let tempFilterArray = filtersArray.filter(element => element.type == "ingredient")
//     let tempTagArray = tagArray.filter(element => element.tagType="ingredientTag")

//     for (let i = 0; i < tempFilterArray.length; i++) {
//         const filterElement = tempFilterArray[i];
//         for (let j = 0; j < tempTagArray.length; j++) {
//             const tagElement = tempTagArray[j];
//             if (filterElement.id == tagElement.tagIdRecipe) {
//                 recipesArray.filter(element => element.id == filterElement.id)[0].display = true
//             }
            
//         }
//     }
//     displayRecipes()
// }
