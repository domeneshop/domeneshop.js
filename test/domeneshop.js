/*jshint esversion: 6 */

const expect = require("chai").expect;
const domeneshop = require("../dist/domeneshop");
const moxios = require("moxios");
const assert = require('assert');

describe("Domeneshop", () => {
    describe("Import", () => {
        it("returns a function", () => {
            expect(domeneshop).to.be.a('function');
        });
    });
    describe("Class", () => {
        var instance = new domeneshop();

        for (const obj of ['api', 'dns', 'forwards', 'invoices']) {
            it("has an object called " + obj, () => {
                expect(instance[obj]).to.be.an('object');
            });
        }

        for (const fun of ['getDomains', 'getDomain']) {
            it("has a function called " + fun, () => {
                expect(instance[fun]).to.be.a('function');
            });
        }
    });

    describe("Function tests", () => {
        // set up and tear down moxios
        beforeEach(function () {
            moxios.install();
        });

        afterEach(function () {
            moxios.uninstall();
        });

        const mockToken = 'Token123';
        const mockSecret = 'Secret123';
        const mockDomainData = {
            id: 1234,
            domain: 'example.com',
            expiry_date: '2070-01-01',
            registered_date: '1970-01-01',
            registrant: "Some One",
            nameservers: [
                'ns1.example.com',
                'ns2.example.com'
            ],
            renew: true,
            status: "active",
            services: {
                dns: true,
                email: false,
                registrar: true,
                webhotel: false
            }
        };

        var instance = new domeneshop(mockToken, mockSecret);

        it("getDomains", (done) => {
            const domains = instance.getDomains();

            moxios.wait(() => {
                let request = moxios.requests.mostRecent();

                if (request.config.auth.username === mockToken
                    && request.config.auth.password === mockSecret
                    && request.config.method === 'get'
                    && request.config.url === '/domains') {
                    request.respondWith({
                        status: 200,
                        response: [
                            mockDomainData
                        ]
                    });
                } else {
                    request.respondWith({
                        status: 400
                    });
                }
            });
            domains.then(res => {
                assert.strictEqual(res[0].id, 1234);
                done();
            }).catch(reason => {
                console.log(reason);
                done(new Error("Undefined request error"));
            });
        });


        it("getDomain", (done) => {
            const domains = instance.getDomain(1234);

            moxios.wait(() => {
                let request = moxios.requests.mostRecent();

                if (request.config.auth.username === mockToken
                    && request.config.auth.password === mockSecret
                    && request.config.method === 'get'
                    && request.config.url === '/domains/1234') {
                    request.respondWith({
                        status: 200,
                        response: mockDomainData
                    });
                } else {
                    request.respondWith({
                        status: 400
                    });
                }
            });
            domains.then(res => {
                assert.strictEqual(res.id, 1234);
                done();
            }).catch(reason => {
                console.log(reason);
                done(new Error("Undefined request error"));
            });
        });
    });
});