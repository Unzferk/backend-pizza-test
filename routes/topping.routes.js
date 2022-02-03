const {Router} = require('express');
const { check } = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields');

const {toppingsGet, toppingsPost, toppingsDelete, toppingsUpdate} = require('../controllers/topping.controller');
const { toppingExist } = require('../middlewares/db-validator');

const router = Router();

router.get('/', toppingsGet);

router.post('/',
[
    check('name','Name is Mandatory').not().isEmpty(),
    validateFields
    
], toppingsPost);

router.put('/:id',[
    check('name','Name is Mandatory').not().isEmpty(),
    check('id').custom( toppingExist ),
    validateFields
],toppingsUpdate );

router.delete('/:id',
[
    check('id', 'Isn`t a MongoID').isMongoId(),
    check('id').custom( toppingExist ),
    validateFields,

], toppingsDelete);


module.exports = router;