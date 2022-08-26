const navLinks = document.querySelectorAll(".nav-link")
const navItems = document.querySelectorAll(".nav-item")

/**
 * survol du nav-item ou clic sur nav-link (navigation au clavier)
 *      affichage de l'input avec le placeholder
 *      élargissement de la zone de filtre
 * @param {DOMElement} navItem élément li
 * @param {string} action open ou close
 */
var displayMenu = (navItem, action) => {

    const inputFilter = navItem.querySelector(".form-control")
    
    if (action === "open") {
        
        inputFilter.classList.remove("d-none")
        navItem.classList.replace("rounded","rounded-top")
        navItem.classList.replace("col-lg-2", "col-lg-6")
        
    }else{
        
        inputFilter.classList.add("d-none")
        navItem.classList.replace("rounded-top","rounded")
        navItem.classList.replace("col-lg-6", "col-lg-2")
        
    }
}

/**
 * Retour à l'état initial pour lemenu précédemment ouvert
 * @param {DOMElement} newNavItem menu sur lequel arrive le focus 
 */
var resizeMenu = (newNavItem) => {

    navItems.forEach(navItem => {
        if (navItem != newNavItem && navItem.classList.contains("show")) {
            navItem.querySelector(".form-control").classList.add("d-none")
            navItem.classList.replace("rounded-top","rounded")
            navItem.classList.replace("col-lg-6", "col-lg-2")
            navItem.children[2].classList.remove("show")
        }
    });

}

//--------------------------------------------- LISTENERS MENU ----------------------------------------
navItems.forEach(navItem => {
    navItem.addEventListener("mouseover", () => {
        displayMenu(navItem, "open")
    })

    navItem.addEventListener("mouseleave", () => {
        displayMenu(navItem, "close")
    })
})

//Pour gestion de la navigation au clavier
navLinks.forEach(navLink => {
    navLink.addEventListener("click", () => {
        const navItem = navLink.parentElement
        displayMenu(navItem,"open")
    })
    navLink.addEventListener("focus", () => {
        const navItem = navLink.parentElement
        resizeMenu(navItem)
    })
})