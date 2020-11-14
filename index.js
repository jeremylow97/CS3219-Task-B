
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');


const dotenv = require('dotenv');
dotenv.config();

// Import routes
let apiRoutes = require("./api-routes");

let app = express();
app.use(cors());


var port = process.env.PORT || 8080;

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
 }));
app.use(bodyParser.json());

console.log("connecting to" );

mongoose.connect(process.env.DB ? process.env.DB : 'mongodb://localhost/grocerylist', { useNewUrlParser: true,  useUnifiedTopology: true});
var db = mongoose.connection;


app.get('/', (req, res) => res.status("200").send('Hello World with Express'));

app.use('/api', apiRoutes);


app.listen(port, function () {
     console.log("Server now running on on port " + port);
});

app.use(function (err, req, res, next) {
     console.error(err.stack)
     res.status(500).send('Something broke!')
});

module.exports = app;
