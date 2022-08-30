//-----------------------------------------LISTENERS------------------------------------------
var setupListeners = () => {

    //Saisie dans la zone de recherche
    inputSearch.addEventListener('input', () => {
        if (inputSearch.value.length>2) {
            searchRecipes()
        }
    })

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault()
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
            console.log("click");
            displayFiltersMenu(navItem, "open")
        })
        navLink.addEventListener("focus", () => {
            const navItem = navLink.parentElement
            console.log("focus");
            closeFilterMenu(navItem)
        })
    })

    //mise à jour des filtres + création tag
    for (let i = 0; i < formFilters.length; i++) {
        const formFilter = formFilters[i];
        formFilter.addEventListener("submit", (e) => {
            e.preventDefault()
            createTagDOM(e.target.id)
            updateFilters(e)
        })
    }

    //Saisie dans une zone de filtre
    for (let i = 0; i < inputFilters.length; i++) {
        const inputFilter = inputFilters[i];
        inputFilter.addEventListener('input', () => {
            if (inputFilter.value.length>2) {
                searchRecipes()
            }
        })
    }
}
