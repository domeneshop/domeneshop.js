/*jshint esversion: 6 */

const expect = require("chai").expect;
const domeneshop = require("../dist/domeneshop");

describe("Domeneshop", function () {
    describe("Import", function () {
        it("returns a function", function () {
            expect(domeneshop).to.be.a('function');
        });
    });
    describe("Class", function () {
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