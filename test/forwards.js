/*jshint esversion: 6 */

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

const forwards = require("../dist/lib/forwards");

const testApi = {
    apiCall: function (method, endpoint) {
        return {
            data: method + ":" + endpoint
        };
    }
};


describe("Domeneshop.forwards", function () {
    describe("Import", function () {
        it("returns a function", function () {
            expect(forwards).to.be.a('function');
        });
    });
    describe("Class", function () {
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
    describe("Function tests", function () {
        var instance = new forwards(testApi);

        describe('getForwards', function () {
            it("runs correct apiCall with argument [1337]", function (done) {
                expect(instance.getForwards(1337)).to.eventually.equal("GET:/domains/1337/forwards").notify(done);
            });
        });

        describe('getForward', function () {
            it("runs correct apiCall with argument [1337,www]", function (done) {
                expect(instance.getForward(1337, 'www')).to.eventually.equal("GET:/domains/1337/forwards/www").notify(done);
            });
        });

        describe('createForward', function () {
            var obj = {
                host: "www",
                frame: false,
                url: "http://example.com/"
            };

            var instance = new forwards({
                apiCall: function (method, endpoint, record) {
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
                            location: "http://bogus.something/" + record.host
                        }
                    };
                }
            });

            it("runs correct apiCall with argument [1337, obj]", function (done) {
                expect(instance.createForward(1337, obj)).to.eventually.equal('www').notify(done);
            });
        });

        describe('modifyForward', function () {
            var obj = {
                host: "www",
                frame: false,
                url: "http://example.com/"
            };

            var instance = new forwards({
                apiCall: function (method, endpoint, record) {
                    if (method !== "PUT") {
                        throw new Error("Not post request");
                    }
                    if (endpoint !== "/domains/1337/forwards/www") {
                        throw new Error("Not correct endpoint");
                    }
                    if (JSON.stringify(record) !== JSON.stringify(obj)) {
                        throw new Error("Not the same object");
                    }
                }
            });

            it("runs correct apiCall with argument [1337, 1234, obj]", function (done) {
                expect(instance.modifyForward(1337, 'www', obj)).to.eventually.notify(done);
            });
        });

        describe('deleteForward', function () {
            var instance = new forwards({
                apiCall: function (method, endpoint) {
                    if (method !== "DELETE") {
                        throw new Error("Not post request");
                    }
                    if (endpoint !== "/domains/1337/forwards/1234") {
                        throw new Error("Not correct endpoint");
                    }
                    return;
                }
            });

            it("runs correct apiCall with argument [1337, 1234]", function (done) {
                expect(instance.deleteForward(1337, 1234)).to.eventually.notify(done);
            });
        });
    });
});