
const express = require('express');
const { dbConnection } = require('../database/config');
//const cors = require('cors');

class Server{

    constructor(){
        this.app= express();
        this.port= process.env.PORT;

        //database
        this.initDB();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();

    }

    async initDB() {
        await dbConnection();
    }
    
    middlewares(){
        //cors
        //this.app.use(cors());

        //JSON body - reading and parsing
        this.app.use(express.json());

        //public folder 
        this.app.use(express.static('public'));
    }
    
    routes(){

        //this.app.use('/api/toppings',require('../routes/topping.routes'));
        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("running in port", this.port);
        });
    }
}

module.exports = Server;
