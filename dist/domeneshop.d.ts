import Dns from "./lib/dns";
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
    getDomains(): Promise<[any]>;
    /**
     * getDomain
     *
     * @param id The ID number of domain.
     */
    getDomain(id: number): Promise<any>;
}
export = Domeneshop;
