import Api from "./api";
import { DnsRecord } from "./interfaces/dnsrecord";
declare class Dns {
    private api;
    /**
     * Create new DNS object
     *
     * @param api Instance of Api-class
     */
    constructor(api: Api);
    /**
     * Get all DNS records for a domain.
     * @param domainId Domain ID for the domain in question
     *
     * @returns Promise with all DNS records on a domain
     */
    getRecords(domainId: number): Promise<[DnsRecord]>;
    /**
     * Get single record
     * @param domainId Domain ID for the domain in question
     * @param recordId Record ID for the record in question
     *
     * @returns Promise with one specific DNS record on a domain
     */
    getRecord(domainId: number, recordId: number): Promise<DnsRecord>;
    /**
     * Create one record
     * @param domainId Domain ID for the domain in question
     * @param record The record to be created
     *
     * @returns Promise with the ID of the created DNS record
     */
    createRecord(domainId: number, record: DnsRecord): Promise<number>;
    /**
     * Modify one record
     * @param domainId Domain ID for the domain in question
     * @param recordId Record ID for the record in question
     * @param record The new content of the record
     */
    modifyRecord(domainId: number, recordId: number, record: DnsRecord): Promise<void>;
    /**
     * Delete one record
     * @param domainId Domain ID for the domain in question
     * @param recordId Record ID for the record in question
     */
    deleteRecord(domainId: number, recordId: number): Promise<void>;
}
export = Dns;
