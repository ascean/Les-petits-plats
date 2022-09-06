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

///remove double elements in array of objects
var removeDuplicates = (filterArray, field) => {
    
    // Declare a new array
    let filterToDisplay = [];
    // Declare an empty object
    let uniqueFilter = {};
    // Loop for the array elements
    for (let i in filterArray) {
        // Extract the element
        filterField = filterArray[i][field];
        // Use the element as the index
        uniqueFilter[filterField] = filterArray[i];
    }
      
    // Loop to push unique object into array
    for (i in uniqueFilter) {
        filterToDisplay.push(uniqueFilter[i]);
    }
    // Display the unique objects
    return filterToDisplay
}
