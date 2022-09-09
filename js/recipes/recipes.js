/**
 * Affichage des recettes
 * 1-Masquage ou affichage du message recette non trouvée
 * 2-Récupération des données recettes
 * 3-Création du DOM recettes
 * 4-Ajout au DOM
 */
var displayRecipes = () => { 

    //*1*
    sectionRecipes.innerHTML = ""
    const noResult  = document.getElementById("noresult")
    noResult.classList.add("d-none")   
    let recipesToAddArray = recipesArray.filter(recipe => recipe.display===true)
    if (recipesToAddArray.length == 0) {
        noResult.classList.remove("d-none")   
    }
    
    for (let i = 0; i < recipesToAddArray.length; i++) {
        
        const recipeToAdd = recipesToAddArray[i];
        
        //*2*
        const recipeModel = recipeDatas(recipeToAdd);
        
        //*3*
        const recipeDOM = recipeModel.createRecipeDOM(recipeToAdd);
        
        //*4*
        if (recipeDOM) {
            sectionRecipes.appendChild(recipeDOM)
        }
    }
};

/**
 * recherche de l'élement saisi dans le titre de la recette, la description ou les ingrédients
 * modif display = true pour les recettes correspondant au filtre
 * @param {string} searchText 
 * @returns array avec les recettes correspondant au filtre
 */    
var searchForRecipes = (searchText) => {

    for (let i = 0; i < recipesArray.length; i++) {

        const recipe = recipesArray[i];
        recipe.display = false;
        
        //recherche dans le titre de la recette
        if (recipe.name.toLowerCase().noAccent().includes(searchText)) {    
            recipe.display = true;
            //recherche dans la description de la recette
        } else if (recipe.description.toLowerCase().noAccent().includes(searchText)) {
            recipe.display = true;
            
            //recherche dans les ingrédients de la recette
        } else {
            
            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j].ingredient;
                if (ingredient.toLowerCase().noAccent().includes(searchText)) {
                    recipe.display = true;
                    break;
                }
            }
        }
    }
    return recipesArray.filter(recipe => recipe.display==true);
}

/**
 * Recherche des recettes et filtres correspondant à la saisie user
 * Déclencheur : saisie utilisateur dans la zone de recherche
 * 1-recherche des recettes en fonction des tags + recherche user
 * 2-affichage des recettes concernées
 * 3-affichage des filtres concernés
 */
var searchUserRecipes =() =>{

    //*1*
    searchRecipesWithTags()
    //*2*
    displayRecipes()
    //*3*
    displayFilters()

}