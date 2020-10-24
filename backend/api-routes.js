

let express = require('express');
let router = express.Router();


var groceryItemController = require('./groceryItemController');
// Grocery Item routes
router.route('/')
    .get(groceryItemController.index)
    .post(groceryItemController.new);

router.route('/:item_id')
    .get(groceryItemController.view)
    .put(groceryItemController.update)
    .delete(groceryItemController.delete);


module.exports = router;