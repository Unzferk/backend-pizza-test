const  Pizza  = require('../models/pizza');

const  pizzaGet = async (req, res) => {
    const {id} = req.params;
    const pizzas= await Pizza.findOne({_id: id,state:true});  
    if(pizzas){
        res.status(200).json({pizzas: pizzas});
    }else{
        res.status(400).json({msg:"Cant find pizza"})
    }
}

const  pizzasGet = async (req, res) => {
    const pizzas= await Pizza.find({state:true});  
    if(pizzas){
        res.status(200).json({pizzas: pizzas});
    }else{
        res.status(400).json({msg:"Cant find pizzas"})
    }
}


const pizzaPost =async (req, res) => {

    const name = req.body.name.toUpperCase();
    const toppings = req.body.toppings;

    const pizzaDB = await Pizza.findOne({ name: name });

    if ( pizzaDB ) {
        return res.status(400).json({
            msg: `Pizza ${ pizzaDB.name }, already exist`
        });
    }
    
    const data = {
        name: name,
        toppings: toppings
    }
    const pizza = new Pizza( data );

    // save on DB
    await pizza.save();
    res.status(201).json(pizza);
}

const pizzaUpdate = async (req,res)=>{
    res.json({msg:"nothing"});
}

const pizzaDelete = async (req, res) => {

    const { id } = req.params;
    try{
        const pizzaDeleted = await Pizza.findByIdAndUpdate( id, { state: false });
        res.status(200).json( pizzaDeleted );
    }catch{
        res.status(400).json( {msg:"Cant delete that pizza"} );
    }
    
}

module.exports = {
    pizzaGet,
    pizzasGet,
    pizzaPost,
    pizzaUpdate,
    pizzaDelete
}