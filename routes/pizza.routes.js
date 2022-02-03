const {Router} = require('express');
const { check } = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields');

const { pizzasGet, pizzaPost, pizzaUpdate, pizzaDelete, pizzaGet } = require('../controllers/pizza.controller');
const { pizzaExist } = require('../middlewares/db-validator');

const router = Router();

//PIZZA ROUTES

router.get('/', pizzasGet);

router.get('/:id',
[
    check('id', 'Isn`t a MongoID').isMongoId(),
    check('id').custom( pizzaExist ),
    validateFields
], pizzaGet);

router.post('/',
[
    check('name','Name is Mandatory').not().isEmpty(),
    validateFields

], pizzaPost);

router.put('/:id',[
    check('name','Name is Mandatory').not().isEmpty(),
    check('id', 'Isnt a MongoID').isMongoId(),
    check('id').custom( pizzaExist ),
    validateFields
],pizzaUpdate );

router.delete('/:id',
[
    check('id', 'Isn`t a MongoID').isMongoId(),
    check('id').custom( pizzaExist ),
    validateFields,

], pizzaDelete);


module.exports = router;