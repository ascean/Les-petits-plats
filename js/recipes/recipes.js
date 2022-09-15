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
 * Filtre des éléments du tableau en fonction de la recherche
 * @param {string} searchText 
 * @returns array filtré
 */
 var searchForRecipes = (searchText) => {
     
    let tempRecipesArray = recipesArray
    tempRecipesArray = tempRecipesArray.filter(recipe => recipe.name.toLowerCase().noAccent().includes(searchText)==true 
    || recipe.description.toLowerCase().noAccent().includes(searchText)==true
    || recipe.ingredients.filter(elt => elt.ingredient.toLowerCase().noAccent().includes(searchText) == true).length>0)
    
    return tempRecipesArray
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
    updateFiltersArray()

}