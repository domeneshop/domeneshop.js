import Dns from "./lib/dns";
import { DomainName } from "./lib/interfaces/domainname";
/**
 * Main class of the Domeneshop Javascript API.
 */
declare class Domeneshop {
    readonly version: String;
    /**
     * Private variables internal to Domeneshop object
     */
    private api;
    /**
     * Public API modules
     */
    dns: Dns;
    constructor(token: string, secret: string);
    /**
     * getDomains
     */
    getDomains(): Promise<[DomainName]>;
    /**
     * getDomain
     *
     * @param id The ID number of domain.
     */
    getDomain(id: number): Promise<DomainName>;
}
export = Domeneshop;
