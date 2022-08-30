const filterItems = document.getElementById("filter-items")

let bFound
let tagArray = [] 

/**
 * création du DOM tag correspondant au filtre saisi
 */
 var createTagDOM = (id) => {
    console.log(id);

    const filterItem = document.createElement("button")
    filterItem.classList.add("filter-item", "primary-color", "border-0", "rounded", "px-3", "py-2", "mb-3", "mr-2", "text-white")
    filterItem.innerHTML = `${inputSearch.value} <i class="filter-icon fa-regular fa-circle-xmark ml-2 fs-5 align-middle"></i>`
    filterItems.appendChild(filterItem)

    tagArray.push(inputSearch.value)
    inputSearch.value=""

    filterIcon = filterItem.querySelector(".filter-icon")
    filterIcon.addEventListener("click", removeFilterItem)
    
}

/**
 * suppression du tag cliqué
 * @param {object}  
 */
var removeFilterItem = (e) => {
    filterItems.removeChild(e.target.parentNode)

    for (let i = 0; i < tagArray.length; i++) {
        const searchItem = tagArray[i];
        if (searchItem===e.target.parentNode.innerText.trim()) {
            tagArray.splice(i,1)
            break
        }
    }
    initArrayAndDOM()
}



