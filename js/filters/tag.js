/**
 * 1-suppression du tag cliqué / élément ajouté dans la liste des items filtres
 * 2-recherche des recettes correspondant à la saisie user + tags sélectionnés
 * 3-affichage des recettes concernées
 * 3-affichage des filtres concernés
 * call dans listener.js sur click de l'icon du tag
 * @param {object}  //button tag icon
 */
 var clickOnTag = (e) => {

    let tagItem = e.target.parentNode
    let tagText = e.target.parentNode.firstChild.textContent.toLowerCase().noAccent().trim()


    let tempFilterArray = filtersArray.filter(element =>element.noAccent === tagText)
    for (let i = 0; i < tempFilterArray.length; i++) {
        tempFilterArray[i].display = true;
    }
    
    //*1*
    filterItemsContainer.removeChild(tagItem)
    //*2*
    searchRecipesWithTags()
    //*3*
    displayRecipes()
    //*4*
    displayFilters()
}

/**
 * recherche des recettes correspondant à la saisie user + tags sélectionnés
 */
var searchRecipesWithTags = () => {

    let nbTag=0
    tagArray = []

    //si saisie user dans rechercher une recette
    if (inputSearch.value.length>2) {
        let searchRecipe = inputSearch.value.toLowerCase().noAccent()
        for (let i = 0; i < recipesArray.length; i++) {
            recipesArray[i].display = false
        }
        tagArray = searchForRecipes(searchRecipe)
        if (tagArray.length > 0) {
            nbTag = 1
        }
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

    //(aucun tag) et (recherche vide ou sans résultat)
    }else{
        //aucune recette affichée
        if(inputSearch.value.length > 2) {
            for (let i = 0; i < recipesArray.length; i++) {
                recipesArray[i].display = false
            }
        }else{
            //on affiche toutes les recettes
            for (let i = 0; i < recipesArray.length; i++) {
                recipesArray[i].display = true
            }

        }
    }
}