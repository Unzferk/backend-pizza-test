const mongoose = require('mongoose');

const dbConnection = async() => {

    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    //Get the default connection
    const db = mongoose.connection;

    //catch error
    db.on('error', console.error.bind(console, 'Cant connect to database:'));
    //all fine
    db.once("open", function () {
        console.log("Database is online");
    });
    
}

module.exports = {
    dbConnection
}
