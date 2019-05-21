const {
    expect,
    assert
} = require("chai");

describe("Domeneshop.dns", function () {
    describe("Import", function () {
        it("returns a function", function () {
            var dns = require("../dist/lib/dns");
            expect(dns).to.be.a('function');
        });
    });
    describe("Class", function () {
        var dns = require("../dist/lib/dns");
        var instance = new dns({});

        it("has a api object", function () {
            expect(instance.api).to.be.a('object');
        });

        for (const fun of ['getRecords', 'getRecord', 'createRecord', 'modifyRecord']) {
            it("has a function called " + fun, function () {
                expect(instance[fun]).to.be.a('function');
            });
        }
    });
});