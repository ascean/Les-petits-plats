class App {
    constructor() {

        //sélection de l'élément du DOM
        this.recipeSection = document.getElementById("section-cards")

        //appel de la class PhotographersApi dans api.js
        //création de l'objet PhotographersApi->{_url: '/data/photographers.json'}
        //this.photographersApi = PhotographersApi
        this.recipeApi = new RecipeAPI('./data/recipes.js') 

    }

    async main () {
        const recipeDatas = await this.recipeApi.getRecipes()
        
        recipeDatas
        .map(recipe => new Recipe(recipe))
        .forEach(recipe => {

                const TEMPLATE = new RecipeCard(recipe)
                this.recipeSection.appendChild(TEMPLATE.createRecipeCard())
            }
            
         );
    }
}

const APP = new App()
APP.main()