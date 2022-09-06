//-----------------------------------------LISTENERS------------------------------------------
var setupListeners = () => {

    //Saisie dans la zone de recherche des recettes
    inputSearch.addEventListener('input', () => {
        searchUserRecipes()
    })
    
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault()
    })
    //validation saisie avec Entrée ou clic sur l'icone X
    inputSearch.addEventListener('search', (e) => {
        if(inputSearch.value) {
            searchUserRecipes()
        }else{
            displayRecipes()
            displayFilters()
        }
    })

    //Gestion menus filtres
    navItems.forEach(navItem => {
        navItem.addEventListener("mouseleave", () => {
            displayFiltersMenu(navItem, "close")
        })
        navItem.addEventListener("mouseover", () => {
            displayFiltersMenu(navItem, "open")
        })
    })

    //Gestion menus filtres : navigation au clavier
    navLinks.forEach(navLink => {
        navLink.addEventListener("click", () => {
            const navItem = navLink.parentElement
            displayFiltersMenu(navItem, "open")
        })
        navLink.addEventListener("focus", () => {
            const navItem = navLink.parentElement
            closeFilterMenu(navItem)
        })
    })

    formFilters.forEach(formFilter => {
        formFilter.addEventListener("submit", (e) => {
            e.preventDefault()
        })
    })
    //Saisie dans une zone de filtre
    for (let i = 0; i < inputFilters.length; i++) {
        const inputFilter = inputFilters[i];
        inputFilter.addEventListener('input', (e) => {
            searchUserFilters(e)
        })
    }

}

//clic sur un filtre -> suppression de la liste + ajout tag
var addFilterListener = (filterItem) => {
    filterItem.addEventListener("click", (e) => {
        clickOnFilter(e)
    })
}

