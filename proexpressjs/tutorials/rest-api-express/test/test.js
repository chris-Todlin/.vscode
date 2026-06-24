/* This is a test driven arcitecture of building the RESTFUL API */

const superagent = require("superagent");
const chai = require("chai");
const expect = require("expect.js");
const mocha = require("mocha");

/* Creation case here */
describe("Express rest api server", function(){
    let id;

    // post an object
    it("post an object",function(done){
        superagent.post("http://localhost:3000/collections/test")
                .send({
                    name: "John",
                    email: "john@rpjs.co"
                })
                .end(function(e,res){
                    // log out the bod 
                    expect(e).to.eql(null); // no errors
                    expect(res.body.length).to.eql(1);
                    expect(res.body[0]._id.length).to.eql(24);
                    id = res.body[0]._id;
                    done();
                });
    });

    // it should retrieve an object
    it("retrieve an object",function(done){
        superagent.get("http://localhost:3000/collections/test" + id)
                .end(function(e,res){
                    expect(e).to.eql(null); // no errors
                    expect(typeof res.body).to.eql('object');
                    expect(res.body._id.length).to.eql(24);
                    expect(res.body._id).to.eql(id);
                    done(); // finished
                });
    });

    // It should retrieve the collection - all of it 
    it("retrieve a collection", function(done){
        superagent.get("http://localhost:3000/collections/test")
                .end(function(e,res){
                    expect(e).to.eql(null); // no errors
                    expect(res.body.length).to.be.above(0); // not zero
                    expect(res.body.map(item => item._id)).to.contain(id);
                    done(); // finished
                });
    });

    // it should update an object
    it("should update an object", function(done){
        superagent.put("http://localhost:3000/collections/test" + id)
                .send({name: "Peter", email: "peter@yahoo.com"})
                .end(function(e,res){
                    expect(e).to.eql(null); // no errors
                    expect(typeof res.body).to.eql('object');
                    expect(res.body._id.length).to.eql(24);
                    expect(res.body.msg).to.eql('sucess');
                    done(); // finished
                });
    });
});