const { Schema, model } = require('mongoose');

const ToppingSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    }
});

ToppingSchema.methods.toJSON = function() {
    const { __v, state , ...data  } = this.toObject();
    return data;
}

module.exports = model( 'Topping', ToppingSchema );