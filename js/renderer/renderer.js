var recipeDatas = (data) => {

    const id        = data.id
    const name      = data.name
    const servings  = data.servings
    const time      = data.time
    const description = data.description
    const appliance = data.appliance
    const ingredients = data.ingredients
    const usentils  = data.ustensils
    const display   = data.display

    /**
    * création du DOM des recettes
    */
    var createRecipeDOM = function (recipeToAdd) {

        if (recipeToAdd.display) {
            
            let ingredientToAdd=""

            for (let j = 0; j < recipeToAdd.ingredients.length; j++) {
                const ingredient = recipeToAdd.ingredients[j];
                if (ingredientToAdd === "") {
                    ingredientToAdd = `<li><span class="ingredient-item font-weight-bold">${ingredient.ingredient}`
                } else {
                    ingredientToAdd = ingredientToAdd + `<li><span class="ingredient-item font-weight-bold">${ingredient.ingredient}`
                }
                if (ingredient.quantity) {
                    ingredientToAdd = ingredientToAdd + ` : </span><span>${ingredient.quantity}`
                    if (ingredient.unit) {
                        ingredientToAdd = ingredientToAdd + ` ${ingredient.unit}</span></li>`
                    } else {
                        ingredientToAdd = ingredientToAdd + `</span></li>`
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
                                    <h2 class="card-title mb-0">${recipeToAdd.name}</h2>
                                </div>
                                <div class="col col-4 text-right p-0">
                                    <span><i class="fa-regular fa-clock mr-1"></i></span>
                                    <span class="font-weight-bold">${recipeToAdd.time} min</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col col-6 pr-0">
                                    <ul class="card-text ingredient-container pl-0">
                                        ${ingredientToAdd}
                                    </ul>
                                </div>
                                <div class="instructions col col-6">
                                    <p>${recipeToAdd.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>`

            return (recipe)
        }
    }
    return {createRecipeDOM}
}

/**
 * création du DOM des filtres Ingrédients, Appareils et Ustensiles 
 * @param {Array} filterArray  = ingredientsArray, ustensilsArray, appliancesArray
 * @param {object} filterDomElement = ingredientFilterDOM, ustensilFilterDOM, applianceFilterDOM 
 * @param {string} typeFilter = ingredient, ustensil, appliance
 */
var createFilterDOM = (filterArray, filterDomElement, typeFilter) => {

    if (filterArray.length > 0) {

        filterArray.sort((a, b) => a.accent.localeCompare(b.accent));

        filterDomElement.innerHTML = ""
        let filterRow
        let filterItem
        let filterArrayToDisplay = filterArray.filter(element => element.display === true)

        //on retire les éléments en double
        filterArrayToDisplay = removeDuplicates(filterArrayToDisplay,"noAccent");

        for (let i = 0; i < filterArrayToDisplay.length; i++) {
            const filterElement = filterArrayToDisplay[i].accent;
            
            filterRow = document.createElement("div")
            filterRow.classList.add("d-flex", "w-100", "align-items-start", "justify-content-between", "flex-sm-row")
            filterDomElement.appendChild(filterRow)
            
            filterItem = document.createElement("a")
            filterItem.classList.add(typeFilter,"dropdown-item", "col", "col-12", "text-white", "pl-0", "pl-lg-3")
            filterItem.innerHTML = `${filterElement}`
            filterRow.appendChild(filterItem)

            addFilterListener(filterItem)
        }

    }

}

 /**
 * création du DOM tag correspondant au filtre saisi
 * @param {string} type = ingredient, ustensil, appliance
 * @param {string} tag  = texte du tag
 */
  var createTagDOM = (type,tag) => {

    let bgColor
    switch (type) {
        case "ingredient":
            bgColor = "primary-color"
            break;
        case "ustensil" :
            bgColor = "danger-color"
            break;
        case "appliance" :
            bgColor = "success-color"
            break;
        default:
            break;
    }
    
    const filterItem = document.createElement("button")
    filterItem.classList.add("filter-item", type+"Tag", bgColor, "border-0", "rounded", "px-3", "py-2", "mb-3", "mr-2", "text-white")
    filterItem.innerHTML = `${tag} <i class="filter-icon fa-regular fa-circle-xmark ml-2 fs-5 align-middle"></i>`
    filterItemsContainer.appendChild(filterItem)

    filterIcon = filterItem.querySelector(".filter-icon")
    filterIcon.addEventListener("click", (e) => {
        clickOnTag(e,"remove")
    })
    
    for (let i = 0; i < inputFilters.length; i++) {
        inputFilters[i].value = "";
    }

}