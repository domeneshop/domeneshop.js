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

        it("has a dns object", function () {
            expect(instance.dns).to.be.a('object');
        });

        it("has a api object", function () {
            expect(instance.api).to.be.a('object');
        });

        for (const fun of ['getDomains', 'getDomain']) {
            it("has a function called " + fun, function () {
                expect(instance[fun]).to.be.a('function');
            });
        }
    });
});