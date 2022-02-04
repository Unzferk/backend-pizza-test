const  Topping  = require('../models/topping');

const  toppingsGet = async (req, res) => {

    const toppings= await Topping.find({state:true});
    
    if(toppings){
        res.status(200).json({data: toppings});
    }else{
        res.status(400).json({data:"Cant find toppings"})
    }
}

const toppingsPost =async (req, res) => {

    const name = req.body.name.toUpperCase();

    const toppingDB = await Topping.findOne({ name: name });

    //exist?
    if ( toppingDB ) {
        return res.status(400).json({
            msg: `Topping ${ toppingDB.name }, already exist`
        });
    }

    // data
    const data = {
        name: name
    }

    const topping = new Topping( data );

    // save DB
    await topping.save();
    res.status(201).json(topping);
}

const toppingsUpdate = async (req,res)=>{
    const { id } = req.params;
    const { state, ...data } = req.body;

    data.name  = data.name.toUpperCase();

    const topping = await Topping.findByIdAndUpdate(id, data, { new: true });

    res.json( topping );
}

const toppingsDelete = async (req, res) => {

    const { id } = req.params;
    try{
        const toppingDeleted = await Topping.findByIdAndUpdate( id, { state: false });
        res.status(200).json( toppingDeleted );
    }catch{
        res.status(400).json( {msg:"Cant delete that topping"} );
    }
    
}

module.exports = {
    toppingsGet,
    toppingsPost,
    toppingsUpdate,
    toppingsDelete
}