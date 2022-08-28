class Recipe {
    
    constructor(data) {
        this._id = data.id
        this._name = data.name
        this._servings = data.servings
        this._time = data.time
        this._description = data.description
        this._appliance = data.appliance
        this._ingredients = data.ingredients
        this._usentils = data.ustensils
    }

    get name() {
        return this._name;
    }
    get id() {
        return this._id;
    }
    get servings() {
        return this._servings;
    }
    get description() {
        return this._description;
    }
    get appliance() {
        return this._appliance;
    }
    get ingredients() {
        return this._ingredients;
    }
    get ustensils() {
        return this._ustensils;
    }
}