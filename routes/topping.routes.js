const {Router} = require('express');
const {toppingsGet, toppingsPost, toppingsPut, toppingsDelete} = require('../controllers/topping.controller');

const router = Router();

router.get('/', toppingsGet);

router.post('/', toppingsPost);

router.put('/:id', toppingsPut);

router.delete('/:id', toppingsDelete);


module.exports = router;