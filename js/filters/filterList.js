const navLinks = document.querySelectorAll(".nav-link")
const navItems = document.querySelectorAll(".nav-item")

/**
 * survol du nav-item ou clic sur nav-link (navigation au clavier)
 *      affichage de l'input avec le placeholder
 *      élargissement de la zone de filtre
 * @param {DOMElement} navItem élément li
 * @param {string} action open ou close
 */
var displayFiltersMenu = (navItem, action) => {

    const inputFilter = navItem.querySelector(".form-control")
    
    if (action === "open") {
        
        inputFilter.classList.remove("d-none")
        navItem.classList.replace("rounded","rounded-top")
        navItem.classList.replace("col-lg-2", "col-lg-7")
        
    }else{
        
        inputFilter.classList.add("d-none")
        navItem.classList.replace("rounded-top","rounded")
        navItem.classList.replace("col-lg-7", "col-lg-2")
        
    }
}

/**
 * Retour à l'état initial pour le menu actuellement ouvert
 * @param {DOMElement} newNavItem menu sur lequel arrive le focus 
 */
var closeFilterMenu = (newNavItem) => {

    navItems.forEach(navItem => {
        if (navItem != newNavItem && navItem.classList.contains("show")) {
            navItem.querySelector(".form-control").classList.add("d-none")
            navItem.classList.replace("rounded-top","rounded")
            navItem.classList.replace("col-lg-7", "col-lg-2")
            navItem.children[2].classList.remove("show")
        }
    });

}