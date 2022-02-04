const e = require('express');
const  Pizza  = require('../models/pizza');
const Topping = require('../models/topping');

const  pizzaGet = async (req, res) => {
    const {id} = req.params;
    const pizzas= await Pizza.findOne({_id: id,state:true})
    .populate('toppings');  
    if(pizzas){
        res.status(200).json({pizzas: pizzas});
    }else{
        res.status(400).json({msg:"Cant find pizza"})
    }
}

const  pizzasGet = async (req, res) => {
    const pizzas= await Pizza.find({state:true})
    .populate('toppings');  
    if(pizzas){
        res.status(200).json({pizzas: pizzas});
    }else{
        res.status(400).json({msg:"Cant find pizzas"})
    }
}

const pizzaGetToppings = async(req,res) =>{
    const {id} = req.params;
    const toppings= await Pizza.findOne({_id: id,state:true})
    .populate('toppings');  
    if(toppings){ 
        res.status(200).json({toppings: toppings.toppings});
    }else{
        res.status(400).json({msg:"Cant find toppings"})
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

const pizzaPutToppings = async (req,res)=>{
    const {id,idtopping} = req.params;
    const updateToppings = await Pizza.findByIdAndUpdate(id,
        {
            $push: {toppings : idtopping}
        },{new: true, useFindAndModify:false},
    );
    res.json(updateToppings);
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

const pizzaDeleteToppings = async (req,res)=>{
    const {id,idtopping} = req.params;
    const updateToppings = await Pizza.findByIdAndUpdate(id,
        {
            $pull: {toppings : idtopping}
        },{new: true, useFindAndModify:false},
    );
    res.json(updateToppings);
}

module.exports = {
    pizzaGet,
    pizzaGetToppings,
    pizzasGet,
    pizzaPost,
    pizzaPutToppings,
    pizzaUpdate,
    pizzaDelete,
    pizzaDeleteToppings
}