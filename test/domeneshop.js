const {
    expect,
    assert
} = require("chai");

describe("Domeneshop", function () {
    describe("Import", function () {
        it("returns a function", function () {
            var domeneshop = require("../dist/domeneshop");
            expect(domeneshop).to.be.a('function');
        });
    });
    describe("Class", function () {
        var domeneshop = require("../dist/domeneshop");
        var instance = new domeneshop();

        for (const obj of ['api', 'dns', 'forwards', 'invoices']) {
            it("has an object called " + obj, function () {
                expect(instance[obj]).to.be.an('object');
            });
        }

        for (const fun of ['getDomains', 'getDomain']) {
            it("has a function called " + fun, function () {
                expect(instance[fun]).to.be.a('function');
            });
        }
    });
});