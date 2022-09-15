//-----------------------------------------LISTENERS------------------------------------------
var setupListeners = () => {

    /******Zone de recherche******/
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
            updateFiltersArray()
        }
    })
    
    /******FILTRES******/
    //Listes
    navItems.forEach(navItem => {
        navItem.addEventListener("mouseleave", () => {
            updateFilterList(navItem, "close")
        })
        navItem.addEventListener("mouseover", () => {
            updateFilterList(navItem, "open")
        })
    })
    
    //Listes : navigation au clavier
    navLinks.forEach(navLink => {
        navLink.addEventListener("click", () => {
            const navItem = navLink.parentElement
            updateFilterList(navItem, "open")
        })
        navLink.addEventListener("focus", () => {
            const navItem = navLink.parentElement
            closeFilterList(navItem)
        })
    })

    formFilters.forEach(formFilter => {
        formFilter.addEventListener("submit", (e) => {
            e.preventDefault()
        })
    })
    //Listes : Saisie dans une zone de filtre
    for (let i = 0; i < inputFilters.length; i++) {
        const inputFilter = inputFilters[i];
        inputFilter.addEventListener('input', (e) => {
            searchInputFilter(e)
        })
    }

}

//clic sur un élément de la liste -> suppression de la liste + ajout tag
var addFilterListener = (filterItem) => {
    filterItem.addEventListener("click", (e) => {
        clickOnFilter(e)
    })
}

