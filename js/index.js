const navItems = document.querySelectorAll(".nav-item")

var displayFilter = (navItem, action) => {

    const labelFilter = navItem.querySelector(".nav-link")
    const inputFilter = navItem.querySelector(".form-control")
    
    //survol du filtre :
    //  affichage de l'input avec le placeholder
    //  libellé par défaut invisible
    //  élargissement de la zone de filtre
    //  agrandissement hauteur en fonction du nombre de dropdown-menu
    if (action === "over") {
        
        labelFilter.style.opacity = "0"
        inputFilter.classList.remove("d-none")
        
        navItem.classList.replace("col-2", "col-6")
        navItem.classList.remove("default-filter-height")
        const dropdownItems = navItem.querySelectorAll(".dropdown-item")
        
        let nbdropdownItem = dropdownItems.length
        if (nbdropdownItem === 0) {
            nbdropdownItem = 1
        }
        nbdropdownItem = nbdropdownItem * 50
        navItem.style.setProperty("height", `${nbdropdownItem}px`)

    } else {
        
        labelFilter.style.opacity = "1"
        
        inputFilter.classList.add("d-none")
        
        navItem.classList.replace("col-6", "col-2")
        navItem.classList.add("default-filter-height")
        navItem.style.removeProperty('height')

    }
}

navItems.forEach(navItem => {
    navItem.addEventListener("mouseover", () => {
        displayFilter(navItem, "over")
    })
    navItem.addEventListener("mouseleave", () => {
        displayFilter(navItem, "leave")
    })
})
