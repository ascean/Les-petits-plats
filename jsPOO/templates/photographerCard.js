class PhotographerCard {

    constructor(photographer) {
        this._photographer = photographer
        //this._photographer = Photographer {_name: 'Mimi Keel', _id: 243, _city: 'London', _country: 'UK', _tagline: 'Voir le beau dans le quotidien', …}
    }

    createProtographerCard() {

        const ARTICLE = document.createElement( 'article' );

        const photographerCard =  
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
        ARTICLE.innerHTML = photographerCard;
        return ARTICLE;
    }
}