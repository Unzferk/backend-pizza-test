const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    
        console.log('database online');

    } catch (error) {
        console.log(error);
        throw new Error('Cant connect to database');
    }


}

module.exports = {
    dbConnection
}
