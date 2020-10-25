// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require("chai-http");
const app = require('../index');


// Configure chai
chai.use(chaiHttp);
chai.should();

describe("API calls", () => {
    describe("GET API call to /api", () => {
        // Test to GET request to get all grocery items
        it("should return status 200 and grocery items in the form of an array", (done) => {
             chai.request(app)
                 .get('/api')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.have.property('data').and.to.be.a('array');
                     done();
                  });
        });
    });

    describe("POST API call to /api", () => {
        // Test to POST request which creates a new grocery item
        it("should return status 200 and successful new grocery item created response", (done) => {
             chai.request(app)
                 .post('/api')
                 .send({
                     name : "Apple",
                     price : 3,
                     quantity: 2
                 })
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.have.property('message').and.to.be.equal('New grocery item created!');
                     done();
                  });
        });
    });

    describe("PUT API call to /api/:item_id", () => {
        // Test to PUT request which updates grocery item Apple to Banana after a POST request
        it("should return status 200 and returns a response with the new updated grocery item details", (done) => {
            chai.request(app)
                .post('/api')
                .send({
                    name : "Apple",
                    price : 3,
                    quantity: 2
                })
                .end((err, res) => {
                    chai.request(app)
                        .put('/api/' + res.body.data._id)
                        .send({
                            name : "Banana",
                            price : 3,
                            quantity: 2
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.property('message').and.to.be.equal('Grocery Info updated');
                            res.body.should.have.nested.property('data.name').and.to.be.equal('Banana');
                            res.body.should.have.nested.property('data.price').and.to.be.equal(3);
                            res.body.should.have.nested.property('data.quantity').and.to.be.equal(2);
                            done();
                         });
                 });
       });
    });

    describe("DELETE API call to /api/:item_id", () => {
        // Test to DELETE request which deletes grocery item Apple afer a POST request to create it 
        it("should return status 200 and successful new grocery item delete response", (done) => {
            chai.request(app)
                .post('/api')
                .send({
                    name : "Apple",
                    price : 3,
                    quantity: 2
                })
                .end((err, res) => {
                    chai.request(app)
                        .delete('/api/' + res.body.data._id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.property('message').and.to.be.equal('Grocery Item has been deleted');
                            done();
                         });
                 });
       });
    });


});