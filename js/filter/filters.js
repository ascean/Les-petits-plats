const ingredientFilter = document.getElementById("ingredient-filter")
const applianceFilter = document.getElementById("appliance-filter")
const ustensilFilter = document.getElementById("ustensil-filter")

/**Remplissage des tableaux ingrédients, ustensiles et appareils en fonction de la saisie user
 * @param {array} arrayFilter       //ingredientArray, ustensilArray, applianceArray
 * @param {string} elementFilter    //élément de filtre saisi
 */
var fillFilterArray = (arrayFilter, elementFilter, idFilterRecipe) => {

    newElement = {
        accent: elementFilter,
        noAccent: elementFilter.toLowerCase().noAccent(),
        present: true,
        idRecipe: idFilterRecipe
    }

    let found = false
    for (let i = 0; i < arrayFilter.length; i++) {
        const element = arrayFilter[i];
        if (element.noAccent === newElement.noAccent) {
            found = true
            break
        }
    }

    if (!found) {
        arrayFilter.push(newElement)
    }
}

/**
 * Update des tableaux de filtres en fonction de la saisie User
 * lancement de la méthode de création des filtres dans le DOM
 * @param {Array} arrayFilter 
 * @param {Object} filterDOMElement 
 * @param {string} userSearch 
 */
var updateFilterArray = (arrayFilter, filterDOMElement, userSearch) => {

    for (let i = 0; i < arrayFilter.length; i++) {
        const element = arrayFilter[i];
        if (!element.noAccent.includes(userSearch)) {
            element.present = false
        }
    }

    let newArrayFilter = arrayFilter.filter(element => element.present == true)

    filterDOMFactory(newArrayFilter, filterDOMElement)
    return newArrayFilter
}


/**
 * MAJ des 2nd et 3ème
 * @param {object} arrayFilterSource    //array du 1er filtre
 * @param {object} arrayFilterTarget    //array du filtre à mettre à jour
 * @param {object} filterDOMElement     //DOM du filtre à mettre à joru
 */
var updateOtherFilterArray = (arrayFilterSource, arrayFilterTarget, filterDOMElement) => {

    let bFound
    for (let i = 0; i < arrayFilterTarget.length; i++) {
        const elementTarget = arrayFilterTarget[i];
        bFound = false
        for (let j = 0; j < arrayFilterSource.length; j++) {
            const elementSource = arrayFilterSource[j];
            if (elementSource.idRecipe == elementTarget.idRecipe) {
                bFound = true
                break
            }
        }
        if (!bFound) {
            elementTarget.present = false
        }
    }
    let newArrayFilterTarget = arrayFilterTarget.filter(element => element.present === true)
    filterDOMFactory(newArrayFilterTarget, filterDOMElement)
}

/**
 * création du DOM des filtres Ingrédients, Appareils et Ustensiles 
 * @param {Array} filterArray 
 */
var filterDOMFactory = (filterArray, filterDomElement) => {

    if (filterArray.length > 0) {
        filterDomElement.innerHTML = ""
        let filterRow
        let filterItem
        
        for (let i = 0; i < filterArray.length; i++) {
            const filterElement = filterArray[i].accent;
            if (i % 3 === 0) {
                filterRow = document.createElement("div")
                filterRow.classList.add("d-flex", "w-100", "align-items-start", "justify-content-between", "flex-sm-row")
                filterDomElement.appendChild(filterRow)
            }
            filterItem = document.createElement("a")
            filterItem.classList.add("dropdown-item", "col", "col-4", "text-white", "pl-0", "pl-lg-3")
            filterItem.setAttribute("href", "#")
            filterItem.innerHTML = `${filterElement}`
            filterRow.appendChild(filterItem)
        }
        if (filterArray.length % 3 === 2) {
            filterItem = document.createElement("a")
            filterItem.classList.add("dropdown-item", "col", "col-4", "text-white", "pl-0", "pl-lg-3")
            filterRow.appendChild(filterItem)
        }

    }
}

/**
 * affichage des filtres correspondant à la recherche user
 */
var displayFilterItems = () => {

    ingredientArray = []
    applianceArray = []
    ustensilArray = []

    for (let i = 0; i < filteredRecipes.length; i++) {
        const filteredRecipe = filteredRecipes[i];
        const idRecipe = filteredRecipes[i].id
        for (let j = 0; j < filteredRecipe.ingredients.length; j++) {
            fillFilterArray(ingredientArray, filteredRecipe.ingredients[j].ingredient, idRecipe)
        }
        for (let j = 0; j < filteredRecipe.appliance.length; j++) {
            fillFilterArray(applianceArray, filteredRecipe.appliance, idRecipe)
        }
        for (let j = 0; j < filteredRecipe.ustensils.length; j++) {
            fillFilterArray(ustensilArray, filteredRecipe.ustensils[j], idRecipe)
        }
    }

    ingredientArray.sort((a, b) => a.accent.localeCompare(b.accent));
    applianceArray.sort((a, b) => a.accent.localeCompare(b.accent));
    ustensilArray.sort((a, b) => a.accent.localeCompare(b.accent));
    
    filterDOMFactory(ingredientArray, ingredientFilter)
    filterDOMFactory(applianceArray, applianceFilter)
    filterDOMFactory(ustensilArray, ustensilFilter)

}

var updateFilters = (e) => {
    let bFound
    let inputFilter = e.target.children[0]
    let newArray = updateFilterArray(ingredientArray, ingredientFilter, inputFilter.value.toLowerCase().noAccent())
    updateOtherFilterArray(newArray, applianceArray, applianceFilter)
    updateOtherFilterArray(newArray, ustensilArray, ustensilFilter)

    for (let i = 0; i < filteredRecipes.length; i++) {
        const element = filteredRecipes[i];
        bFound = false
        for (let j = 0; j < newArray.length; j++) {
            const newElement = newArray[j].idRecipe;
            if (element.id === newElement) {
                bFound = true
            }
        }
        if (!bFound) {
            filteredRecipes[i].present = false
        }
    }
    filteredRecipes = filteredRecipes.filter(element => element.present === true)
    displayRecipes("update")
}

