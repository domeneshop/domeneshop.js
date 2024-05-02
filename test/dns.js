/*jshint esversion: 6 */

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

describe("Domeneshop.dns", () => {
  describe("Import", () => {
    it("returns a function", () => {
      var dns = require("../dist/lib/dns");
      expect(dns).to.be.a("function");
    });
  });
  describe("Class", () => {
    var dns = require("../dist/lib/dns");
    var instance = new dns({});

    it("has an api object", () => {
      expect(instance.api).to.be.an("object");
    });

    for (const fun of [
      "getRecords",
      "getRecord",
      "createRecord",
      "modifyRecord",
    ]) {
      it("has a function called " + fun, () => {
        expect(instance[fun]).to.be.a("function");
      });
    }
  });
  describe("Function tests", () => {
    var dns = require("../dist/lib/dns");
    var instance = new dns({
      apiCall: (method, endpoint) => {
        return {
          data: method + ":" + endpoint,
        };
      },
    });

    describe("getRecords", () => {
      it("runs correct apiCall with argument [1337]", (done) => {
        expect(instance.getRecords(1337))
          .to.eventually.equal("GET:/domains/1337/dns")
          .notify(done);
      });
    });

    describe("getRecord", () => {
      it("runs correct apiCall with argument [1337, 1234]", (done) => {
        expect(instance.getRecord(1337, 1234))
          .to.eventually.equal("GET:/domains/1337/dns/1234")
          .notify(done);
      });
    });

    describe("createRecord", () => {
      var obj = {
        type: "AAAA",
        ttl: 3600,
        data: "::1",
        host: "localhost",
      };

      var instance = new dns({
        apiCall: (method, endpoint, record) => {
          if (method !== "POST") {
            throw new Error("Not post request");
          }
          if (endpoint !== "/domains/1337/dns") {
            throw new Error("Not correct endpoint");
          }
          var len = JSON.stringify(record);
          return {
            headers: {
              location: "http://bogus.something/" + len.length,
            },
          };
        },
      });

      var apiErrorInstance = new dns({
        apiCall: (method, endpoint, record) => {
          if (method !== "POST") {
            throw new Error("Not post request");
          }
          if (endpoint !== "/domains/1337/dns") {
            throw new Error("Not correct endpoint");
          }
          var len = JSON.stringify(record);
          return {
            headers: {},
          };
        },
      });

      it("runs correct apiCall with argument [1337, obj]", (done) => {
        expect(instance.createRecord(1337, obj))
          .to.eventually.equal(JSON.stringify(obj).length)
          .notify(done);
      });

      it("should throw error if api does not return location-header on create", async () => {
        await expect(
          apiErrorInstance.createRecord(1337, obj)
        ).to.be.rejectedWith("This is not happening!!!!");
      });
    });

    describe("modifyRecord", () => {
      var obj = {
        type: "AAAA",
        ttl: 3600,
        data: "::1",
        host: "localhost",
      };

      var instance = new dns({
        apiCall: (method, endpoint, record) => {
          if (method !== "PUT") {
            throw new Error("Not post request");
          }
          if (endpoint !== "/domains/1337/dns/1234") {
            throw new Error("Not correct endpoint");
          }
          if (JSON.stringify(record) !== JSON.stringify(obj)) {
            throw new Error("Not the same object");
          }
          return;
        },
      });

      it("runs correct apiCall with argument [1337, 1234, obj]", (done) => {
        expect(instance.modifyRecord(1337, 1234, obj)).to.eventually.notify(
          done
        );
      });
    });

    describe("deleteRecord", () => {
      var instance = new dns({
        apiCall: (method, endpoint) => {
          if (method !== "DELETE") {
            throw new Error("Not post request");
          }
          if (endpoint !== "/domains/1337/dns/1234") {
            throw new Error("Not correct endpoint");
          }
          return;
        },
      });

      it("runs correct apiCall with argument [1337, 1234]", (done) => {
        expect(instance.deleteRecord(1337, 1234)).to.eventually.notify(done);
      });
    });
  });
});
