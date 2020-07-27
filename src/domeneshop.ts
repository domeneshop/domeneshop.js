import Api from "./lib/api";
import Dns from "./lib/dns";
import Forwards from "./lib/forwards";
import Invoices from "./lib/invoices";

import { IDomainName } from "./lib/interfaces/domainname";

/**
 * Main class of the Domeneshop Javascript API.
 */
class Domeneshop {
    public readonly version: string = "0.1.7";

    /**
     * Public API modules
     */
    public dns: Dns;
    public forwards: Forwards;
    public invoices: Invoices;

    /**
     * Private variables internal to Domeneshop object
     */

    private api: Api;

    constructor(token: string, secret: string) {
        this.api = new Api(token, secret);
        this.dns = new Dns(this.api);
        this.forwards = new Forwards(this.api);
        this.invoices = new Invoices(this.api);
    }

    /**
     * getDomains
     */
    public async getDomains(): Promise<[IDomainName]> {
        const res = await this.api.apiCall("GET", "/domains");
        return res.data;
    }

    /**
     * getDomain
     *
     * @param id The ID number of domain.
     */
    public async getDomain(id: number): Promise<IDomainName> {
        const res = await this.api.apiCall("GET", `/domains/${id}`);
        return res.data;
    }
}

export = Domeneshop;
