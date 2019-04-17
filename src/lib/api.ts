import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Class for Domeneshop API calls.
 */
class Api {
    public readonly apiURL: string = "https://api.domeneshop.no/v0";
    public readonly token: string;
    private readonly secret: string;

    /**
     * Set up token and secret for API access.
     * 
     * @param token API token
     * @param secret API secret
     */
    constructor(token: string, secret: string) {
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
    public apiCall(method: string = "GET", endpoint: string = "/", data?: any, params?: { [key: string]: any }): Promise<AxiosResponse> {
        let reqOptions: AxiosRequestConfig = {
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
        return axios(reqOptions);
    }
}

export = Api;