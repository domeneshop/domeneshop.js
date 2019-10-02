const {
    expect,
    assert
} = require("chai");

describe("Domeneshop.forwards", function () {
    describe("Import", function () {
        it("returns a function", function () {
            var forwards = require("../dist/lib/forwards");
            expect(forwards).to.be.a('function');
        });
    });
    describe("Class", function () {
        var forwards = require("../dist/lib/forwards");
        var instance = new forwards({});

        it("has an api object", function () {
            expect(instance.api).to.be.an('object');
        });

        for (const fun of ['getForwards', 'getForward', 'createForward', 'modifyForward', 'deleteForward']) {
            it("has a function called " + fun, function () {
                expect(instance[fun]).to.be.a('function');
            });
        }
    });
});