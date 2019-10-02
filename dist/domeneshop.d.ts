import Dns from "./lib/dns";
import Forwards from "./lib/forwards";
import Invoices from "./lib/invoices";
import { IDomainName } from "./lib/interfaces/domainname";
/**
 * Main class of the Domeneshop Javascript API.
 */
declare class Domeneshop {
    readonly version: string;
    /**
     * Public API modules
     */
    dns: Dns;
    forwards: Forwards;
    invoices: Invoices;
    /**
     * Private variables internal to Domeneshop object
     */
    private api;
    constructor(token: string, secret: string);
    /**
     * getDomains
     */
    getDomains(): Promise<[IDomainName]>;
    /**
     * getDomain
     *
     * @param id The ID number of domain.
     */
    getDomain(id: number): Promise<IDomainName>;
}
export = Domeneshop;
