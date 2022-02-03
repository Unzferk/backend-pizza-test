const topping = require("../models/topping");
const pizza = require("../models/pizza");

// Toppings Validators
const toppingExist = async( id ) => {
    const itExist = await topping.findById(id);
    if ( !itExist ) {
        throw new Error(`This id topping doesnt exist ${ id }`);
    }
}


// Pizzas Validators
const pizzaExist = async( id ) => {
    const itExist = await pizza.findById(id);
    if ( !itExist ) {
        throw new Error(`This id pizza doesnt exist ${ id }`);
    }
}


module.exports={
    toppingExist,
    pizzaExist
}