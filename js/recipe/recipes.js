
var recipeDatas = (data) => {

    const id        = data.id
    const name      = data.name
    const servings  = data.servings
    const time      = data.time
    const description = data.description
    const appliance = data.appliance
    const ingredients = data.ingredients
    const usentils  = data.ustensils
    const present   = data.present

    /**
    * création du DOM des recettes
    */
    var createRecipeDOM = function (filteredRecipe) {

        if (filteredRecipe.present) {
            
            let ingredientFilter=""

            for (let j = 0; j < filteredRecipe.ingredients.length; j++) {
                const ingredient = filteredRecipe.ingredients[j];
                if (ingredientFilter === "") {
                    ingredientFilter = `<li><span class="ingredient-item font-weight-bold">${ingredient.ingredient}`
                } else {
                    ingredientFilter = ingredientFilter + `<li><span class="ingredient-item font-weight-bold">${ingredient.ingredient}`
                }
                if (ingredient.quantity) {
                    ingredientFilter = ingredientFilter + ` : </span><span>${ingredient.quantity}`
                    if (ingredient.unit) {
                        ingredientFilter = ingredientFilter + ` ${ingredient.unit}</span></li>`
                    } else {
                        ingredientFilter = ingredientFilter + `</span></li>`
                    }
                }
            }

            const recipe = document.createElement("div")
            recipe.classList.add("recipe", "col", "col-12", "col-md-6", "col-lg-4", "mb-4")
            recipe.innerHTML =
                `<div class="card border-0">
                        <div class="card-img-top "></div>
                        <div class="card-body rounded-bottom p-3">
                            <div class="row w-100 d-flex align-items-top mx-0 mb-3">
                                <div class="col col-8 px-0">
                                    <h2 class="card-title mb-0">${filteredRecipe.name}</h2>
                                </div>
                                <div class="col col-4 text-right p-0">
                                    <span><i class="fa-regular fa-clock mr-1"></i></span>
                                    <span class="font-weight-bold">${filteredRecipe.time} min</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col col-6 pr-0">
                                    <ul class="card-text ingredient-container pl-0">
                                        ${ingredientFilter}
                                    </ul>
                                </div>
                                <div class="instructions col col-6">
                                    <p>${filteredRecipe.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>`

            return (recipe)
        }
    }
    return {createRecipeDOM}
}

var displayRecipes = (mode="") => { 

    if (mode==="update") {
        removeRecipes()
    }

    for (let i = 0; i < filteredRecipes.length; i++) {

        const filteredRecipe = filteredRecipes[i];

        const recipeModel = recipeDatas(filteredRecipe);
        
        //construction du contenu à ajouter au DOM
        const recipeDOM = recipeModel.createRecipeDOM(filteredRecipe);
            
        //ajout au DOM
        if (recipeDOM) {sectionRecipes.appendChild(recipeDOM)};
    }
};

var searchRecipes = () => {
    
    //RAZ du tableau des recettes
    initRecipes()

    //recherche des recettes correspondant au filtre en cours de saisie
    if ((inputSearch.value).length>2) {
        searchTextUserInRecipes()   
    }

}



/**
 * recherche de l'élement saisi dans le titre de la recette, la description ou les ingrédients
 * modif present = true pour les recettes correspondant au filtre
 * création d'un nouveau tableau avec les recettes filtrées : filteredRecipes
 */
 var searchTextUserInRecipes = () => {
    
    for (let i = 0; i < allRecipes.length; i++) {
        bFound = false //si vrai, texte trouvé 

        const recipe = allRecipes[i];
        const searchText = inputSearch.value.toLowerCase().noAccent()
        
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
        
        allRecipes[i].present = bFound
        
    }

    filteredRecipes = allRecipes.filter(recipe => recipe.present == true)

    displayRecipes()
    
    displayFilterItems()
    
}