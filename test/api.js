const {
    expect,
    assert
} = require("chai");

describe("Domeneshop.api", function () {
    describe("Import", function () {
        it("returns a function", function () {
            var dns = require("../dist/lib/api");
            expect(dns).to.be.a('function');
        });
    });
    describe("Class", function () {
        var api = require("../dist/lib/api");
        var instance = new api('','');

        it("has an apiURL string", function () {
            expect(instance.apiURL).to.be.a('string');
        });

        it("has a token string", function () {
            expect(instance.token).to.be.a('string');
        });

        it("has a secret string", function () {
            expect(instance.secret).to.be.a('string');
        });


        for (const fun of ['apiCall']) {
            it("has a function called " + fun, function () {
                expect(instance[fun]).to.be.a('function');
            });
        }
    });
});