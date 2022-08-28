class Api {

    constructor(url) {
        this._url = url;
    }
    
    async get() {

        return fetch(this._url)
            .then(response => response.json())
            .then(response => response.photographers)
            .catch(err => console.log('Erreur', err))
        }
    }
    
class PhotographersApi extends Api {
    
    constructor(url) {
        super(url)
        console.log("this.url:",url);
    }

    async getPhotographers() {
        return await this.get()
    }
}