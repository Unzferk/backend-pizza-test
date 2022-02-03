

const  toppingsGet = (req, res) => {
    res.json({
        msg: "API GET - controller"
    })
}

const toppingsPost =(req, res) => {

    const body = req.body;

    res.json({
        msg: "API POST",
        body
    });
}

const toppingsPut = (req, res) => {

    const id = req.params.id;
    
    res.json({
        msg: "API PUT",
        id
    })
}

const toppingsDelete = (req, res) => {

    const id = req.params.id;

    res.json({
        msg: "API DELETE",
        id
    })
}

module.exports = {
    toppingsGet,
    toppingsPost,
    toppingsPut,
    toppingsDelete
}