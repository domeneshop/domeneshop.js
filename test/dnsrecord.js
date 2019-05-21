var expect = require("chai").expect;
var dnsrecord = require("../dist/lib/interfaces/dnsrecord");
describe("dnsrecord.validate", function () {
    describe("Valid records", function () {
        it("should return true on valid A-record", function () {
            var validA = dnsrecord.validate({
                type: "A",
                ttl: 3600,
                data: '127.0.0.1',
                host: 'localhost',
            });
            expect(validA).to.true;
        });
        it("should return true on valid AAAA-record", function () {
            var validA = dnsrecord.validate({
                type: "AAAA",
                ttl: 3600,
                data: '::1',
                host: 'localhost',
            });
            expect(validA).to.true;
        });
        it("should return true on valid ANAME-record", function () {
            var validA = dnsrecord.validate({
                type: "ANAME",
                ttl: 3600,
                data: 'example.com',
                host: 'localhost',
            });
            expect(validA).to.true;
        });
        it("should return true on valid CAA-record", function () {
            var validA = dnsrecord.validate({
                type: "CAA",
                ttl: 3600,
                flags: 0,
                tag: 0,
                data: 'ca.example.com',
                host: '@',
            });
            expect(validA).to.true;
        });
        it("should return true on valid DS-record", function () {
            var validA = dnsrecord.validate({
                type: "DS",
                ttl: 3600,
                tag: 1000,
                alg: 5,
                digest: 1,
                data: 'ABCDEF0123456789',
                host: '@',
            });
            expect(validA).to.true;
        });
        it("should return true on valid MX-record", function () {
            var validA = dnsrecord.validate({
                type: "MX",
                ttl: 3600,
                priority: 10,
                data: 'mx.example.com',
                host: '@',
            });
            expect(validA).to.true;
        });
        it("should return true on valid SRV-record", function () {
            var validA = dnsrecord.validate({
                type: "SRV",
                ttl: 3600,
                priority: 10,
                weight: 1,
                port: 80,
                data: 'http.example.com',
                host: '_http._tcp',
            });
            expect(validA).to.true;
        });
        it("should return true on valid TLSA-record", function () {
            var validA = dnsrecord.validate({
                type: "TLSA",
                ttl: 3600,
                usage: 0,
                selector: 1,
                dtype: 1,
                data: 'ABCDEF0123456789',
                host: '_443._tcp.www',
            });
            expect(validA).to.true;
        });
    });


    describe("Records with errors", function () {
        it("should throw error on missing type", function () {
            expect(function () {
                dnsrecord.validate({
                    ttl: 3600,
                    host: 'localhost',
                    data: '127.0.0.1'
                });
            }).to.throw("Record does not have any type");
        });

        it("should throw error on missing host", function () {
            expect(function () {
                dnsrecord.validate({
                    type: 'A',
                    ttl: 3600,
                    data: '127.0.0.1',
                });
            }).to.throw("Record missing required field");
        });

        it("should throw error on unknown type", function () {
            expect(function () {
                dnsrecord.validate({
                    type: 'GARBAGE',
                    ttl: 3600,
                    host: 'localhost',
                });
            }).to.throw("Record has an unknown type");
        });

        it("should throw error on missing data on A-record", function () {
            expect(function () {
                dnsrecord.validate({
                    type: "A",
                    ttl: 3600,
                    host: 'localhost',
                });
            }).to.throw("Record missing required field");
        });
        it("should throw error on missing host on AAAA-record", function () {
            expect(function () {
                dnsrecord.validate({
                    type: "AAAA",
                    ttl: 3600,
                    data: '::1',
                });
            }).to.throw("Record missing required field");
        });
        it("should throw error on missing host on ANAME-record", function () {
            expect(function () {
                dnsrecord.validate({
                    type: "ANAME",
                    ttl: 3600,
                    data: 'example.com',
                });
            }).to.throw("Record missing required field");
        });
        it("should throw error on missing flags on CAA-record", function () {
            expect(function () {
                dnsrecord.validate({
                    type: "CAA",
                    ttl: 3600,
                    tag: 0,
                    data: 'ca.example.com',
                    host: '@',
                });
            }).to.throw("Record missing required field");
        });
        it("should throw error on missing alg on DS-record", function () {
            expect(function () {
                dnsrecord.validate({
                    type: "DS",
                    ttl: 3600,
                    tag: 1000,
                    digest: 1,
                    data: 'ABCDEF0123456789',
                    host: '@',
                });
            }).to.throw("Record missing required field");
        });
        it("should throw error on missing priority on MX-record", function () {
            expect(function () {
                dnsrecord.validate({
                    type: "MX",
                    ttl: 3600,
                    data: 'mx.example.com',
                    host: '@',
                });
            }).to.throw("Record missing required field");
        });
        it("should throw error on missing weight on SRV-record", function () {
            expect(function () {
                dnsrecord.validate({
                    type: "SRV",
                    ttl: 3600,
                    priority: 10,
                    port: 80,
                    data: 'http.example.com',
                    host: '_http._tcp',
                });
            }).to.throw("Record missing required field");
        });
        it("should throw error on missing dtype on TLSA-record", function () {
            expect(function () {
                dnsrecord.validate({
                    type: "TLSA",
                    ttl: 3600,
                    usage: 0,
                    selector: 1,
                    data: 'ABCDEF0123456789',
                    host: '_443._tcp.www',
                });
            }).to.throw("Record missing required field");
        });
    });
});