import Api from "./lib/api"
import Dns from "./lib/dns"

/**
 * Main class of the Domeneshop Javascript API.
 */
class Domeneshop {
    public readonly version: String = "0.1.0";

    /**
     * Private variables internal to Domeneshop object
     */

    private api: Api;

    /**
     * Public API modules
     */
    public dns: Dns;

    constructor(token: string, secret: string) {
        this.api = new Api(token, secret);
        this.dns = new Dns(this.api);
    }

    /**
     * getDomains
     */
    public async getDomains(): Promise<[any]> {
        var res = await this.api.apiCall("GET", "/domains");
        return res.data;
    }

    /**
     * getDomain
     * 
     * @param id The ID number of domain.
     */
    public async getDomain(id: number): Promise<any> {
        var res = await this.api.apiCall("GET", `/domains/${id}`);
        return res.data;
    }
}

export = Domeneshop;
