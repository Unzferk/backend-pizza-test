const {Router} = require('express');
const { check } = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields');

const { pizzasGet, pizzaPost, pizzaUpdate, pizzaDelete, pizzaGet, pizzaGetToppings, pizzaPutToppings, pizzaDeleteToppings } = require('../controllers/pizza.controller');
const { pizzaExist, toppingExist } = require('../middlewares/db-validator');

const router = Router();

//PIZZA ROUTES

router.get('/', pizzasGet);

router.get('/:id',
[
    check('id', 'Isn`t a MongoID').isMongoId(),
    check('id').custom( pizzaExist ),
    validateFields
], pizzaGet);

router.get('/toppings/:id',
[
    check('id', 'Isn`t a MongoID').isMongoId(),
    check('id').custom( pizzaExist ),
    validateFields
], pizzaGetToppings);

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

router.put('/toppings/:id/:idtopping',[
    check('id', 'Isnt a MongoID').isMongoId(),
    check('idtopping', 'Isnt a MongoID').isMongoId(),
    check('id').custom( pizzaExist ),
    check('idtopping').custom( toppingExist ),
    validateFields
],pizzaPutToppings);

router.delete('/:id',
[
    check('id', 'Isn`t a MongoID').isMongoId(),
    check('id').custom( pizzaExist ),
    validateFields,

], pizzaDelete);

router.delete('/toppings/:id/:idtopping',[
    check('id', 'Isnt a MongoID').isMongoId(),
    check('idtopping', 'Isnt a MongoID').isMongoId(),
    check('id').custom( pizzaExist ),
    check('idtopping').custom( toppingExist ),
    validateFields
],pizzaDeleteToppings);

module.exports = router;