import Api from "./api";
import { IForward } from "./interfaces/forward";
declare class Forwards {
    private api;
    /**
     * Create new Forwards object
     *
     * @param api Instance of Api-class
     */
    constructor(api: Api);
    /**
     * Get all forwardings at a domain.
     * @param domainId Domain ID for the domain in question
     *
     * @returns Promise with forwarding data for every hostname.
     */
    getForwards(domainId: number): Promise<[IForward]>;
    /**
     * Get single forwarding for a host
     * @param domainId Domain ID for the domain in question
     * @param host Hostname for the forwarding in question
     *
     * @returns Promise with forwarding data.
     */
    getForward(domainId: number, host: string): Promise<IForward>;
    /**
     * Create forwarding for a host
     * @param domainId Domain ID for the domain in question
     * @param forward The forwarding to be created
     *
     * @returns Promise with hostname
     */
    createForward(domainId: number, forward: IForward): Promise<string>;
    /**
     * Modify forwarding for a host
     * @param domainId Domain ID for the domain in question
     * @param host Hostname for the forwarding in question
     * @param forward The new content of the forwarding
     */
    modifyForward(domainId: number, host: string, forward: IForward): Promise<void>;
    /**
     * Delete forwarding for a host
     * @param domainId Domain ID for the domain in question
     * @param host Hostname for the forwarding in question
     */
    deleteForward(domainId: number, host: string): Promise<void>;
}
export = Forwards;
