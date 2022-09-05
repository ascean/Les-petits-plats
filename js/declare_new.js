const sectionRecipes = document.getElementById('section-recipes')
const inputSearch = document.getElementById('input-search')
const formSearch = document.getElementById('form-search')
// const formFilters = document.querySelectorAll('.form-filter')
const filterItemsContainer = document.getElementById("filter-items")
const ingredientFilterDOM = document.getElementById("ingredient-filter")
const applianceFilterDOM = document.getElementById("appliance-filter")
const ustensilFilterDOM = document.getElementById("ustensil-filter")

let inputFilters = document.querySelectorAll('.input-filter')
let dropdownItems
let filterItems

// let allRecipes  //tableau contenant l'ensemble de recettes provenant de recipes.js
let recipesArray = []    //tableau contenant les recettes correspondant aux filtres
let ingredientsArray = []
let appliancesArray = []
let ustensilsArray = []
let filtersArray = []
let tagArray = []