

var mongoose = require('mongoose');
 

var groceryItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var GroceryItem = module.exports = mongoose.model('GroceryItem', groceryItemSchema);

module.exports.get = function (callback, limit) {
    GroceryItem.find(callback).limit(limit);
}