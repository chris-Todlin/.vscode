/* This is to do the tests for the temprature functionality */

// Import the mocha and the chain fisrt
const mocha = require("mocha");
const chai = require("chai");

// import the functions in the temprature - lib js
const {convertCel, convertCelToFah, convertFahToCel, controlPath, convertCelToK, convertFah, convertK, convertKToCel} = require("../lib/temprature");

// now writing the test for the functionality

// test one ont he cel to Fah
/* mocha.describe("convert cel to Fah",function(){
    it("print the conveerted value of the fah",function(){
        chai.expect(convertCelToFah(0)).to.equal(32);
        chai.expect(convertCelToFah(5)).to.equal(41);
    });
});

// conversion of fah to cel
mocha.describe("convert fah to cel",function(){
    it("print the conveerted value of cel",function(){
        chai.expect(convertFahToCel(41)).to.equal(5);
        chai.expect(convertFahToCel(32)).to.equal(0);
    });
});

// function to test the conversion of k To cel
mocha.describe("convert k to cel",function(){
    it("print the value of cel from k",function(){
        chai.expect(convertKToCel(0)).to.equal(-273);
        chai.expect(convertKToCel(273)).to.equal(0);
    });
});

// cnvert in the cel to K
mocha.describe("convert cel to k",function(){
    it("print the value of k from cel",function(){
        chai.expect(convertCelToK(0)).to.equal(273);
        chai.expect(convertCelToK(-273)).to.equal(0);
    });
});

// conversion by the notorious convvertCel to any of the followint
mocha.describe("convert cel to either k or cel",function(){
    it("print the value of cel from k",function(){
        chai.expect(convertCel(0, "kelvin")).to.equal(273);
        chai.expect(convertCel(-273,"kelvin")).to.equal(0);
    });

    // now for cel to fah 
    it("Print the correct value of the Fah",function(){
        chai.expect(convertCel(0,"fahreinheit")).to.equal(32, "Did it weell");
        chai.expect(convertCel(5,"fahreinheit")).to.equal(41, "Did it weell");
    });
});

// conversion by the notorious convvertKel to any of the followint
mocha.describe("convert k to either Fah or cel",function(){
    it("print the value of K from cel",function(){
        chai.expect(convertK(0, "celcius")).to.equal(-273);
        chai.expect(convertK(273,"celcius")).to.equal(0);
    });

    // now for cel to fah 
    it("Print the correct value of the Fah",function(){
        chai.expect(convertk(0,"fahreinheit")).to.equal(32, "Did it weell");
        chai.expect(convertK(5,"fahreinheit")).to.equal(41, "Did it weell");
    });
}); */