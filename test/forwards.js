/*jshint esversion: 6 */

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

const forwards = require("../dist/lib/forwards");

const testApi = {
  apiCall: (method, endpoint) => {
    return {
      data: method + ":" + endpoint,
    };
  },
};

describe("Domeneshop.forwards", () => {
  describe("Import", () => {
    it("returns a function", () => {
      expect(forwards).to.be.a("function");
    });
  });
  describe("Class", () => {
    var instance = new forwards({});

    it("has an api object", () => {
      expect(instance.api).to.be.an("object");
    });

    for (const fun of [
      "getForwards",
      "getForward",
      "createForward",
      "modifyForward",
      "deleteForward",
    ]) {
      it("has a function called " + fun, () => {
        expect(instance[fun]).to.be.a("function");
      });
    }
  });
  describe("Function tests", () => {
    var instance = new forwards(testApi);

    describe("getForwards", () => {
      it("runs correct apiCall with argument [1337]", (done) => {
        expect(instance.getForwards(1337))
          .to.eventually.equal("GET:/domains/1337/forwards")
          .notify(done);
      });
    });

    describe("getForward", () => {
      it("runs correct apiCall with argument [1337,www]", (done) => {
        expect(instance.getForward(1337, "www"))
          .to.eventually.equal("GET:/domains/1337/forwards/www")
          .notify(done);
      });
    });

    describe("createForward", () => {
      var obj = {
        host: "www",
        frame: false,
        url: "http://example.com/",
      };

      var instance = new forwards({
        apiCall: (method, endpoint, record) => {
          if (method !== "POST") {
            throw new Error("Not post request");
          }
          if (endpoint !== "/domains/1337/forwards") {
            throw new Error("Not correct endpoint");
          }
          if (JSON.stringify(record) !== JSON.stringify(obj)) {
            throw new Error("Not the same object");
          }
          return {
            headers: {
              location: "http://bogus.something/" + record.host,
            },
          };
        },
      });

      var apiErrorInstance = new forwards({
        apiCall: (method, endpoint, record) => {
          if (method !== "POST") {
            throw new Error("Not post request");
          }
          if (endpoint !== "/domains/1337/forwards") {
            throw new Error("Not correct endpoint");
          }
          if (JSON.stringify(record) !== JSON.stringify(obj)) {
            throw new Error("Not the same object");
          }
          return {
            headers: {},
          };
        },
      });

      it("runs correct apiCall with argument [1337, obj]", (done) => {
        expect(instance.createForward(1337, obj))
          .to.eventually.equal("www")
          .notify(done);
      });

      it("should throw error if api does not return location-header on create", async () => {
        await expect(
          apiErrorInstance.createForward(1337, obj)
        ).to.be.rejectedWith("This is not happening!!!!");
      });
    });

    describe("modifyForward", () => {
      var obj = {
        host: "www",
        frame: false,
        url: "http://example.com/",
      };

      var instance = new forwards({
        apiCall: (method, endpoint, record) => {
          if (method !== "PUT") {
            throw new Error("Not post request");
          }
          if (endpoint !== "/domains/1337/forwards/www") {
            throw new Error("Not correct endpoint");
          }
          if (JSON.stringify(record) !== JSON.stringify(obj)) {
            throw new Error("Not the same object");
          }
        },
      });

      it("runs correct apiCall with argument [1337, 1234, obj]", (done) => {
        expect(instance.modifyForward(1337, "www", obj)).to.eventually.notify(
          done
        );
      });
    });

    describe("deleteForward", () => {
      var instance = new forwards({
        apiCall: (method, endpoint) => {
          if (method !== "DELETE") {
            throw new Error("Not post request");
          }
          if (endpoint !== "/domains/1337/forwards/1234") {
            throw new Error("Not correct endpoint");
          }
          return;
        },
      });

      it("runs correct apiCall with argument [1337, 1234]", (done) => {
        expect(instance.deleteForward(1337, 1234)).to.eventually.notify(done);
      });
    });
  });
});
