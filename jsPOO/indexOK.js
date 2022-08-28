var request = 'http://127.0.0.1:5555/data/photographers.json'

var getPhotographers = async () => {

    let response = await fetch(request)
    let photographers = await response.json()
    return photographers
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer-section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
