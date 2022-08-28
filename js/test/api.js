class Api {

    constructor(url) {
        this._url = url;
    }
    
    async get() {

        return fetch(this._url)
            .then(response => response.json())
            .then(response => response.recipes)
            .catch(err => console.log('Erreur', err))
        }
    }
    
class RecipeAPI extends Api {
    
    constructor(url) {
        super(url)
        console.log("this.url:",url);
    }

    async getRecipes() {
        return await this.get()
    }
}