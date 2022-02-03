const topping = require("../models/topping");

// Toppings
const toppingExist = async( id ) => {
    const itExist = await topping.findById(id);
    if ( !itExist ) {
        throw new Error(`This id topping doesnt exist ${ id }`);
    }
}

module.exports={
    toppingExist
}