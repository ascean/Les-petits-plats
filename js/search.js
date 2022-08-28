const filterItems = document.getElementById("filter-items")
const inputSearch = document.getElementById('input-search')
const formSearch = document.getElementById('form-search')
const sectionRecipes = document.getElementById('section-recipes')

let allRecipes  //tableau contenant l'ensemble de recettes provenant de recipes.js
let bFound
let searchItemArray = []    //????????????????????VOIR SI UTILE
let filteredRecipes = []    //tableau contenant les recettes correspondant aux filtres

/**
 * copie du tableau recipe (recipe.js) + ajout d'une paire flag: "false"
 */
var initArrayFilter = () => {
    
    allRecipes = []
    filteredRecipes=[]
    
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        var newKey = {flag:"false"}
        recipe = {...recipe, ...newKey}
        allRecipes.push(recipe)
    }
}

/**
 * création du DOM des recettes
 */
var createRecipeDOM = () => {

    let ingredientFilter
    
    for (let i = 0; i < filteredRecipes.length; i++) {
        const filteredRecipe = filteredRecipes[i];

        ingredientFilter = ""
        for (let j = 0; j < filteredRecipe.ingredients.length; j++) {
            const ingredient = filteredRecipe.ingredients[j];
            if (ingredientFilter==="") {
                ingredientFilter =  `<li><span class="ingredient-item font-weight-bold">${ingredient.ingredient}`
            }else{
                ingredientFilter =  ingredientFilter + `<li><span class="ingredient-item font-weight-bold">${ingredient.ingredient}`  
            }
            if (ingredient.quantity) {
                ingredientFilter = ingredientFilter+ ` : </span><span>${ingredient.quantity}`  
                if (ingredient.unit) {
                    ingredientFilter = ingredientFilter+ ` ${ingredient.unit}</span></li>`  
                }else{
                    ingredientFilter = ingredientFilter+ `</span></li>`  
                }
            }
        }

        const recipe = document.createElement("div")
        recipe.classList.add("recipe","col", "col-12", "col-md-6", "col-lg-4", "mb-4")
        recipe.innerHTML = 
            `<div class="card border-0">
                <div class="card-img-top "></div>
                <div class="card-body rounded-bottom p-3">
                    <div class="row w-100 d-flex align-items-top mx-0 mb-3">
                        <div class="col col-9 px-0">
                            <h2 class="card-title mb-0">${filteredRecipe.name}</h2>
                        </div>
                        <div class="col col-3 text-right p-0">
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
        sectionRecipes.appendChild(recipe)

        
    }
}

/**
 * création du DOM tag correspondant au filtre saisi
 */
 var createTagDOM = () => {

    const filterItem = document.createElement("button")
    filterItem.classList.add("filter-item", "primary-color", "border-0", "rounded", "px-3", "py-2", "mb-3", "mr-2", "text-white")
    filterItem.innerHTML = `${inputSearch.value} <i class="filter-icon fa-regular fa-circle-xmark ml-2 fs-5 align-middle"></i>`
    filterItems.appendChild(filterItem)

    searchItemArray.push(inputSearch.value)
    inputSearch.value=""

    filterIcon = filterItem.querySelector(".filter-icon")
    filterIcon.addEventListener("click", removeFilterItem)
    
}

/**
 * création du DOM ingrédients à partir de ingredientArray
 * @param {Array} ingredientArray 
 */
var createIngredientDOM = (ingredientArray) => {

    if (ingredientArray.length >0) {
        const ingredientMenu = document.getElementById("ingredient-menu")
        ingredientMenu.innerHTML=""
        let ingredientRow
        let ingredientItem

        for (let i = 0; i < ingredientArray.length; i++) {
            const ingredient = ingredientArray[i];
            if ( i % 3 ===0) {
                ingredientRow = document.createElement("div")
                ingredientRow.classList.add("d-flex", "w-100", "align-items-start", "justify-content-between", "flex-sm-row")
                ingredientMenu.appendChild(ingredientRow) 
            }
            ingredientItem = document.createElement("a")
            ingredientItem.classList.add("dropdown-item", "col", "col-4", "text-white", "pl-0", "pl-lg-3") 
            ingredientItem.setAttribute("href","#")
            ingredientItem.innerHTML = `${ingredient}`
            ingredientRow.appendChild(ingredientItem)
        }
        if (ingredientArray.length % 3 === 2){
            ingredientItem = document.createElement("a")
            ingredientItem.classList.add("dropdown-item", "col", "col-4", "text-white", "pl-0", "pl-lg-3") 
            ingredientRow.appendChild(ingredientItem)
        }

    }
}

/**
 * recherche de l'élement saisi dans le titre de la recette, la description ou les ingrédients
 * modif flag = true pour les recettes correspondant au filtre
 * création d'un nouveau tableau avec les recettes filtrées : filteredRecipes
 */
var searchInRecipe = () => {
    
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
        
        allRecipes[i].flag = bFound
        
    }

    filteredRecipes = allRecipes.filter(recipe => recipe.flag == true)

    createRecipeDOM()
    selectIngredientsFilter()
    
}

/**
 * suppression du tag cliqué
 * @param {object}  
 */
var removeFilterItem = (e) => {
    filterItems.removeChild(e.target.parentNode)

    for (let i = 0; i < searchItemArray.length; i++) {
        const searchItem = searchItemArray[i];
        if (searchItem===e.target.parentNode.innerText.trim()) {
            searchItemArray.splice(i,1)
            break
        }
    }
}



/**
 * Ajout des ingrédients des recettes sélectionnés dans ingredientArray
 * Appel de createIngredientDOM
 */
var selectIngredientsFilter = () => {

    let ingredientArray=[]

    for (let i = 0; i < filteredRecipes.length; i++) {
        const filteredRecipe = filteredRecipes[i];
        for (let j = 0; j < filteredRecipe.ingredients.length; j++) {
            let ingredient = filteredRecipe.ingredients[j].ingredient.toLowerCase().noAccent()
            if (ingredientArray.indexOf(ingredient)===-1) {
                ingredientArray.push(ingredient)
            }
        }    
    }
    createIngredientDOM(ingredientArray);
}


//-----------------------------------------LISTENERS------------------------------------------
/**
 * Ecoute de la saisie dans la zone de recherche
 */
inputSearch.addEventListener('input', function(e) {
    
    //RAZ du tableau des recettes
    initArrayFilter()

    //suppression du DOM recettes
    const recipes = document.querySelectorAll(".recipe")
    recipes.forEach(recipe => {
        sectionRecipes.removeChild(recipe)
    });

    //recherche des recettes correspondant au filtre en cours de saisie
    if ((inputSearch.value).length>2) {
        searchInRecipe()   
    }

});

/**
 * Validation de la recherche -> création tag
 */
formSearch.addEventListener("submit", (e) => {
    e.preventDefault()
    if ((inputSearch.value).length>2) {
        createTagDOM()
    }
})

initArrayFilter()

