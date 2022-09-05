/**
 * display appliances from recipes (display=true)
 */
var displayFilters = () => {

    let tempFiltersArray = []
    console.log(filtersArray.filter(elt => elt.display == true))
    const tempRecipesArray = recipesArray.filter(element => element.display === true)
    for (let i = 0; i < tempRecipesArray.length; i++) {
        const recipe = tempRecipesArray[i];
        tempFiltersArray = tempFiltersArray.concat(filtersArray.filter(element => element.id === recipe.id))
    }
    tempFiltersArray = removeDuplicates(tempFiltersArray, "noAccent")

    //suppression des éléments en tag dans la liste des filtres
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

    ingredientsArray = tempFiltersArray.filter(element => element.type === "ingredient" && element.display == true)
    createFilterDOM(ingredientsArray, ingredientFilterDOM, "ingredient")

    ustensilsArray = tempFiltersArray.filter(element => element.type === "ustensil")
    createFilterDOM(ustensilsArray, ustensilFilterDOM, "ustensil")

    appliancesArray = tempFiltersArray.filter(element => element.type === "appliance")
    createFilterDOM(appliancesArray, applianceFilterDOM, "appliance")

    return tempFiltersArray

}


/**
 * Déclencheur : clic sur un élément de filtre
 * 1-ajout du tag dans le DOM
 * 2-recherche des recettes en fonction des tags + recherche user
 * 3-suppression du filtre cliqué de la liste des filtres
 * 4-affichage des recettes concernées
 * 5-affichage des filtres concernés
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
    // switch (typeFilter) {
    //     case "ingredient" :
    //         updateFilterLists(filterToTag.toLowerCase().noAccent(), 0, "remove",[])
    //         break;
    //     case "appliance" :
    //         updateFilterLists(filterToTag.toLowerCase().noAccent(), 1, "remove",[])
    //         break;
    //     case "ustensil" :
    //         updateFilterLists(filterToTag.toLowerCase().noAccent(), 2, "remove",[])
    //         break;

    //     default:
    //         break;
    // }



    //*4*
    displayRecipes()

    //*5*
    displayFilters()

}

/**
 * MAJ de la liste des filtres : filtre en fonction de la saisie ou suppression si clic pour tag
 * @param {string} filterUser saisie utilisateur ou nom de l'élément cliqué
 * @param {string} type ingredient ou ustensil ou appliance
 * @param {string} mode remove = on supprime le filtre de la liste / add = ajout du filtre dans la liste
 */
var updateFilterLists = (filterUser, type, mode, tempFilterArray) => {

    let filterDOM
    let typeFilter

    switch (type) {
        case 0:
            filterDOM = ingredientFilterDOM
            typeFilter = "ingredient"
            break;
        case 1:
            filterDOM = applianceFilterDOM
            typeFilter = "appliance"
            break;
        case 2:
            filterDOM = ustensilFilterDOM
            typeFilter = "ustensil"
            break;

        default:
            break;
    }

    if (tempFilterArray.length == 0) {
        tempFilterArray = filtersArray.filter(element => element.type === typeFilter)
    } else {
        tempFilterArray = tempFilterArray.filter(element => element.type === typeFilter)
    }

    //tempFilterArray = removeDuplicates(tempFilterArray,"noAccent")
    let tempTagArray = removeDuplicates(tagArray, "noAccent")

    //filtre du tableau filtersArray en fonction du type de filtre
    console.log(tempTagArray);
    console.log(tempFilterArray);
    //duplicates ????
    for (let i = 0; i < tempFilterArray.length; i++) {

        const filterElt = tempFilterArray[i];


        switch (mode) {
            //Ajout élément dans la liste (après suppression tag)
            case "add":
                if (filterElt.noAccent == filterUser) {
                    filterElt.display = true
                } else {
                    filterElt.display = false
                }
                break;
            //Suppression de l'élément dans la liste (après ajout tag)
            case "remove":
                //attention ! supprimer aussi les autres éléments taggés!
                if (filterElt.noAccent == filterUser || tempTagArray.filter(tag => tag.noAccent == filterElt.noAccent).length > 0) {
                    filterElt.display = false
                } else {
                    filterElt.display = true
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

    //createFilterDOM(tempFilterArray, filterDOM, typeFilter)
    //inputFilters = document.querySelectorAll('.input-filter')
}

var searchUserFilters = (e) => {
    const filterUser = e.target.value.toLowerCase().noAccent()
    switch (e.currentTarget.id) {
        case "input-ingredient":
            for (let i = 0; i < ingredientsArray.length; i++) {
                const element = ingredientsArray[i].noAccent;
                ingredientsArray[i].display = element.includes(filterUser)
            }
            createFilterDOM(ingredientsArray, ingredientFilterDOM, "ingredient")
            break;
        case "input-appliance":
            for (let i = 0; i < appliancesArray.length; i++) {
                const element = appliancesArray[i].noAccent;
                appliancesArray[i].display = element.includes(filterUser)
            }
            createFilterDOM(appliancesArray, applianceFilterDOM, "appliance")
            break;
        case "input-ustensil":
            for (let i = 0; i < ustensilsArray.length; i++) {
                const element = ustensilsArray[i].noAccent;
                ustensilsArray[i].display = element.includes(filterUser)
            }
            createFilterDOM(ustensilsArray, ustensilFilterDOM, "ustensil")
            break;

        default:
            break;
    }

    for (let i = 0; i < filtersArray.length; i++) {
        filtersArray[i].display = true
    }
}