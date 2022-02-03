const { Schema, model } = require('mongoose');

const PizzaSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    toppings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Topping',          
        }
    ]
});

PizzaSchema.methods.toJSON = function() {
    const { __v, state , ...data  } = this.toObject();
    return data;
}

module.exports = model( 'Pizza', PizzaSchema );