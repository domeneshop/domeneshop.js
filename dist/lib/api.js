"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
/**
 * Class for Domeneshop API calls.
 */
class Api {
    /**
     * Set up token and secret for API access.
     *
     * @param token API token
     * @param secret API secret
     */
    constructor(token, secret) {
        this.apiURL = "https://api.domeneshop.no/v0";
        this.token = token;
        this.secret = secret;
    }
    /**
     * Do an API call.
     *
     * @param method Method for the request
     * @param endpoint Request endpoint
     * @param data Content of the request
     * @param params Params for the request
     */
    apiCall(method = "GET", endpoint = "/", data, params) {
        let reqOptions = {
            baseURL: this.apiURL,
            method: method,
            url: endpoint,
            auth: {
                username: this.token,
                password: this.secret
            },
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            responseType: 'json'
        };
        if (params) {
            reqOptions.params = params;
        }
        if (data) {
            reqOptions.data = data;
        }
        return axios_1.default(reqOptions);
    }
}
module.exports = Api;
//# sourceMappingURL=api.js.map