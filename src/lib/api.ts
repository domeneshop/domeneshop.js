import axios from "axios";
import { AxiosRequestConfig, AxiosResponse, Method } from "axios";

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
  public apiCall(
    method: Method = "GET",
    endpoint: string = "/",
    data?: any,
    params?: { [key: string]: any }
  ): Promise<AxiosResponse> {
    const reqOptions: AxiosRequestConfig = {
      auth: {
        password: this.secret,
        username: this.token,
      },
      baseURL: this.apiURL,
      headers: {
        Accept: "application/json",
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
    return axios(reqOptions);
  }
}

export = Api;
