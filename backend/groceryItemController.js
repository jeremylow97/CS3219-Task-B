
GroceryItem = require('./groceryItemModel');

// Handle index actions
exports.index = function (req, res) {
    GroceryItem.get(function (err, groceryItems) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Here are the grocery items",
            data: groceryItems
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    let groceryItem = new GroceryItem();
    groceryItem.name = req.body.name;
    groceryItem.quantity = req.body.quantity;
    groceryItem.price = req.body.price;

    // save the grocery item into database and check for errors
    groceryItem.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New grocery item created!',
            data: groceryItem
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    GroceryItem.findById(req.params.item_id, function (err, groceryItem) {
        if (err)
            res.send(err);
        res.json({
            message: 'Grocery items loading..',
            data: groceryItem
        });
    });
};

// Handle update contact info
exports.update = function (req, res) {
    GroceryItem.findById(req.params.item_id, function (err, groceryItem) {
        if (err)
            res.send(err);
        groceryItem.name = req.body.name ? req.body.name : groceryItem.name;
        groceryItem.quantity = req.body.quantity;
        groceryItem.price = req.body.price;
        // save the contact and check for errors
        groceryItem.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Grocery Info updated',
                data: groceryItem
            });
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
        GroceryItem.deleteOne({
            _id: req.params.item_id
        }, function (err, groceryItem) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: "Grocery Item has been deleted"
            });
        });

    
};