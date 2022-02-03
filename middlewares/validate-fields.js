const { validationResult } = require('express-validator');

const validateFields = ( req, res, next ) => {
    //looking for errors in any field comming
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }
    next();
}

module.exports = {
    validateFields
}
