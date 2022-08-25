const navItems = document.querySelectorAll(".nav-item")

/**
 * survol du filtre :
 *      affichage de l'input avec le placeholder
 *      élargissement de la zone de filtre
 * @param {object} navItem élément li
 * @param {string} action over ou leave
 */
var displayFilter = (navItem, action) => {

    const inputFilter = navItem.querySelector(".form-control")
    
    if (action === "over") {
        
        inputFilter.classList.remove("d-none")
        navItem.classList.replace("col-lg-2", "col-lg-6")

    } else {
            
        inputFilter.classList.add("d-none")
        navItem.classList.replace("col-lg-6", "col-lg-2")
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
