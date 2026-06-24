/* This is to do the tests for the temprature functionality */

// Import the mocha and the chain fisrt
const mocha = require("mocha");
const chai = require("chai");
const { convertTemprature } = require("../lib/temprature_revised_edition");

// test for the folllowint 
// cel -> kel
// cel -> fah

/* Thefunctionality */
/* mocha.describe("From celcius to kelvin then fah",function(){
    it("should return 273",function(){
        chai.expect(convertTemprature()).to.equal((273));
    });

    it("should return 32",function(){
        chai.expect(convertTemprature("celcius",0,"fah")).to.equal((32));
    });
}); */

// kel - cel
// kel -> fah

/* Thefunctionality */
/* mocha.describe("From kelvin to celcius then fah",function(){
    it("should return -273",function(){
        chai.expect(convertTemprature("kelvin",0,"celcius")).to.equal((-273));
    });

    it("should return 32",function(){
        chai.expect(convertTemprature("celcius",convertTemprature("kelvin",273,"celcius"),"fah")).to.equal((32));
    });
}); */

// fah -> cel
// fah -> kel

/* Thefunctionality */
/* mocha.describe("From fah to celcius then kel",function(){
    it("should return 0",function(){
        chai.expect(convertTemprature("fah",32,"celcius")).to.equal((0));
    });

    it("should return 273",function(){
        chai.expect(convertTemprature("celcius",convertTemprature("fah",32,"celcius"),"kelvin")).to.equal((273));
    });
}); */