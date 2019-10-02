const {
    expect,
    assert
} = require("chai");

describe("Domeneshop.invoices", function () {
    describe("Import", function () {
        it("returns a function", function () {
            var invoices = require("../dist/lib/invoices");
            expect(invoices).to.be.a('function');
        });
    });
    describe("Class", function () {
        var invoices = require("../dist/lib/invoices");
        var instance = new invoices({});

        it("has an api object", function () {
            expect(instance.api).to.be.an('object');
        });

        for (const fun of ['getInvoices', 'getInvoice']) {
            it("has a function called " + fun, function () {
                expect(instance[fun]).to.be.a('function');
            });
        }
    });
});