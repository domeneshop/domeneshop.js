/*jshint esversion: 6 */

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var expect = chai.expect;

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

        it("has an api object", function () {
            expect(instance.api).to.be.an('object');
        });

        for (const fun of ['getRecords', 'getRecord', 'createRecord', 'modifyRecord']) {
            it("has a function called " + fun, function () {
                expect(instance[fun]).to.be.a('function');
            });
        }
    });
    describe("Function tests", function () {
        var dns = require("../dist/lib/dns");
        var instance = new dns({
            apiCall: function (method, endpoint) {
                return {
                    data: method + ":" + endpoint
                };
            }
        });

        describe('getRecords', function () {
            it("runs correct apiCall with argument [1337]", function (done) {
                expect(instance.getRecords(1337)).to.eventually.equal("GET:/domains/1337/dns").notify(done);
            });
        });

        describe('getRecord', function () {
            it("runs correct apiCall with argument [1337, 1234]", function (done) {
                expect(instance.getRecord(1337, 1234)).to.eventually.equal("GET:/domains/1337/dns/1234").notify(done);
            });
        });

        describe('createRecord', function () {
            var obj = {
                type: "AAAA",
                ttl: 3600,
                data: '::1',
                host: 'localhost',
            };

            var instance = new dns({
                apiCall: function (method, endpoint, record) {
                    if (method !== "POST") {
                        throw new Error("Not post request");
                    }
                    if (endpoint !== "/domains/1337/dns") {
                        throw new Error("Not correct endpoint");
                    }
                    var len = JSON.stringify(record);
                    return {
                        headers: {
                            location: "http://bogus.something/" + len.length
                        }
                    };
                }
            });

            it("runs correct apiCall with argument [1337, obj]", function (done) {
                expect(instance.createRecord(1337, obj)).to.eventually.equal(JSON.stringify(obj).length).notify(done);
            });
        });

        describe('modifyRecord', function () {
            var obj = {
                type: "AAAA",
                ttl: 3600,
                data: '::1',
                host: 'localhost',
            };

            var instance = new dns({
                apiCall: function (method, endpoint, record) {
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
                }
            });

            it("runs correct apiCall with argument [1337, 1234, obj]", function (done) {
                expect(instance.modifyRecord(1337, 1234, obj)).to.eventually.notify(done);
            });
        });

        describe('deleteRecord', function () {
            var instance = new dns({
                apiCall: function (method, endpoint) {
                    if (method !== "DELETE") {
                        throw new Error("Not post request");
                    }
                    if (endpoint !== "/domains/1337/dns/1234") {
                        throw new Error("Not correct endpoint");
                    }
                    return;
                }
            });

            it("runs correct apiCall with argument [1337, 1234]", function (done) {
                expect(instance.deleteRecord(1337, 1234)).to.eventually.notify(done);
            });
        });

    });
});