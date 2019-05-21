import { AxiosResponse } from "axios";
/**
 * Class for Domeneshop API calls.
 */
declare class Api {
    readonly apiURL: string;
    readonly token: string;
    private readonly secret;
    /**
     * Set up token and secret for API access.
     *
     * @param token API token
     * @param secret API secret
     */
    constructor(token: string, secret: string);
    /**
     * Do an API call.
     *
     * @param method Method for the request
     * @param endpoint Request endpoint
     * @param data Content of the request
     * @param params Params for the request
     */
    apiCall(method?: string, endpoint?: string, data?: any, params?: {
        [key: string]: any;
    }): Promise<AxiosResponse>;
}
export = Api;
