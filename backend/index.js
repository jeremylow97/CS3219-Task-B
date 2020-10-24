let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// Import routes
let apiRoutes = require("./api-routes");

let app = express();

var port = process.env.PORT || 8080;

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use(bodyParser.json());

// Use Api routes in the App
app.use('/api', apiRoutes);



mongoose.connect('mongodb://localhost/grocerylist', { useNewUrlParser: true,  useUnifiedTopology: true});
var db = mongoose.connection;


app.get('/', (req, res) => res.send('Hello World with Express'));

app.listen(port, function () {
     console.log("Server now running on on port " + port);
});

app.use(function (err, req, res, next) {
     console.error(err.stack)
     res.status(500).send('Something broke!')
});