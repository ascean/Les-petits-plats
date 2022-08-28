class App {
    constructor() {

        //sélection de l'élément du DOM
        //this.photographerSection = div.photographer-section
        this.photographerSection = document.querySelector(".photographer-section")

        //appel de la class PhotographersApi dans api.js
        //création de l'objet PhotographersApi->{_url: '/data/photographers.json'}
        //this.photographersApi = PhotographersApi
        this.photographersApi = new PhotographersApi('/data/photographers.json') 

    }

    async main () {
        const PHOTOGRAPHERSDATA = await this.photographersApi.getPhotographers()
        //PHOTOGRAPHERSDATA = [
        // 0: {name: 'Mimi Keel', id: 243, city: 'London', country: 'UK', tagline: 'Voir le beau dans le quotidien', …}
        // 1: {name: 'Ellie-Rose Wilkens', id: 930, city: 'Paris', country: 'France', tagline: 'Capturer des compositions complexes', …}
        // 2: {name: 'Tracy Galindo', id: 82, city: 'Montreal', country: 'Canada', tagline: 'Photographe freelance', …}
        // 3: {name: 'Nabeel Bradford', id: 527, city: 'Mexico City', country: 'Mexico', tagline: "Toujours aller de l'avant", …}
        // 4: {name: 'Rhode Dubois', id: 925, city: 'Barcelona', country: 'Spain', tagline: 'Je crée des souvenirs', …}
        // 5: {name: 'Marcel Nikolic', id: 195, city: 'Berlin', country: 'Germany', tagline: 'Toujours à la recherche de LA photo', …}
        // ]
        
        PHOTOGRAPHERSDATA
        .map(photographer => new Photographer(photographer))
        .forEach(photographer => {
                //Photographer {_name: 'Mimi Keel', _id: 243, _city: 'London', _country: 'UK', _tagline: 'Voir le beau dans le quotidien', …}

                const TEMPLATE = new PhotographerCard(photographer)
                /*TEMPLATE
                    {
                    "_photographer": {
                        "_name": "Mimi Keel",
                        "_id": 243,
                        "_city": "London",
                        "_country": "UK",
                        "_tagline": "Voir le beau dans le quotidien",
                        "_price": 400,
                        "_portrait": "MimiKeel.jpg"
                    }
                }*/
                console.log(TEMPLATE);
                this.photographerSection.appendChild(TEMPLATE.createProtographerCard())
            }
            
         );
    }
}

const APP = new App()
APP.main()