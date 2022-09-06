/**
 * Affichage des filtres
 * 1- recherche de l'ensemble des filtres correspondant aux recettes concernées
 * 2- suppression des éléments en tag dans la liste des filtres
 * 3- création de la liste des filtres dans le DOM
 * @returns tempFiltersArray
 */
var displayFilters = () => {

    //*1*
    let tempFiltersArray = []
    const tempRecipesArray = recipesArray.filter(element => element.display === true)
    for (let i = 0; i < tempRecipesArray.length; i++) {
        const recipe = tempRecipesArray[i];
        tempFiltersArray = tempFiltersArray.concat(filtersArray.filter(element => element.id === recipe.id))
    }
    tempFiltersArray = removeDuplicates(tempFiltersArray, "noAccent")

    //*2*
    if (tagArray.length > 0) {
        for (let i = 0; i < tagArray.length; i++) {
            const tag = tagArray[i];
            //tagArray contient les tags + la recherche de l'utilisateur
            //ici on ne teste que les tags
            if (tag.noAccent) {
                tempFiltersArray.filter(elt => elt.noAccent == tag.noAccent)[0].display = false
            }
        }
    }

    //*3*
    ingredientsArray = tempFiltersArray.filter(element => element.type === "ingredient")
    createFilterDOM(ingredientsArray, ingredientFilterDOM, "ingredient")
    appliancesArray = tempFiltersArray.filter(element => element.type === "appliance")
    createFilterDOM(appliancesArray, applianceFilterDOM, "appliance")
    ustensilsArray = tempFiltersArray.filter(element => element.type === "ustensil")
    createFilterDOM(ustensilsArray, ustensilFilterDOM, "ustensil")

    return tempFiltersArray

}


/**
 * Déclencheur : clic sur un élément de filtre
 * 1-ajout du tag dans le DOM
 * 2-recherche des recettes en fonction des tags + recherche user
 * 3-affichage des recettes concernées
 * 4-affichage des filtres concernés
 * @param {object} e élément du DOM
 */
var clickOnFilter = (e) => {
    let typeFilter = e.target.classList[0]
    let filterToTag = e.target.textContent

    //*1*
    addTagDOM(typeFilter, filterToTag)

    //*2*
    searchRecipesWithTags()

    //*3*
    displayRecipes()

    //*4*
    displayFilters()

}

/**
 * MAJ de la liste des filtres : filtre en fonction de la saisie ou suppression si clic pour tag
 * @param {string} filterUser saisie utilisateur ou nom de l'élément cliqué
 * @param {string} type ingredient ou ustensil ou appliance
 * @param {string} mode remove = on supprime le filtre de la liste / add = ajout du filtre dans la liste
 * @param
 */
var updateFilterLists = (filterUser, type, mode, tempFilterArray) => {

    let filterDOM
    let filterType

    switch (type) {
        case 0:
            filterDOM = ingredientFilterDOM
            filterType = "ingredient"
            break;
        case 1:
            filterDOM = applianceFilterDOM
            filterType = "appliance"
            break;
        case 2:
            filterDOM = ustensilFilterDOM
            filterType = "ustensil"
            break;

        default:
            break;
    }

    if (tempFilterArray.length == 0) {
        tempFilterArray = filtersArray;
    } 
    tempFilterArray = tempFilterArray.filter(element => element.type === filterType)

    let tempTagArray = removeDuplicates(tagArray, "noAccent")

    //filtre du tableau filtersArray en fonction du type de filtre
    for (let i = 0; i < tempFilterArray.length; i++) {

        const filterElt = tempFilterArray[i];
        switch (mode) {
            //Ajout élément dans la liste (après suppression tag)
            case "add":
                filterElt.display = false
                if (filterElt.noAccent == filterUser) {
                    filterElt.display = true
                }
                break;

            //Suppression de l'élément dans la liste (après ajout tag)
            case "remove":
                //attention ! supprimer aussi les autres éléments taggés!
                filterElt.display = true
                if (filterElt.noAccent == filterUser || tempTagArray.filter(tag => tag.noAccent == filterElt.noAccent).length > 0) {
                    filterElt.display = false
                }
                break;

            //recherche élément dans la liste
            case "select":
                filterElt.display = filterElt.noAccent.includes(filterUser)
                break;

            default:
                break;
        }
    }
}

/**
 * Saisie dans une zone de filtre -> affichage des éléments de filtres contenant la saisie
 * call sur input de champ de saisie filtre
 * @param {object} e 
 */
var searchUserFilters = (e) => {
    const filterUser = e.target.value.toLowerCase().noAccent()
    let filterArray = []
    let filterDOM
    let filterType

    switch (e.currentTarget.id) {
        case "input-ingredient":
            filterArray = ingredientsArray
            filterDOM   = ingredientFilterDOM
            filterType  = "ingredient"
            break;
        
        case "input-appliance":
            filterArray = appliancesArray
            filterDOM   = applianceFilterDOM
            filterType  = "appliance"
            break;
        case "input-ustensil":
            filterArray = ustensilsArray
            filterDOM   = ustensilFilterDOM
            filterType  = "ustensil"
            break;
            
        default:
                break;
    }
    for (let i = 0; i < filterArray.length; i++) {
        const element = filterArray[i].noAccent;
        filterArray[i].display = element.includes(filterUser)
    }
    createFilterDOM(filterArray, filterDOM, filterType)

    for (let i = 0; i < filtersArray.length; i++) {
        filtersArray[i].display = true
    }
}