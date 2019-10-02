/*jshint esversion: 6 */

const expect = require("chai").expect;
const api = require("../dist/lib/api");

describe("Domeneshop.api", function () {
    describe("Import", function () {
        it("returns a function", function () {
            expect(api).to.be.a('function');
        });
    });
    describe("Class", function () {
        var instance = new api('', '');

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