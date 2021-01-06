/*jshint esversion: 6 */

const expect = require("chai").expect;
const dnsrecord = require("../dist/lib/interfaces/dnsrecord");

describe("dnsrecord.validate", () => {
    describe("Valid records", () => {
        it("should return true on valid A-record", () => {
            var validA = dnsrecord.validate({
                type: "A",
                ttl: 3600,
                data: '127.0.0.1',
                host: 'localhost',
            });
            expect(validA).to.true;
        });
        it("should return true on valid AAAA-record", () => {
            var validA = dnsrecord.validate({
                type: "AAAA",
                ttl: 3600,
                data: '::1',
                host: 'localhost',
            });
            expect(validA).to.true;
        });
        it("should return true on valid ANAME-record", () => {
            var validA = dnsrecord.validate({
                type: "ANAME",
                ttl: 3600,
                data: 'example.com',
                host: 'localhost',
            });
            expect(validA).to.true;
        });
        it("should return true on valid CAA-record", () => {
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
        it("should return true on valid DS-record", () => {
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
        it("should return true on valid MX-record", () => {
            var validA = dnsrecord.validate({
                type: "MX",
                ttl: 3600,
                priority: 10,
                data: 'mx.example.com',
                host: '@',
            });
            expect(validA).to.true;
        });
        it("should return true on valid NS-record", () => {
            var validNS = dnsrecord.validate({
                type: "NS",
                ttl: 3600,
                data: 'localhost',
                host: 'localhost',
            });
            expect(validNS).to.true;
        });
        it("should return true on valid SRV-record", () => {
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
        it("should return true on valid TLSA-record", () => {
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
        it("should return true on valid TXT-record", () => {
            var validA = dnsrecord.validate({
                type: "TXT",
                ttl: 3600,
                data: 'test',
                host: 'localhost',
            });
            expect(validA).to.true;
        });
        it("should return true on valid record with id present", () => {
            var validA = dnsrecord.validate({
                id: 1234,
                type: "TXT",
                ttl: 3600,
                data: 'test',
                host: 'localhost',
            });
            expect(validA).to.true;
        });
        it("should return true on valid record with ttl missing", () => {
            var validA = dnsrecord.validate({
                type: "TXT",
                data: 'test',
                host: 'localhost',
            });
            expect(validA).to.true;
        });
    });


    describe("Records with errors", () => {
        it("should throw error on missing type", () => {
            expect(() => {
                dnsrecord.validate({
                    ttl: 3600,
                    host: 'localhost',
                    data: '127.0.0.1'
                });
            }).to.throw("Record does not have any type");
        });

        it("should throw error on missing host", () => {
            expect(() => {
                dnsrecord.validate({
                    type: 'A',
                    ttl: 3600,
                    data: '127.0.0.1',
                });
            }).to.throw("Record missing required field");
        });

        it("should throw error on unknown type", () => {
            expect(() => {
                dnsrecord.validate({
                    type: 'GARBAGE',
                    ttl: 3600,
                    host: 'localhost',
                });
            }).to.throw("Record has an unknown type");
        });

        it("should throw error on missing data on A-record", () => {
            expect(() => {
                dnsrecord.validate({
                    type: "A",
                    ttl: 3600,
                    host: 'localhost',
                });
            }).to.throw("Record missing required field");
        });
        it("should throw error on missing host on AAAA-record", () => {
            expect(() => {
                dnsrecord.validate({
                    type: "AAAA",
                    ttl: 3600,
                    data: '::1',
                });
            }).to.throw("Record missing required field");
        });
        it("should throw error on missing host on ANAME-record", () => {
            expect(() => {
                dnsrecord.validate({
                    type: "ANAME",
                    ttl: 3600,
                    data: 'example.com',
                });
            }).to.throw("Record missing required field");
        });
        it("should throw error on missing flags on CAA-record", () => {
            expect(() => {
                dnsrecord.validate({
                    type: "CAA",
                    ttl: 3600,
                    tag: 0,
                    data: 'ca.example.com',
                    host: '@',
                });
            }).to.throw("Record missing required field");
        });
        it("should throw error on missing alg on DS-record", () => {
            expect(() => {
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
        it("should throw error on missing priority on MX-record", () => {
            expect(() => {
                dnsrecord.validate({
                    type: "MX",
                    ttl: 3600,
                    data: 'mx.example.com',
                    host: '@',
                });
            }).to.throw("Record missing required field");
        });
        it("should throw error on missing data on NS-record", () => {
            expect(() => {
                dnsrecord.validate({
                    type: "NS",
                    ttl: 3600,
                    host: 'localhost',
                });
            }).to.throw("Record missing required field");
        });
        it("should throw error on missing weight on SRV-record", () => {
            expect(() => {
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
        it("should throw error on missing dtype on TLSA-record", () => {
            expect(() => {
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

        it("should throw error on too many fields in object", () => {
            expect(() => {
                dnsrecord.validate({
                    type: "TLSA",
                    ttl: 3600,
                    usage: 0,
                    dtype: 1,
                    selector: 1,
                    data: 'ABCDEF0123456789',
                    host: '_443._tcp.www',
                    bogus: 'should not exist'
                });
            }).to.throw("Too many fields in object");
        });
    });
});