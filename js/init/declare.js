const navLinks      = document.querySelectorAll(".nav-link")
const navItems      = document.querySelectorAll(".nav-item")
const sectionRecipes = document.getElementById('section-recipes')
const inputSearch   = document.getElementById('input-search')
const formSearch    = document.getElementById('form-search')
const filterItemsContainer  = document.getElementById("filter-items")
const ingredientFilterDOM   = document.getElementById("ingredient-filter")
const applianceFilterDOM    = document.getElementById("appliance-filter")
const ustensilFilterDOM     = document.getElementById("ustensil-filter")

let inputFilters = document.querySelectorAll('.input-filter')
let dropdownItems
let filterItems

let recipesArray    = [] 
let ingredientsArray = []
let appliancesArray = []
let ustensilsArray  = []
let filtersArray    = []
let tagArray        = []