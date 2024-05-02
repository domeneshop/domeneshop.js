/*jshint esversion: 6 */

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

const testApi = {
  apiCall: (method, endpoint) => {
    return {
      data: method + ":" + endpoint,
    };
  },
};

describe("Domeneshop.invoices", () => {
  describe("Import", () => {
    it("returns a function", () => {
      var invoices = require("../dist/lib/invoices");
      expect(invoices).to.be.a("function");
    });
  });
  describe("Class", () => {
    var invoices = require("../dist/lib/invoices");
    var instance = new invoices({});

    it("has an api object", () => {
      expect(instance.api).to.be.an("object");
    });

    for (const fun of ["getInvoices", "getInvoice"]) {
      it("has a function called " + fun, () => {
        expect(instance[fun]).to.be.a("function");
      });
    }
  });

  describe("Function tests", () => {
    var invoices = require("../dist/lib/invoices");
    var instance = new invoices(testApi);

    var functionsToRun = [
      {
        name: "getInvoices",
        expectedResult: "GET:/invoices",
      },
      {
        name: "getInvoices",
        args: "unpaid",
        expectedResult: "GET:/invoices?status=unpaid",
      },
      {
        name: "getInvoice",
        args: "01010101",
        expectedResult: "GET:/invoices/01010101",
      },
    ];

    for (const fun of functionsToRun) {
      describe(fun.name, () => {
        it("runs correct apiCall with argument [" + fun.args + "]", (done) => {
          expect(instance[fun.name](fun.args))
            .to.eventually.equal(fun.expectedResult)
            .notify(done);
        });
      });
    }
  });
});
