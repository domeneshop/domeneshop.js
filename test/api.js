/*jshint esversion: 6 */

const expect = require("chai").expect;
const api = require("../dist/lib/api");
const moxios = require("moxios");
const assert = require('assert');

describe("Domeneshop.api", () => {
    describe("Import", () => {
        it("returns a function", () => {
            expect(api).to.be.a('function');
        });
    });
    describe("Class", () => {
        const instance = new api('', '');

        it("has an apiURL string", () => {
            expect(instance.apiURL).to.be.a('string');
        });

        it("has a token string", () => {
            expect(instance.token).to.be.a('string');
        });

        it("has a secret string", () => {
            expect(instance.secret).to.be.a('string');
        });


        for (const fun of ['apiCall']) {
            it("has a function called " + fun, () => {
                expect(instance[fun]).to.be.a('function');
            });
        }
    });
    describe("Set up axios object", () => {
        // set up and tear down moxios
        beforeEach(function () {
            moxios.install()
        });

        afterEach(function () {
            moxios.uninstall()
        });

        const mockToken = 'Token123';
        const mockSecret = 'Secret123';
        

        const instance = new api(mockToken, mockSecret);

        it("has correct request configuration without method and endpoint", (done) => {
            const axiosRequest = instance.apiCall();
            moxios.wait(() => {
                let request = moxios.requests.mostRecent();

                if(request.config.auth.username === mockToken
                && request.config.auth.password === mockSecret
                && request.config.method === 'get'
                && request.config.url === '/'
                && request.config.baseURL === instance.apiURL) {
                    request.respondWith({
                        status: 200
                    });
                } else {
                    request.respondWith({
                    status: 400
                });
            }
            });
            axiosRequest.then(res => {
                assert.strictEqual(res.status, 200);
                done();
            }).catch(reason => {
                if(reason.response.status === 400) {
                    done(new Error("Request setup error"));
                } else {
                    done(new Error("Undefined request error"));
                }
            });
        });

        it("has correct request configuration without method", (done) => {
            const axiosRequest = instance.apiCall(null, '/test');
            moxios.wait(() => {
                let request = moxios.requests.mostRecent();

                if(request.config.auth.username === mockToken
                && request.config.auth.password === mockSecret
                && request.config.method === 'get'
                && request.config.url === '/test'
                && request.config.baseURL === instance.apiURL) {
                    request.respondWith({
                        status: 200
                    });
                } else {
                    request.respondWith({
                    status: 400
                });
            }
            });
            axiosRequest.then(res => {
                assert.strictEqual(res.status, 200);
                done();
            }).catch(reason => {
                if(reason.response.status === 400) {
                    done(new Error("Request setup error"));
                } else {
                    done(new Error("Undefined request error"));
                }
            });
        });


        it("has correct request configuration", (done) => {
            const axiosRequest = instance.apiCall('GET', '/test');
            moxios.wait(() => {
                let request = moxios.requests.mostRecent();

                if(request.config.auth.username === mockToken
                && request.config.auth.password === mockSecret
                && request.config.method === 'get'
                && request.config.url === '/test'
                && request.config.baseURL === instance.apiURL) {
                    request.respondWith({
                        status: 200
                    });
                } else {
                    request.respondWith({
                    status: 400
                });
            }
            });
            axiosRequest.then(res => {
                assert.strictEqual(res.status, 200);
                done();
            }).catch(reason => {
                if(reason.response.status === 400) {
                    done(new Error("Request setup error"));
                } else {
                    done(new Error("Undefined request error"));
                }
            });
        });

        it("has correct request configuration with params", (done) => {
            const axiosRequest = instance.apiCall('GET', '/test', null, {test: 'expected value'});
            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                console.log(request.config);

                if(request.config.auth.username === mockToken
                && request.config.auth.password === mockSecret
                && request.config.method === 'get'
                && request.config.url === '/test'
                && request.config.baseURL === instance.apiURL
                && request.config.params.test === 'expected value') {
                    request.respondWith({
                        status: 200
                    });
                } else {
                    request.respondWith({
                    status: 400
                });
            }
            });
            axiosRequest.then(res => {
                assert.strictEqual(res.status, 200);
                done();
            }).catch(reason => {
                if(reason.response.status === 400) {
                    done(new Error("Request setup error"));
                } else {
                    done(new Error("Undefined request error"));
                }
            });
        });

        it("has correct request configuration with data", (done) => {
            const axiosRequest = instance.apiCall('POST', '/test', 'expected data');
            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                console.log(request.config);
                if(request.config.auth.username === mockToken
                && request.config.auth.password === mockSecret
                && request.config.method === 'post'
                && request.config.url === '/test'
                && request.config.baseURL === instance.apiURL
                && request.config.data === 'expected data') {
                    request.respondWith({
                        status: 200
                    });
                } else {
                    request.respondWith({
                    status: 400
                });
            }
            });
            axiosRequest.then(res => {
                assert.strictEqual(res.status, 200);
                done();
            }).catch(reason => {
                if(reason.response.status === 400) {
                    done(new Error("Request setup error"));
                } else {
                    done(new Error("Undefined request error"));
                }
            });
        });
    });
});