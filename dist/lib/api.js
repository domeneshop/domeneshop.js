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
        const reqOptions = {
            auth: {
                password: this.secret,
                username: this.token,
            },
            baseURL: this.apiURL,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method,
            responseType: "json",
            url: endpoint,
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