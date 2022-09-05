/**
 * suppression du tag cliqué / élément ajouté dans la liste des items filtres
 * call dans listener.js sur click de l'icon du tag
 * @param {object}  //button tag icon
 */
 var removeTag = (e) => {
    let tagItem = e.target.parentNode
    let tagText = e.target.parentNode.firstChild.textContent.toLowerCase().noAccent().trim()

    let tempFilterArray = filtersArray.filter(element =>element.noAccent === tagText)
    for (let i = 0; i < tempFilterArray.length; i++) {
        tempFilterArray[i].display = true;
    }
    filterItemsContainer.removeChild(tagItem)
    searchRecipesWithTags()
    displayRecipes()
    displayFilters()
}

var searchRecipesWithTags = () => {

    let nbTag=0
    tagArray = []

    //si saisie user dans rechercher une recette
    if (inputSearch.value.length>2) {
        let searchRecipe = inputSearch.value.toLowerCase().noAccent()
        searchForRecipes(searchRecipe)
        tagArray = recipesArray.filter(element => element.display === true)
        nbTag = 1
    }

    //vérification existence tags
    filterItems = document.querySelectorAll(".filter-item")
    if (filterItems.length>0) {
        nbTag = nbTag + filterItems.length
        for (let i = 0; i < filterItems.length; i++) {
            const filterItem = filterItems[i];
            if (tagArray.length == 0) {
                tagArray = filtersArray.filter(element => element.noAccent ===filterItem.textContent.toLowerCase().noAccent().trim())
            }else{
                tagArray = tagArray.concat(filtersArray.filter(element => element.noAccent ===filterItem.textContent.toLowerCase().noAccent().trim()))
                
            }
        }
    }
        
    //saisie user et/ou tags -> recherche des recettes à afficher
    if (tagArray.length >0) {

        let recipesToDisplayArray =[]
        for (let i = 0; i < tagArray.length; i++) {
            const id = tagArray[i].id;
            if (tagArray.filter(element => element.id == id).length == nbTag){
                if (recipesToDisplayArray.length == 0) {
                    recipesToDisplayArray = recipesArray.filter(element => element.id == id)
                }else{
                    recipesToDisplayArray = recipesToDisplayArray.concat(recipesArray.filter(element => element.id == id))
                }
            }            
        }
        
        for (let i = 0; i < recipesArray.length; i++) {
            recipesArray[i].display = false
        }

        for (let i = 0; i < recipesToDisplayArray.length; i++) {
            recipesArray.filter(element => element.id == recipesToDisplayArray[i].id)[0].display = true
        }
    //aucun filtre ni recherche, on affiche toutes les recettes
    }else{
        for (let i = 0; i < recipesArray.length; i++) {
            recipesArray[i].display = true
        }
    }
}



//récupération des tags et recup des recipes et filtres concernés
var filterTagsGestion = () => {

    const ingredientsTag = document.querySelectorAll(".ingredientTag")
    const ustensilsTag = document.querySelectorAll(".ustensilTag")
    const appliancesTag = document.querySelectorAll(".applianceTag")
    let nbTag = ingredientsTag.length + ustensilsTag.length + appliancesTag.length
    if ( nbTag == 0) {
        for (let i = 0; i < recipesArray.length; i++) {
            recipesArray[i].display = true
        }
    }else{

        let filtersToTagArray = []

        if (ingredientsTag.length > 0) {
            filtersToTagArray = getNewTags(ingredientsTag,ingredientsArray)
        }
        if (ustensilsTag.length > 0) {
            filtersToTagArray = filtersToTagArray.concat(getNewTags(ustensilsTag,ustensilsArray))
        }
        if (appliancesTag.length > 0) {
            filtersToTagArray = filtersToTagArray.concat(getNewTags(appliancesTag,appliancesArray))
        }

        //update recipes to display depending on tag filters
        for (let i = 0; i < recipesArray.length; i++) {
            recipesArray[i].display = false
        }
        for (let i = 0; i < filtersToTagArray.length; i++) {
            const id = filtersToTagArray[i].id;
            if (filtersToTagArray.filter(element => element.id == id).length == nbTag){
                recipesArray.filter(element => element.id == id)[0].display = true
            }            
        }
        
    }

}

/**
 * Récupération de l'ensemble des tags
 * @param {object} filtersTag .ingredientTag, .ustensilTag, .applianceTag
 * @param {array} filtersArray  ingredientsArray, ustensilsArray, appliancesArray
 * @returns array avec l'ensemeble des tags
 */
 var getNewTags = (filtersTag, filtersArray) => {

    let filtersToTagArray = []
    let tempArray = []
    if (filtersTag.length > 0) {
        for (let i = 0; i < filtersTag.length; i++) {
            const filterToTag = filtersTag[i].firstChild.textContent.toLowerCase().noAccent().trim();
            tempArray = filtersArray.filter(element => element.noAccent === filterToTag)
            filtersToTagArray = filtersToTagArray.concat(tempArray)
        }
        return filtersToTagArray
    }
}