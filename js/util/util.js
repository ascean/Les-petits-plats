//gestion des caractères accentués
String.prototype.noAccent = function(){
    var accentArray = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccentArray = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
     
    var words = this;
    for(var i = 0; i < accentArray.length; i++){
        words = words.replace(accentArray[i], noaccentArray[i]);
    }
     
    return words;
}


/**
 * retrait des éléments en double dans un tableau d'objets
 * @param {array} filterArray 
 * @param {string} field 
 * @returns array
 */
var removeDuplicates = (filterArray, field) => {
    
    // Declaration d'un nouveau tableau
    let filterArrayToDisplay = [];
    // Declaration d'un objet vide
    let uniqueFilter = {};
    // Boucle dans le tableau
    for (let i in filterArray) {
        // Extraction d'un élément
        filterField = filterArray[i][field];
        // Utilisation de l'élément comme index
        uniqueFilter[filterField] = filterArray[i];
    }
      
    //Boucle pour ajouter l'élément dans le tableau
    for (i in uniqueFilter) {
        filterArrayToDisplay.push(uniqueFilter[i]);
    }
    //Retourne le nouveau tableau
    return filterArrayToDisplay
}
