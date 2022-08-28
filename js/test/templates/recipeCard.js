class RecipeCard {

    constructor(recipe) {
        this._recipe = recipe
    }

    createRecipeCard() {

        const row = document.createElement( 'div' );
        row.classList.add("row")

        const recipeCard =  
            `<div class="col col-12 col-md-6 col-lg-4 mb-4">
                <div class="card border-0">
                    <div class="card-img-top "></div>
                    <div class="card-body rounded-bottom p-3">
                        <div class="row w-100 d-flex align-items-center mx-0 mb-3">
                            <div class="col col-8 pl-0">
                                <h2 class="card-title mb-0">Limonade de Coco</h2>
                            </div>
                            <div class="col col-4 text-right p-0">
                                <span><i class="fa-regular fa-clock mr-1"></i></span>
                                <span class="font-weight-bold">10 min</span>
                            </div>
                        </div>
                        <div class="row lh-1">
                            <div class="col col-6 pr-0">
                                <ul class="card-text ingredient-container pl-0">
                                    <li><span class="ingredient-item font-weight-bold">Lait de coco : </span><span>400ml</span></li>
                                    <li><span class="ingredient-item font-weight-bold">Jus de citron : </span><span>2</span></li>
                                    <li><span class="ingredient-item font-weight-bold">Crème de coco : </span><span>4 cuillères</span></li>
                                    <li><span class="ingredient-item font-weight-bold">Sucre : </span><span>20g</span></li>
                                    <li><span class="ingredient-item font-weight-bold">Glaçons : </span><span>2</span></li>
                                </ul>
                            </div>
                            <div class="instructions col col-6">
                                <p>Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. 
                                    Mixer jusqu'à avoir la consistence désirée.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        `





            `<img src=${this._photographer.portrait} class="img-photographer" alt="${this._photographer.name}">
            <h2>${this._photographer.name}</h2>
            <div class="infos">
                <p class="localisation">${this._photographer.city}, ${this._photographer.country}</p>
                <p>${this._photographer.tagline}</p>
                <p class="price">${this._photographer.price}€/jour</p>
            </div>`
        /* 
            <img src=/assets/photographers/EllieRoseWilkens.jpg class="img-photographer" alt="Ellie-Rose Wilkens">
            <h2>Ellie-Rose Wilkens</h2>
            <div class="infos">
                <p class="localisation">Paris, France</p>
                <p>Capturer des compositions complexes</p>
                <p class="price">250€/jour</p>
            </div>
        */
        row.innerHTML = recipeCard;
        return ARTICLE;
    }
}